import { TwingNode, TwingNodeType } from "../node";
export class TwingNodePrint extends TwingNode {
    constructor(expr, lineno, columnno, tag = null) {
        let nodes = new Map();
        nodes.set('expr', expr);
        super(nodes, new Map(), lineno, columnno, tag);
        this.TwingNodeOutputInterfaceImpl = this;
        this.type = TwingNodeType.PRINT;
    }
    compile(compiler) {
        compiler
            .addSourceMapEnter(this)
            .write('this.echo(')
            .subcompile(this.getNode('expr'))
            .raw(');\n')
            .addSourceMapLeave();
    }
}
