"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const runtime_1 = require("./error/runtime");
const source_1 = require("./source");
const error_1 = require("./error");
const output_buffering_1 = require("./output-buffering");
const iterator_to_map_1 = require("./helpers/iterator-to-map");
const merge_1 = require("./helpers/merge");
const context_1 = require("./context");
const is_map_1 = require("./helpers/is-map");
const markup_1 = require("./markup");
const security_error_1 = require("./sandbox/security-error");
const security_not_allowed_filter_error_1 = require("./sandbox/security-not-allowed-filter-error");
const security_not_allowed_function_error_1 = require("./sandbox/security-not-allowed-function-error");
const security_not_allowed_tag_error_1 = require("./sandbox/security-not-allowed-tag-error");
const compare_1 = require("./helpers/compare");
const count_1 = require("./helpers/count");
const is_countable_1 = require("./helpers/is-countable");
const is_plain_object_1 = require("./helpers/is-plain-object");
const iterate_1 = require("./helpers/iterate");
const is_in_1 = require("./helpers/is-in");
const ensure_traversable_1 = require("./helpers/ensure-traversable");
const get_attribute_1 = require("./helpers/get-attribute");
const create_range_1 = require("./helpers/create-range");
const clone_map_1 = require("./helpers/clone-map");
const parse_regex_1 = require("./helpers/parse-regex");
const constant_1 = require("./helpers/constant");
const get_1 = require("./helpers/get");
const include_1 = require("./extension/core/functions/include");
const util_1 = require("util");
/**
 * Default base class for compiled templates.
 *
 * @author Eric MORAND <eric.morand@gmail.com>
 */
