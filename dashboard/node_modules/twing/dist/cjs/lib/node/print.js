"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_1 = require("../node");
class TwingNodePrint extends node_1.TwingNode {
    constructor(expr, lineno, columnno, tag = null) {
        let nodes = new Map();
        nodes.set('expr', expr);
        super(nodes, new Map(), lineno, columnno, tag);
        this.TwingNodeOutputInterfaceImpl = this;
        this.type = node_1.TwingNodeType.PRINT;
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
exports.TwingNodePrint = TwingNodePrint;
