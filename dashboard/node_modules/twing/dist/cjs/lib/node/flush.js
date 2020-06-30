"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_1 = require("../node");
class TwingNodeFlush extends node_1.TwingNode {
    constructor(lineno, columnno, tag) {
        super(new Map(), new Map(), lineno, columnno, tag);
        this.type = node_1.TwingNodeType.FLUSH;
    }
    compile(compiler) {
        compiler
            .write("this.flushOutputBuffer();\n");
    }
}
exports.TwingNodeFlush = TwingNodeFlush;
