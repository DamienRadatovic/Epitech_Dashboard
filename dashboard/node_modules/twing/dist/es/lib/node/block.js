import { TwingNode, TwingNodeType } from "../node";
export class TwingNodeBlock extends TwingNode {
    constructor(name, body, lineno, columnno, tag = null) {
        super(new Map([['body', body]]), new Map([['name', name]]), lineno, columnno, tag);
        this.type = TwingNodeType.BLOCK;
    }
    compile(compiler) {
        compiler
            .raw(`async (context, blocks = new Map()) => {\n`)
            .indent()
            .write('let aliases = this.aliases.clone();\n');
        compiler
            .subcompile(this.getNode('body'))
            .outdent()
            .write("}");
    }
}
