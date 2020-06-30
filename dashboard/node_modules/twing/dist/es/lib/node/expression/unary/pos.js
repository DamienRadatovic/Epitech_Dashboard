import { TwingNodeExpressionUnary } from "../unary";
import { TwingNodeType } from "../../../node";
export class TwingNodeExpressionUnaryPos extends TwingNodeExpressionUnary {
    constructor(expr, lineno, columno) {
        super(expr, lineno, columno);
        this.type = TwingNodeType.EXPRESSION_UNARY_POS;
    }
    operator(compiler) {
        return compiler.raw('+');
    }
}
