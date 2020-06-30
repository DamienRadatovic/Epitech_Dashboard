import { TwingNodeExpressionUnary } from "../unary";
export class TwingNodeExpressionUnaryNot extends TwingNodeExpressionUnary {
    operator(compiler) {
        return compiler.raw('!');
    }
}
