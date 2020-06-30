import { TwingNode } from "../node";
import { TwingCompiler } from "../compiler";
export declare class TwingNodeCheckSecurity extends TwingNode {
    private usedFilters;
    private usedTags;
    private usedFunctions;
    constructor(usedFilters: Map<string, TwingNode | string>, usedTags: Map<string, TwingNode | string>, usedFunctions: Map<string, TwingNode | string>);
    compile(compiler: TwingCompiler): void;
}
