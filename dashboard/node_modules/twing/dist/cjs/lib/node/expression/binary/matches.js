"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const binary_1 = require("../binary");
class TwingNodeExpressionBinaryMatches extends binary_1.TwingNodeExpressionBinary {
    compile(compiler) {
        compiler
            .raw('this.parseRegExp(')
            .subcompile(this.getNode('right'))
            .raw(').test(')
            .subcompile(this.getNode('left'))
            .raw(')');
    }
}
exports.TwingNodeExpressionBinaryMatches = TwingNodeExpressionBinaryMatches;
