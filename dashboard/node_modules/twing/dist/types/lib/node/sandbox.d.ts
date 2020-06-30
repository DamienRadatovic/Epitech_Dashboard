import { TwingNode } from "../node";
import { TwingCompiler } from "../compiler";
export declare class TwingNodeSandbox extends TwingNode {
    constructor(body: TwingNode, lineno: number, columnno: number, tag?: string);
    compile(compiler: TwingCompiler): void;
}
