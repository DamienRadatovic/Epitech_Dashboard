"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const expression_1 = require("../expression");
const node_1 = require("../../node");
class TwingNodeExpressionName extends expression_1.TwingNodeExpression {
    constructor(name, lineno, columnno) {
        let attributes = new Map();
        attributes.set('name', name);
        attributes.set('is_defined_test', false);
        attributes.set('ignore_strict_check', false);
        attributes.set('always_defined', false);
        super(new Map(), attributes, lineno, columnno);
        this.specialVars = new Map([
            ['_self', 'this.getTemplateName()'],
            ['_context', 'context'],
            ['_charset', 'this.env.getCharset()']
        ]);
        this.type = node_1.TwingNodeType.EXPRESSION_NAME;
    }
    compile(compiler) {
        let name = this.getAttribute('name');
        if (this.getAttribute('is_defined_test')) {
            if (this.isSpecial()) {
                compiler.repr(true);
            }
            else {
                compiler.raw('(context.has(').repr(name).raw('))');
            }
        }
        else if (this.isSpecial()) {
            compiler.raw(this.specialVars.get(name));
        }
        else if (this.getAttribute('always_defined')) {
            compiler
                .raw('context.get(')
                .string(name)
                .raw(')');
        }
        else {
            if (this.getAttribute('ignore_strict_check') || !compiler.getEnvironment().isStrictVariables()) {
                compiler
                    .raw('(context.has(')
                    .string(name)
                    .raw(') ? context.get(')
                    .string(name)
                    .raw(') : null)');
            }
            else {
                compiler
                    .raw('(context.has(')
                    .string(name)
                    .raw(') ? context.get(')
                    .string(name)
                    .raw(') : (() => { throw new this.RuntimeError(\'Variable ')
                    .string(name)
                    .raw(' does not exist.\', ')
                    .repr(this.lineno)
                    .raw(', this.getSourceContext()); })()')
                    .raw(')');
            }
        }
    }
    isSpecial() {
        return this.specialVars.has(this.getAttribute('name'));
    }
    isSimple() {
        return !this.isSpecial() && !this.getAttribute('is_defined_test');
    }
}
exports.TwingNodeExpressionName = TwingNodeExpressionName;
