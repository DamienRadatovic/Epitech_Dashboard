import { TwingNode } from "../node";
import { TwingNodeExpression } from "./expression";
import { TwingCompiler } from "../compiler";
export declare class TwingNodeInclude extends TwingNode {
    constructor(expr: TwingNodeExpression, variables: TwingNodeExpression, only: boolean, ignoreMissing: boolean, lineno: number, columnno: number, tag?: string);
    compile(compiler: TwingCompiler): void;
    protected addGetTemplate(compiler: TwingCompiler): void;
}
