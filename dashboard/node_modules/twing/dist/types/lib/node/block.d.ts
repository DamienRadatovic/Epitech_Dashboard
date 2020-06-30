import { TwingNode } from "../node";
import { TwingCompiler } from "../compiler";
export declare class TwingNodeBlock extends TwingNode {
    constructor(name: string, body: TwingNode, lineno: number, columnno: number, tag?: string);
    compile(compiler: TwingCompiler): void;
}
