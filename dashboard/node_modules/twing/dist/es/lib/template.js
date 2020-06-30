import { TwingErrorRuntime } from "./error/runtime";
import { TwingSource } from "./source";
import { TwingError } from "./error";
import { flush, echo, obGetLevel, obStart, obEndClean, obGetClean, obGetContents } from './output-buffering';
import { iteratorToMap } from "./helpers/iterator-to-map";
import { merge } from "./helpers/merge";
import { TwingContext } from "./context";
import { isMap } from "./helpers/is-map";
import { TwingMarkup } from "./markup";
import { TwingSandboxSecurityError } from "./sandbox/security-error";
import { TwingSandboxSecurityNotAllowedFilterError } from "./sandbox/security-not-allowed-filter-error";
import { TwingSandboxSecurityNotAllowedFunctionError } from "./sandbox/security-not-allowed-function-error";
import { TwingSandboxSecurityNotAllowedTagError } from "./sandbox/security-not-allowed-tag-error";
import { compare } from "./helpers/compare";
import { count } from "./helpers/count";
import { isCountable } from "./helpers/is-countable";
import { isPlainObject } from "./helpers/is-plain-object";
import { iterate } from "./helpers/iterate";
import { isIn } from "./helpers/is-in";
import { ensureTraversable } from "./helpers/ensure-traversable";
import { getAttribute } from "./helpers/get-attribute";
import { createRange } from "./helpers/create-range";
import { cloneMap } from "./helpers/clone-map";
import { parseRegex } from "./helpers/parse-regex";
import { constant } from "./helpers/constant";
import { get } from "./helpers/get";
import { include } from "./extension/core/functions/include";
import { isNullOrUndefined } from "util";
/**
 * Default base class for compiled templates.
 *
 * @author Eric MORAND <eric.morand@gmail.com>
 */
