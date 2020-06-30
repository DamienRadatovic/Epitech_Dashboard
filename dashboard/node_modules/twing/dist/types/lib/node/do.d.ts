import { TwingNode } from "../node";
import { TwingNodeExpression } from "./expression";
import { TwingCompiler } from "../compiler";
/**
 * Represents a do node.
 *
 * The do tag works exactly like the regular variable expression ({{ ... }}) just that it doesn't print anything:
 * {% do 1 + 2 %}
 *
 * @author Eric MORAND <eric.morand@gmail.com>
 * @author Eric Morand <eric.morand@gmail.com>
 */
export declare class TwingNodeDo extends TwingNode {
    constructor(expr: TwingNodeExpression, lineno: number, columnno: number, tag?: string);
    compile(compiler: TwingCompiler): void;
}
