import { TwingNodeExpressionUnary } from "../unary";
import { TwingNodeType } from "../../../node";
export class TwingNodeExpressionUnaryNeg extends TwingNodeExpressionUnary {
    constructor(expr, lineno, columno) {
        super(expr, lineno, columno);
        this.type = TwingNodeType.EXPRESSION_UNARY_NEG;
    }
    operator(compiler) {
        return compiler.raw('-');
    }
}