export class TwingTemplate {
    constructor(env) {
        this.env = env;
        this.parents = new Map();
        this.aliases = new TwingContext();
        this.extensions = env.getExtensions();
        this.blockHandlers = new Map();
        this.macroHandlers = new Map();
    }
    /**
     * Returns the template name.
     *
     * @returns {string} The template name
     */
    getTemplateName() {
        return this.getSourceContext().getName();
    }
    /**
     * @returns {TwingSource}
     */
    getSourceContext() {
        return this.sourceContext;
    }
    /**
     * Returns the parent template.
     *
     * @param {any} context
     *
     * @returns {Promise<TwingTemplate|false>} The parent template or false if there is no parent
     */
    getParent(context = {}) {
        if (this.parent) {
            return Promise.resolve(this.parent);
        }
        return this.doGetParent(context)
            .then((parent) => {
            if (parent === false || parent instanceof TwingTemplate) {
                if (parent instanceof TwingTemplate) {
                    this.parents.set(parent.getSourceContext().getName(), parent);
                }
                return parent;
            }
            // parent is a string
            if (!this.parents.has(parent)) {
                return this.loadTemplate(parent)
                    .then((template) => {
                    this.parents.set(parent, template);
                    return template;
                });
            }
            else {
                return this.parents.get(parent);
            }
        });
    }
    /**
     * Returns template blocks.
     *
     * @returns {Promise<TwingTemplateBlocksMap>} A map of blocks
     */
    getBlocks() {
        if (this.blocks) {
            return Promise.resolve(this.blocks);
        }
        else {
            return this.getTraits().then((traits) => {
                this.blocks = merge(traits, new Map([...this.blockHandlers.keys()].map((key) => [key, [this, key]])));
                return this.blocks;
            });
        }
    }
    isTraitable() {
        return true;
    }
    /**
     * Displays a block.
     *
     * @param {string} name The block name to display
     * @param {any} context The context
     * @param {TwingTemplateBlocksMap} blocks The active set of blocks
     * @param {boolean} useBlocks Whether to use the active set of blocks
     *
     * @returns {Promise<void>}
     */
    displayBlock(name, context, blocks = new Map(), useBlocks = true) {
        return this.getBlocks().then((ownBlocks) => {
            let blockHandler;
            if (useBlocks && blocks.has(name)) {
                blockHandler = blocks.get(name)[0].blockHandlers.get(blocks.get(name)[1]);
            }
            else if (ownBlocks.has(name)) {
                blockHandler = ownBlocks.get(name)[0].blockHandlers.get(ownBlocks.get(name)[1]);
            }
            if (blockHandler) {
                return blockHandler(context, blocks);
            }
            else {
                return this.getParent(context).then((parent) => {
                    if (parent) {
                        return parent.displayBlock(name, context, merge(ownBlocks, blocks), false);
                    }
                    else if (blocks.has(name)) {
                        throw new TwingErrorRuntime(`Block "${name}" should not call parent() in "${blocks.get(name)[0].getTemplateName()}" as the block does not exist in the parent template "${this.getTemplateName()}".`, -1, blocks.get(name)[0].getSourceContext());
                    }
                    else {
                        throw new TwingErrorRuntime(`Block "${name}" on template "${this.getTemplateName()}" does not exist.`, -1, this.getSourceContext());
                    }
                });
            }
        });
    }
    /**
     * Displays a parent block.
     *
     * @param {string} name The block name to display from the parent
     * @param {any} context The context
     * @param {TwingTemplateBlocksMap} blocks The active set of blocks
     *
     * @returns {Promise<void>}
     */
    displayParentBlock(name, context, blocks) {
        return this.getTraits().then((traits) => {
            if (traits.has(name)) {
                return traits.get(name)[0].displayBlock(traits.get(name)[1], context, blocks, false);
            }
            else {
                return this.getParent(context).then((template) => {
                    if (template !== false) {
                        return template.displayBlock(name, context, blocks, false);
                    }
                    else {
                        throw new TwingErrorRuntime(`The template has no parent and no traits defining the "${name}" block.`, -1, this.getSourceContext());
                    }
                });
            }
        });
    }
    /**
     * Renders a parent block.
     *
     * @param {string} name The block name to display from the parent
     * @param {*} context The context
     * @param {TwingTemplateBlocksMap} blocks The active set of blocks
     *
     * @returns {Promise<string>} The rendered block
     */
    renderParentBlock(name, context, blocks) {
        obStart();
        return this.getBlocks().then((blocks) => {
            return this.displayParentBlock(name, context, blocks).then(() => {
                return obGetClean();
            });
        });
    }
    /**
     * Renders a block.
     *
     * @param {string} name The block name to display
     * @param context The context
     * @param {TwingTemplateBlocksMap} blocks The active set of blocks
     * @param {boolean} useBlocks Whether to use the active set of blocks
     *
     * @return {Promise<string>} The rendered block
     */
    renderBlock(name, context, blocks = new Map(), useBlocks = true) {
        obStart();
        return this.displayBlock(name, context, blocks, useBlocks).then(() => {
            return obGetClean();
        });
    }
    /**
     * Returns whether a block exists or not in the active context of the template.
     *
     * This method checks blocks defined in the active template or defined in "used" traits or defined in parent templates.
     *
     * @param {string} name The block name
     * @param {any} context The context
     * @param {TwingTemplateBlocksMap} blocks The active set of blocks
     *
     * @return {Promise<boolean>} true if the block exists, false otherwise
     */
    hasBlock(name, context, blocks = new Map()) {
        if (blocks.has(name)) {
            return Promise.resolve(true);
        }
        else {
            return this.getBlocks().then((blocks) => {
                if (blocks.has(name)) {
                    return Promise.resolve(true);
                }
                else {
                    return this.getParent(context).then((parent) => {
                        if (parent) {
                            return parent.hasBlock(name, context);
                        }
                        else {
                            return false;
                        }
                    });
                }
            });
        }
    }
    /**
     * @param {string} name The macro name
     *
     * @return {Promise<boolean>}
     */
    hasMacro(name) {
        // @see https://github.com/twigphp/Twig/issues/3174 as to why we don't check macro existence in parents
        return Promise.resolve(this.macroHandlers.has(name));
    }
    loadTemplate(templates, line = null, index = 0) {
        let promise;
        if (typeof templates === 'string') {
            promise = this.env.loadTemplate(templates, index, this.getSourceContext());
        }
        else if (templates instanceof TwingTemplate) {
            promise = Promise.resolve(templates);
        }
        else {
            promise = this.env.resolveTemplate([...templates.values()], this.getSourceContext());
        }
        return promise.catch((e) => {
            if (e instanceof TwingError) {
                if (e.getTemplateLine() !== -1) {
                    throw e;
                }
                if (line) {
                    e.setTemplateLine(line);
                }
            }
            throw e;
        });
    }
    /**
     * Returns template traits.
     *
     * @returns {Promise<TwingTemplateBlocksMap>} A map of traits
     */
    getTraits() {
        if (this.traits) {
            return Promise.resolve(this.traits);
        }
        else {
            return this.doGetTraits().then((traits) => {
                this.traits = traits;
                return traits;
            });
        }
    }
    doGetTraits() {
        return Promise.resolve(new Map());
    }
    display(context, blocks = new Map()) {
        if (context === null) {
            throw new TypeError('Argument 1 passed to TwingTemplate::display() must be an iterator, null given');
        }
        if (!isMap(context)) {
            context = iteratorToMap(context);
        }
        context = new TwingContext(this.env.mergeGlobals(context));
        return this.getBlocks().then((ownBlocks) => this.displayWithErrorHandling(context, merge(ownBlocks, blocks)));
    }
    displayWithErrorHandling(context, blocks = new Map()) {
        return this.doDisplay(context, blocks).catch((e) => {
            if (e instanceof TwingError) {
                if (!e.getSourceContext()) {
                    e.setSourceContext(this.getSourceContext());
                }
            }
            else {
                e = new TwingErrorRuntime(`An exception has been thrown during the rendering of a template ("${e.message}").`, -1, this.getSourceContext(), e);
            }
            throw e;
        });
    }
    render(context) {
        let level = obGetLevel();
        obStart();
        return this.display(context)
            .then(() => {
            return obGetClean();
        })
            .catch((e) => {
            while (obGetLevel() > level) {
                obEndClean();
            }
            throw e;
        });
    }
    doGetParent(context) {
        return Promise.resolve(false);
    }
    callMacro(template, name, args, lineno, context, source) {
        let getHandler = (template) => {
            if (template.macroHandlers.has(name)) {
                return Promise.resolve(template.macroHandlers.get(name));
            }
            else {
                return template.getParent(context).then((parent) => {
                    if (parent) {
                        return getHandler(parent);
                    }
                    else {
                        return null;
                    }
                });
            }
        };
        return getHandler(template).then((handler) => {
            if (handler) {
                return handler(...args);
            }
            else {
                throw new TwingErrorRuntime(`Macro "${name}" is not defined in template "${template.getTemplateName()}".`, lineno, source);
            }
        });
    }
    traceableMethod(method, lineno, source) {
        return function () {
            return method.apply(null, arguments).catch((e) => {
                if (e instanceof TwingError) {
                    if (e.getTemplateLine() === -1) {
                        e.setTemplateLine(lineno);
                        e.setSourceContext(source);
                    }
                }
                else {
                    throw new TwingErrorRuntime(`An exception has been thrown during the rendering of a template ("${e.message}").`, lineno, source, e);
                }
                throw e;
            });
        };
    }
    traceableDisplayBlock(lineno, source) {
        return this.traceableMethod(this.displayBlock.bind(this), lineno, source);
    }
    traceableDisplayParentBlock(lineno, source) {
        return this.traceableMethod(this.displayParentBlock.bind(this), lineno, source);
    }
    traceableRenderBlock(lineno, source) {
        return this.traceableMethod(this.renderBlock.bind(this), lineno, source);
    }
    traceableRenderParentBlock(lineno, source) {
        return this.traceableMethod(this.renderParentBlock.bind(this), lineno, source);
    }
    traceableHasBlock(lineno, source) {
        return this.traceableMethod(this.hasBlock.bind(this), lineno, source);
    }
    get cloneMap() {
        return cloneMap;
    }
    get compare() {
        return compare;
    }
    get constant() {
        return constant;
    }
    get convertToMap() {
        return iteratorToMap;
    }
    get count() {
        return count;
    }
    get createRange() {
        return createRange;
    }
    get echo() {
        return echo;
    }
    get endAndCleanOutputBuffer() {
        return obEndClean;
    }
    get ensureTraversable() {
        return ensureTraversable;
    }
    get flushOutputBuffer() {
        return flush;
    }
    get get() {
        return (object, property) => {
            if (isMap(object) || isPlainObject(object)) {
                return get(object, property);
            }
        };
    }
    get getAndCleanOutputBuffer() {
        return obGetClean;
    }
    get getAttribute() {
        return getAttribute;
    }
    get getOutputBufferContent() {
        return obGetContents;
    }
    get include() {
        return (context, from, templates, variables, withContext, ignoreMissing, line) => {
            return include(this.env, context, from, templates, variables, withContext, ignoreMissing).catch((e) => {
                if (e instanceof TwingError) {
                    if (e.getTemplateLine() === -1) {
                        e.setTemplateLine(line);
                    }
                }
                throw e;
            });
        };
    }
    get isCountable() {
        return isCountable;
    }
    get isIn() {
        return isIn;
    }
    concatenate(object1, object2) {
        if (isNullOrUndefined(object1)) {
            object1 = '';
        }
        if (isNullOrUndefined(object2)) {
            object2 = '';
        }
        return String(object1) + String(object2);
    }
    get iterate() {
        return iterate;
    }
    get merge() {
        return merge;
    }
    get parseRegExp() {
        return parseRegex;
    }
    get startOutputBuffer() {
        return obStart;
    }
    get Context() {
        return TwingContext;
    }
    get Markup() {
        return TwingMarkup;
    }
    get RuntimeError() {
        return TwingErrorRuntime;
    }
    get SandboxSecurityError() {
        return TwingSandboxSecurityError;
    }
    get SandboxSecurityNotAllowedFilterError() {
        return TwingSandboxSecurityNotAllowedFilterError;
    }
    get SandboxSecurityNotAllowedFunctionError() {
        return TwingSandboxSecurityNotAllowedFunctionError;
    }
    get SandboxSecurityNotAllowedTagError() {
        return TwingSandboxSecurityNotAllowedTagError;
    }
    get Source() {
        return TwingSource;
    }
}
TwingTemplate.ANY_CALL = 'any';
TwingTemplate.ARRAY_CALL = 'array';
TwingTemplate.METHOD_CALL = 'method';
