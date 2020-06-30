import { TwingNodeExpression } from "../expression";
import { TwingNode } from "../../node";
import { TwingCompiler } from "../../compiler";
export declare class TwingNodeExpressionBlockReference extends TwingNodeExpression {
    constructor(name: TwingNode, template: TwingNode, lineno: number, columnno: number, tag?: string);
    compile(compiler: TwingCompiler): void;
    compileTemplateCall(compiler: TwingCompiler, method: string): TwingCompiler;
    compileBlockArguments(compiler: TwingCompiler): TwingCompiler;
}
