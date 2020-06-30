"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_1 = require("../node");
/**
 * Checks if casting an expression to toString() is allowed by the sandbox.
 *
 * For instance, when there is a simple Print statement, like {{ article }},
 * and if the sandbox is enabled, we need to check that the toString()
 * method is allowed if 'article' is an object. The same goes for {{ article|upper }}
 * or {{ random(article) }}.
 */
class TwingNodeCheckToString extends node_1.TwingNode {
    constructor(expression) {
        super(new Map([['expr', expression]]), new Map(), expression.getTemplateLine(), expression.getTemplateColumn());
    }
    compile(compiler) {
        compiler
            .raw('this.env.ensureToStringAllowed(')
            .subcompile(this.getNode('expr'))
            .raw(')');
    }
}
exports.TwingNodeCheckToString = TwingNodeCheckToString;
