"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const div_1 = require("./div");
class TwingNodeExpressionBinaryFloorDiv extends div_1.TwingNodeExpressionBinaryDiv {
    compile(compiler) {
        compiler.raw('Math.floor(');
        super.compile(compiler);
        compiler.raw(')');
    }
    operator(compiler) {
        return compiler.raw('/');
    }
}
exports.TwingNodeExpressionBinaryFloorDiv = TwingNodeExpressionBinaryFloorDiv;
