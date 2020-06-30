import { TwingNodeExpressionBinaryDiv } from "./div";
export class TwingNodeExpressionBinaryFloorDiv extends TwingNodeExpressionBinaryDiv {
    compile(compiler) {
        compiler.raw('Math.floor(');
        super.compile(compiler);
        compiler.raw(')');
    }
    operator(compiler) {
        return compiler.raw('/');
    }
}
