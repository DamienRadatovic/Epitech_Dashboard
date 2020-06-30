/**
 * Represents a macro node.
 *
 * @author Eric MORAND <eric.morand@gmail.com>
 */
import { TwingNode } from "../node";
import { TwingCompiler } from "../compiler";
export declare class TwingNodeMacro extends TwingNode {
    static VARARGS_NAME: string;
    constructor(name: string, body: TwingNode, macroArguments: TwingNode, lineno: number, columnno: number, tag?: string);
    compile(compiler: TwingCompiler): void;
}
