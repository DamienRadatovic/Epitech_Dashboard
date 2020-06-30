/**
 * Represents a deprecated node.
 *
 * @author Eric MORAND <eric.morand@gmail.com>
 */
import { TwingNode } from "../node";
import { TwingNodeExpression } from "./expression";
import { TwingCompiler } from "../compiler";
export declare class TwingNodeDeprecated extends TwingNode {
    constructor(expr: TwingNodeExpression, lineno: number, columnno: number, tag?: string);
    compile(compiler: TwingCompiler): void;
}
