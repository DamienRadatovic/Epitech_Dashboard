"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_1 = require("../node");
class TwingNodeText extends node_1.TwingNode {
    constructor(data, lineno, columnno, tag = null) {
        super(new Map(), new Map([['data', data]]), lineno, columnno, tag);
        this.type = node_1.TwingNodeType.TEXT;
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
exports.TwingNodeText = TwingNodeText;
