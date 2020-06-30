import { TwingNode } from "../node";
import { TwingCompiler } from "../compiler";
export declare class TwingNodeLine extends TwingNode {
    constructor(data: number, lineno: number, columnno: number, tag: string);
    compile(compiler: TwingCompiler): void;
}
