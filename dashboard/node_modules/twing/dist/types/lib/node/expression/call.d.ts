import { TwingNodeExpression } from "../expression";
import { TwingNode } from "../../node";
import { TwingCompiler } from "../../compiler";
export declare abstract class TwingNodeExpressionCall extends TwingNodeExpression {
    protected compileCallable(compiler: TwingCompiler): void;
    protected compileArguments(compiler: TwingCompiler): void;
    protected getArguments(callable: Function, argumentsNode: TwingNode): Array<TwingNode>;
    protected normalizeName(name: string): any;
}
