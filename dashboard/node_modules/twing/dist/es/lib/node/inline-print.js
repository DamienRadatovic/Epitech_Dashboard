import { TwingNode, TwingNodeType } from "../node";
export class TwingNodeInlinePrint extends TwingNode {
    constructor(node, lineno, columnno, tag = null) {
        super(new Map([['node', node]]), new Map(), lineno, columnno, tag);
        this.type = TwingNodeType.INLINE_PRINT;
    }
    compile(compiler) {
        compiler
            .raw('this.echo(')
            .subcompile(this.getNode('node'))
            .raw(')');
    }
}
