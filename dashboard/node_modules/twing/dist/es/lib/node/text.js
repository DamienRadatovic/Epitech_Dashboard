import { TwingNode, TwingNodeType } from "../node";
export class TwingNodeText extends TwingNode {
    constructor(data, lineno, columnno, tag = null) {
        super(new Map(), new Map([['data', data]]), lineno, columnno, tag);
        this.type = TwingNodeType.TEXT;
        this.TwingNodeOutputInterfaceImpl = this;
    }
    compile(compiler) {
        compiler
            .addSourceMapEnter(this)
            .write('this.echo(')
            .string(this.getAttribute('data'))
            .raw(");\n")
            .addSourceMapLeave();
    }
}
