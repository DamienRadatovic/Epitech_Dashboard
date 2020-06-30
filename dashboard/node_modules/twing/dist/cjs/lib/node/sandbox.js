"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_1 = require("../node");
class TwingNodeSandbox extends node_1.TwingNode {
    constructor(body, lineno, columnno, tag = null) {
        super(new Map([['body', body]]), new Map(), lineno, columnno, tag);
        this.type = node_1.TwingNodeType.SANDBOX;
    }
    compile(compiler) {
        compiler
            .write('await (async () => {\n')
            .indent()
            .write('let alreadySandboxed = this.env.isSandboxed();\n')
            .write("if (!alreadySandboxed) {\n")
            .indent()
            .write("this.env.enableSandbox();\n")
            .outdent()
            .write("}\n")
            .subcompile(this.getNode('body'))
            .write("if (!alreadySandboxed) {\n")
            .indent()
            .write("this.env.disableSandbox();\n")
            .outdent()
            .write("}\n")
            .outdent()
            .write("})();\n");
    }
}
exports.TwingNodeSandbox = TwingNodeSandbox;
