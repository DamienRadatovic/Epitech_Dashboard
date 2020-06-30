import { TwingNode } from "../node";
import { TwingCompiler } from "../compiler";
import { TwingNodeOutputInterface } from "../node-output-interface";
export declare class TwingNodeSpaceless extends TwingNode implements TwingNodeOutputInterface {
    TwingNodeOutputInterfaceImpl: TwingNodeOutputInterface;
    constructor(body: TwingNode, lineno: number, columnno: number, tag?: string);
    compile(compiler: TwingCompiler): void;
}
