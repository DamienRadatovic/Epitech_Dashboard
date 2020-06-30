import { TwingNode } from "../node";
import { TwingCompiler } from "../compiler";
export declare class TwingNodeFlush extends TwingNode {
    constructor(lineno: number, columnno: number, tag: string);
    compile(compiler: TwingCompiler): void;
}
