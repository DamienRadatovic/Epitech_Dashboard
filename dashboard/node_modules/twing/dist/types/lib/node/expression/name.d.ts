import { TwingNodeExpression } from "../expression";
import { TwingCompiler } from "../../compiler";
export declare class TwingNodeExpressionName extends TwingNodeExpression {
    private specialVars;
    constructor(name: string, lineno: number, columnno: number);
    compile(compiler: TwingCompiler): void;
    isSpecial(): boolean;
    isSimple(): boolean;
}
