import { TwingNodeExpressionName } from "./name";
import { TwingCompiler } from "../../compiler";
export declare class TwingNodeExpressionAssignName extends TwingNodeExpressionName {
    constructor(name: string, lineno: number, columnno: number);
    compile(compiler: TwingCompiler): void;
}