class TwingTemplate {
    constructor(env) {
        this.env = env;
        this.parents = new Map();
        this.aliases = new context_1.TwingContext();
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
                this.blocks = merge_1.merge(traits, new Map([...this.blockHandlers.keys()].map((key) => [key, [this, key]])));
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
                        return parent.displayBlock(name, context, merge_1.merge(ownBlocks, blocks), false);
                    }
                    else if (blocks.has(name)) {
                        throw new runtime_1.TwingErrorRuntime(`Block "${name}" should not call parent() in "${blocks.get(name)[0].getTemplateName()}" as the block does not exist in the parent template "${this.getTemplateName()}".`, -1, blocks.get(name)[0].getSourceContext());
                    }
                    else {
                        throw new runtime_1.TwingErrorRuntime(`Block "${name}" on template "${this.getTemplateName()}" does not exist.`, -1, this.getSourceContext());
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
                        throw new runtime_1.TwingErrorRuntime(`The template has no parent and no traits defining the "${name}" block.`, -1, this.getSourceContext());
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
        output_buffering_1.obStart();
        return this.getBlocks().then((blocks) => {
            return this.displayParentBlock(name, context, blocks).then(() => {
                return output_buffering_1.obGetClean();
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
        output_buffering_1.obStart();
        return this.displayBlock(name, context, blocks, useBlocks).then(() => {
            return output_buffering_1.obGetClean();
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
            if (e instanceof error_1.TwingError) {
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
        if (!is_map_1.isMap(context)) {
            context = iterator_to_map_1.iteratorToMap(context);
        }
        context = new context_1.TwingContext(this.env.mergeGlobals(context));
        return this.getBlocks().then((ownBlocks) => this.displayWithErrorHandling(context, merge_1.merge(ownBlocks, blocks)));
    }
    displayWithErrorHandling(context, blocks = new Map()) {
        return this.doDisplay(context, blocks).catch((e) => {
            if (e instanceof error_1.TwingError) {
                if (!e.getSourceContext()) {
                    e.setSourceContext(this.getSourceContext());
                }
            }
            else {
                e = new runtime_1.TwingErrorRuntime(`An exception has been thrown during the rendering of a template ("${e.message}").`, -1, this.getSourceContext(), e);
            }
            throw e;
        });
    }
    render(context) {
        let level = output_buffering_1.obGetLevel();
        output_buffering_1.obStart();
        return this.display(context)
            .then(() => {
            return output_buffering_1.obGetClean();
        })
            .catch((e) => {
            while (output_buffering_1.obGetLevel() > level) {
                output_buffering_1.obEndClean();
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
                throw new runtime_1.TwingErrorRuntime(`Macro "${name}" is not defined in template "${template.getTemplateName()}".`, lineno, source);
            }
        });
    }
    traceableMethod(method, lineno, source) {
        return function () {
            return method.apply(null, arguments).catch((e) => {
                if (e instanceof error_1.TwingError) {
                    if (e.getTemplateLine() === -1) {
                        e.setTemplateLine(lineno);
                        e.setSourceContext(source);
                    }
                }
                else {
                    throw new runtime_1.TwingErrorRuntime(`An exception has been thrown during the rendering of a template ("${e.message}").`, lineno, source, e);
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
        return clone_map_1.cloneMap;
    }
    get compare() {
        return compare_1.compare;
    }
    get constant() {
        return constant_1.constant;
    }
    get convertToMap() {
        return iterator_to_map_1.iteratorToMap;
    }
    get count() {
        return count_1.count;
    }
    get createRange() {
        return create_range_1.createRange;
    }
    get echo() {
        return output_buffering_1.echo;
    }
    get endAndCleanOutputBuffer() {
        return output_buffering_1.obEndClean;
    }
    get ensureTraversable() {
        return ensure_traversable_1.ensureTraversable;
    }
    get flushOutputBuffer() {
        return output_buffering_1.flush;
    }
    get get() {
        return (object, property) => {
            if (is_map_1.isMap(object) || is_plain_object_1.isPlainObject(object)) {
                return get_1.get(object, property);
            }
        };
    }
    get getAndCleanOutputBuffer() {
        return output_buffering_1.obGetClean;
    }
    get getAttribute() {
        return get_attribute_1.getAttribute;
    }
    get getOutputBufferContent() {
        return output_buffering_1.obGetContents;
    }
    get include() {
        return (context, from, templates, variables, withContext, ignoreMissing, line) => {
            return include_1.include(this.env, context, from, templates, variables, withContext, ignoreMissing).catch((e) => {
                if (e instanceof error_1.TwingError) {
                    if (e.getTemplateLine() === -1) {
                        e.setTemplateLine(line);
                    }
                }
                throw e;
            });
        };
    }
    get isCountable() {
        return is_countable_1.isCountable;
    }
    get isIn() {
        return is_in_1.isIn;
    }
    concatenate(object1, object2) {
        if (util_1.isNullOrUndefined(object1)) {
            object1 = '';
        }
        if (util_1.isNullOrUndefined(object2)) {
            object2 = '';
        }
        return String(object1) + String(object2);
    }
    get iterate() {
        return iterate_1.iterate;
    }
    get merge() {
        return merge_1.merge;
    }
    get parseRegExp() {
        return parse_regex_1.parseRegex;
    }
    get startOutputBuffer() {
        return output_buffering_1.obStart;
    }
    get Context() {
        return context_1.TwingContext;
    }
    get Markup() {
        return markup_1.TwingMarkup;
    }
    get RuntimeError() {
        return runtime_1.TwingErrorRuntime;
    }
    get SandboxSecurityError() {
        return security_error_1.TwingSandboxSecurityError;
    }
    get SandboxSecurityNotAllowedFilterError() {
        return security_not_allowed_filter_error_1.TwingSandboxSecurityNotAllowedFilterError;
    }
    get SandboxSecurityNotAllowedFunctionError() {
        return security_not_allowed_function_error_1.TwingSandboxSecurityNotAllowedFunctionError;
    }
    get SandboxSecurityNotAllowedTagError() {
        return security_not_allowed_tag_error_1.TwingSandboxSecurityNotAllowedTagError;
    }
    get Source() {
        return source_1.TwingSource;
    }
}
exports.TwingTemplate = TwingTemplate;
TwingTemplate.ANY_CALL = 'any';
TwingTemplate.ARRAY_CALL = 'array';
TwingTemplate.METHOD_CALL = 'method';
