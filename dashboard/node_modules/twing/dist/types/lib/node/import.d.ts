/**
 * Represents an import node.
 *
 * @author Eric MORAND <eric.morand@gmail.com>
 */
import { TwingNode } from "../node";
import { TwingNodeExpression } from "./expression";
import { TwingCompiler } from "../compiler";
export declare class TwingNodeImport extends TwingNode {
    constructor(expr: TwingNodeExpression, varName: TwingNodeExpression, lineno: number, columnno: number, tag?: string, global?: boolean);
    compile(compiler: TwingCompiler): void;
}
