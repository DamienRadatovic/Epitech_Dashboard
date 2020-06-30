"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const binary_1 = require("../binary");
class TwingNodeExpressionBinaryNotIn extends binary_1.TwingNodeExpressionBinary {
    compile(compiler) {
        compiler
            .raw('!this.isIn(')
            .subcompile(this.getNode('left'))
            .raw(', ')
            .subcompile(this.getNode('right'))
            .raw(')');
    }
}
exports.TwingNodeExpressionBinaryNotIn = TwingNodeExpressionBinaryNotIn;
