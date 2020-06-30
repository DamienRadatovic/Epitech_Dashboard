import { TwingNode } from "../node";
import { TwingNodeOutputInterface } from "../node-output-interface";
import { TwingNodeExpression } from "./expression";
import { TwingCompiler } from "../compiler";
export declare class TwingNodePrint extends TwingNode implements TwingNodeOutputInterface {
    TwingNodeOutputInterfaceImpl: TwingNodeOutputInterface;
    constructor(expr: TwingNodeExpression, lineno: number, columnno: number, tag?: string);
    compile(compiler: TwingCompiler): void;
}
