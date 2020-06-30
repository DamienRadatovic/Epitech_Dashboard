"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_1 = require("../node");
class TwingNodeBlock extends node_1.TwingNode {
    constructor(name, body, lineno, columnno, tag = null) {
        super(new Map([['body', body]]), new Map([['name', name]]), lineno, columnno, tag);
        this.type = node_1.TwingNodeType.BLOCK;
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
exports.TwingNodeBlock = TwingNodeBlock;
