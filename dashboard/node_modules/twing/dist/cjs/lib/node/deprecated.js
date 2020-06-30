"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Represents a deprecated node.
 *
 * @author Eric MORAND <eric.morand@gmail.com>
 */
const node_1 = require("../node");
class TwingNodeDeprecated extends node_1.TwingNode {
    constructor(expr, lineno, columnno, tag = null) {
        super(new Map([['expr', expr]]), new Map(), lineno, columnno, tag);
        this.type = node_1.TwingNodeType.DEPRECATED;
    }
    compile(compiler) {
        let expr = this.getNode('expr');
        if (expr.getType() === node_1.TwingNodeType.EXPRESSION_CONSTANT) {
            compiler
                .write('console.warn(')
                .subcompile(expr);
        }
        else {
            let varName = compiler.getVarName();
            compiler
                .write(`let ${varName} = `)
                .subcompile(expr)
                .raw(';\n')
                .write(`console.warn(${varName}`);
        }
        compiler
            .raw(' + ')
            .string(` ("${this.getTemplateName()}" at line ${this.getTemplateLine()})`)
            .raw(');\n');
    }
}
exports.TwingNodeDeprecated = TwingNodeDeprecated;
