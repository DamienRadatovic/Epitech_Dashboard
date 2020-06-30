"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_1 = require("../node");
class TwingNodeInlinePrint extends node_1.TwingNode {
    constructor(node, lineno, columnno, tag = null) {
        super(new Map([['node', node]]), new Map(), lineno, columnno, tag);
        this.type = node_1.TwingNodeType.INLINE_PRINT;
    }
    compile(compiler) {
        compiler
            .raw('this.echo(')
            .subcompile(this.getNode('node'))
            .raw(')');
    }
}
exports.TwingNodeInlinePrint = TwingNodeInlinePrint;
