"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("../test");
class TwingNodeExpressionTestConstant extends test_1.TwingNodeExpressionTest {
    compile(compiler) {
        compiler
            .raw('(')
            .subcompile(this.getNode('node'))
            .raw(' === this.constant(this.env, ')
            .subcompile(this.getNode('arguments').getNode(0));
        if (this.getNode('arguments').hasNode(1)) {
            compiler
                .raw(', ')
                .subcompile(this.getNode('arguments').getNode(1));
        }
        compiler.raw('))');
    }
}
exports.TwingNodeExpressionTestConstant = TwingNodeExpressionTestConstant;
