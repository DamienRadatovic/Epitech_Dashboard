"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const array_1 = require("./array");
class TwingNodeExpressionHash extends array_1.TwingNodeExpressionArray {
    compile(compiler) {
        compiler
            .raw('new Map([');
        let first = true;
        for (let pair of this.getKeyValuePairs()) {
            if (!first) {
                compiler.raw(', ');
            }
            first = false;
            compiler
                .raw('[')
                .subcompile(pair.key)
                .raw(', ')
                .subcompile(pair.value)
                .raw(']');
        }
        compiler.raw('])');
    }
}
exports.TwingNodeExpressionHash = TwingNodeExpressionHash;
