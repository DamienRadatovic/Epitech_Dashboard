/**
 * Represents a deprecated node.
 *
 * @author Eric MORAND <eric.morand@gmail.com>
 */
import { TwingNode, TwingNodeType } from "../node";
export class TwingNodeDeprecated extends TwingNode {
    constructor(expr, lineno, columnno, tag = null) {
        super(new Map([['expr', expr]]), new Map(), lineno, columnno, tag);
        this.type = TwingNodeType.DEPRECATED;
    }
    compile(compiler) {
        let expr = this.getNode('expr');
        if (expr.getType() === TwingNodeType.EXPRESSION_CONSTANT) {
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
