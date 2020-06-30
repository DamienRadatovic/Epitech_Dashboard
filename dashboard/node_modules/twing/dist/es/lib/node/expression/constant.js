import { TwingNodeExpression } from "../expression";
import { TwingNodeType } from "../../node";
export class TwingNodeExpressionConstant extends TwingNodeExpression {
    constructor(value, lineno, columnno) {
        super(new Map(), new Map([['value', value]]), lineno, columnno);
        this.type = TwingNodeType.EXPRESSION_CONSTANT;
    }
    compile(compiler) {
        compiler.repr(this.getAttribute('value'));
    }
}
