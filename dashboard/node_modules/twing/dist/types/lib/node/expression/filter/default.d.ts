import { TwingNodeExpressionFilter } from "../filter";
import { TwingNode } from "../../../node";
import { TwingNodeExpressionConstant } from "../constant";
import { TwingCompiler } from "../../../compiler";
export declare class TwingNodeExpressionFilterDefault extends TwingNodeExpressionFilter {
    constructor(node: TwingNode, filterName: TwingNodeExpressionConstant, methodArguments: TwingNode, lineno: number, columnno: number, tag?: string);
    compile(compiler: TwingCompiler): void;
}
