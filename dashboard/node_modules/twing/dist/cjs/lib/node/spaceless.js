"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_1 = require("../node");
class TwingNodeSpaceless extends node_1.TwingNode {
    constructor(body, lineno, columnno, tag = 'spaceless') {
        let nodes = new Map();
        nodes.set('body', body);
        super(nodes, new Map(), lineno, columnno, tag);
        this.type = node_1.TwingNodeType.SPACELESS;
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
exports.TwingNodeSpaceless = TwingNodeSpaceless;
