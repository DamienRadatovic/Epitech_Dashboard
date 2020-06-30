import { TwingNode } from "../node";
import { TwingCompiler } from "../compiler";
export declare class TwingNodeWith extends TwingNode {
    constructor(body: TwingNode, variables: TwingNode, only: boolean, lineno: number, columnno: number, tag?: string);
    compile(compiler: TwingCompiler): void;
}
