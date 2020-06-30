"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const print_1 = require("./print");
class TwingNodeSandboxedPrint extends print_1.TwingNodePrint {
    compile(compiler) {
        compiler
            .write('this.echo(this.env.ensureToStringAllowed(')
            .subcompile(this.getNode('expr'))
            .raw("));\n");
    }
}
exports.TwingNodeSandboxedPrint = TwingNodeSandboxedPrint;
