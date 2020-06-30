import { TwingNodeExpression } from "../expression";
import { TwingCompiler } from "../../compiler";
export declare class TwingNodeExpressionTempName extends TwingNodeExpression {
    constructor(name: string, declaration: boolean, lineno: number, columno: number);
    compile(compiler: TwingCompiler): void;
}
