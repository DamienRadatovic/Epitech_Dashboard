import { TwingNodeExpressionBinary } from "../binary";
import { TwingCompiler } from "../../../compiler";
import { TwingNode } from "../../../node";
export declare class TwingNodeExpressionBinaryRange extends TwingNodeExpressionBinary {
    constructor(nodes: [TwingNode, TwingNode], lineno: number, columno: number);
    compile(compiler: TwingCompiler): void;
}
