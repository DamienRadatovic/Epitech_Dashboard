"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const name_1 = require("./name");
const node_1 = require("../../node");
class TwingNodeExpressionAssignName extends name_1.TwingNodeExpressionName {
    constructor(name, lineno, columnno) {
        super(name, lineno, columnno);
        this.type = node_1.TwingNodeType.EXPRESSION_ASSIGN_NAME;
    }
    compile(compiler) {
        compiler
            .raw('context.proxy[')
            .string(this.getAttribute('name'))
            .raw(']');
    }
}
exports.TwingNodeExpressionAssignName = TwingNodeExpressionAssignName;
