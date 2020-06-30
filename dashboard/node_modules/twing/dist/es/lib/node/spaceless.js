import { TwingNode, TwingNodeType } from "../node";
export class TwingNodeSpaceless extends TwingNode {
    constructor(body, lineno, columnno, tag = 'spaceless') {
        let nodes = new Map();
        nodes.set('body', body);
        super(nodes, new Map(), lineno, columnno, tag);
        this.type = TwingNodeType.SPACELESS;
        this.TwingNodeOutputInterfaceImpl = this;
    }
    compile(compiler) {
        compiler
            .addSourceMapEnter(this)
            .write("this.startOutputBuffer();\n")
            .subcompile(this.getNode('body'))
            .write("this.echo(this.getAndCleanOutputBuffer().replace(/>\\s+</g, '><').trim());\n")
            .addSourceMapLeave();
    }
}
