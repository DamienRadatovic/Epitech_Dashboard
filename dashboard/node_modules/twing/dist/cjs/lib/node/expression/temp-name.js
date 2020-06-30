"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const expression_1 = require("../expression");
const node_1 = require("../../node");
class TwingNodeExpressionTempName extends expression_1.TwingNodeExpression {
    constructor(name, declaration, lineno, columno) {
        let attributes = new Map();
        attributes.set('name', name);
        attributes.set('declaration', declaration);
        super(new Map(), attributes, lineno, columno);
        this.type = node_1.TwingNodeType.EXPRESSION_TEMP_NAME;
    }
    compile(compiler) {
        compiler
            .raw(`${this.getAttribute('declaration') ? 'let ' : ''}$_`)
            .raw(this.getAttribute('name'))
            .raw('_');
    }
}
exports.TwingNodeExpressionTempName = TwingNodeExpressionTempName;
