import { TwingNode } from "../node";
import { TwingCompiler } from "../compiler";
import { TwingNodeOutputInterface } from "../node-output-interface";
/**
 * Represents a block call node.
 *
 * @author Eric MORAND <eric.morand@gmail.com>
 */
export declare class TwingNodeBlockReference extends TwingNode implements TwingNodeOutputInterface {
    TwingNodeOutputInterfaceImpl: TwingNodeOutputInterface;
    constructor(name: string, lineno: number, columnno: number, tag?: string);
    compile(compiler: TwingCompiler): void;
}
