import { TwingNode } from "../node";
import { TwingCompiler } from "../compiler";
/**
 * Represents an autoescape node.
 *
 * The value is the escaping strategy (can be html, js, ...)
 *
 * The true value is equivalent to html.
 *
 * If autoescaping is disabled, then the value is false.
 *
 * @author Eric MORAND <eric.morand@gmail.com>
 */
export declare class TwingNodeAutoEscape extends TwingNode {
    constructor(value: {}, body: TwingNode, lineno: number, columnno: number, tag?: string);
    compile(compiler: TwingCompiler): void;
}
