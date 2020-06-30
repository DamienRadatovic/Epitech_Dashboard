import { TwingNode } from "../node";
import { TwingCompiler } from "../compiler";
import { TwingNodeOutputInterface } from "../node-output-interface";
export declare class TwingNodeText extends TwingNode implements TwingNodeOutputInterface {
    TwingNodeOutputInterfaceImpl: TwingNodeOutputInterface;
    constructor(data: string, lineno: number, columnno: number, tag?: string);
    compile(compiler: TwingCompiler): void;
}
