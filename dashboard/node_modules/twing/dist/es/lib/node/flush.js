import { TwingNode, TwingNodeType } from "../node";
export class TwingNodeFlush extends TwingNode {
    constructor(lineno, columnno, tag) {
        super(new Map(), new Map(), lineno, columnno, tag);
        this.type = TwingNodeType.FLUSH;
    }
    compile(compiler) {
        compiler
            .write("this.flushOutputBuffer();\n");
    }
}
