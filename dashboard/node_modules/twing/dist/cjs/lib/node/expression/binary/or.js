"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const binary_1 = require("../binary");
class TwingNodeExpressionBinaryOr extends binary_1.TwingNodeExpressionBinary {
    compile(compiler) {
        compiler
            .raw('!!');
        super.compile(compiler);
    }
    operator(compiler) {
        return compiler.raw('||');
    }
}
exports.TwingNodeExpressionBinaryOr = TwingNodeExpressionBinaryOr;
