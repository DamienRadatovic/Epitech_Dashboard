"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const binary_1 = require("../binary");
class TwingNodeExpressionBinaryPower extends binary_1.TwingNodeExpressionBinary {
    compile(compiler) {
        compiler
            .raw('Math.pow(')
            .subcompile(this.getNode('left'))
            .raw(', ')
            .subcompile(this.getNode('right'))
            .raw(')');
    }
}
exports.TwingNodeExpressionBinaryPower = TwingNodeExpressionBinaryPower;
