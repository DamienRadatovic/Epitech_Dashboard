"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("util");
const strings_1 = require("locutus/php/strings");
const sha256 = require('crypto-js/sha256');
const hex = require('crypto-js/enc-hex');
class TwingCompiler {
    constructor(env) {
        this.varNameSalt = 0;
        this.env = env;
    }
    /**
     * Returns the environment instance related to this compiler.
     *
     * @returns TwingEnvironment
     */
    getEnvironment() {
        return this.env;
    }
    getSource() {
        return this.source;
    }
    compile(node, indentation = 0) {
        this.lastLine = null;
        this.source = '';
        this.indentation = indentation;
        this.varNameSalt = 0;
        this.subcompile(node);
        return this;
    }
    subcompile(node, raw = true) {
        if (raw === false) {
            this.source += ' '.repeat(this.indentation * 4);
        }
        node.compile(this);
        return this;
    }
    /**
     *
     * @param string
     * @returns
     */
    raw(string) {
        this.source += string;
        return this;
    }
    /**
     * Writes a string to the compiled code by adding indentation.
     *
     * @returns {TwingCompiler}
     */
    write(...strings) {
        for (let string of strings) {
            this.source += ' '.repeat(this.indentation * 4) + string;
        }
        return this;
    }
    /**
     * Adds a quoted string to the compiled code.
     *
     * @param {string} value The string
     *
     * @returns {TwingCompiler}
     */
    string(value) {
        if (!util_1.isNullOrUndefined(value)) {
            if (typeof value === 'string') {
                value = '`' + strings_1.addcslashes(value, "\0\t\\`").replace(/\${/g, '\\${') + '`';
            }
        }
        else {
            value = '``';
        }
        this.source += value;
        return this;
    }
    repr(value) {
        if (typeof value === 'number') {
            this.raw(value);
        }
        else if (util_1.isNullOrUndefined(value)) {
            this.raw(`${value}`);
        }
        else if (typeof value === 'boolean') {
            this.raw(value ? 'true' : 'false');
        }
        else if (value instanceof Map) {
            this.raw('new Map([');
            let first = true;
            for (let [k, v] of value) {
                if (!first) {
                    this.raw(', ');
                }
                first = false;
                this
                    .raw('[')
                    .repr(k)
                    .raw(', ')
                    .repr(v)
                    .raw(']');
            }
            this.raw('])');
        }
        else if (typeof value === 'object') {
            this.raw('{');
            let first = true;
            for (let k in value) {
                if (!first) {
                    this.raw(', ');
                }
                first = false;
                this
                    .raw(`"${k}"`)
                    .raw(': ')
                    .repr(value[k]);
            }
            this.raw('}');
        }
        else {
            this.string(value);
        }
        return this;
    }
    /**
     * Adds source-map enter call.
     *
     * @returns TwingCompiler
     */
    addSourceMapEnter(node) {
        if (this.getEnvironment().isSourceMap()) {
            this
                .write('this.env.enterSourceMapBlock(')
                .raw(node.getTemplateLine())
                .raw(', ')
                .raw(node.getTemplateColumn())
                .raw(', ')
                .string(node.getType())
                .raw(', ')
                .raw('this.getSourceContext());\n');
        }
        return this;
    }
    /**
     * Adds source-map leave call.
     *
     * @returns TwingCompiler
     */
    addSourceMapLeave() {
        if (this.getEnvironment().isSourceMap()) {
            this
                .write('this.env.leaveSourceMapBlock();\n');
        }
        return this;
    }
    /**
     * Indents the generated code.
     *
     * @param {number} step The number of indentation to add
     *
     * @returns TwingCompiler
     */
    indent(step = 1) {
        this.indentation += step;
        return this;
    }
    /**
     * Outdents the generated code.
     *
     * @param {number} step The number of indentation to remove
     *
     * @return TwingCompiler
     *
     * @throws Error When trying to outdent too much so the indentation would become negative
     */
    outdent(step = 1) {
        // can't outdent by more steps than the current indentation level
        if (this.indentation < step) {
            throw new Error('Unable to call outdent() as the indentation would become negative.');
        }
        this.indentation -= step;
        return this;
    }
    getVarName(prefix = '__internal_') {
        return `${prefix}${hex.stringify(sha256('TwingCompiler::getVarName' + this.varNameSalt++))}`;
    }
}
exports.TwingCompiler = TwingCompiler;
