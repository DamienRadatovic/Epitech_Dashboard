import { TwingNodeExpression } from "../expression";
import { TwingCompiler } from "../../compiler";
export declare class TwingNodeExpressionParent extends TwingNodeExpression {
    constructor(name: string, lineno: number);
    compile(compiler: TwingCompiler): void;
}
