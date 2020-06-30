import { TwingNode } from "../node";
import { TwingCompiler } from "../compiler";
export declare class TwingNodeComment extends TwingNode {
    constructor(data: string, lineno: number, columnno: number);
    compile(compiler: TwingCompiler): void;
}
