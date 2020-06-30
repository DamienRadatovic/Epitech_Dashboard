import { TwingNodeText } from "./text";
/**
 * Represents a verbatim node.
 *
 * @author Eric Morand <eric.morand@gmail.com>
 */
export declare class TwingNodeVerbatim extends TwingNodeText {
    constructor(data: string, lineno: number, columnno: number, tag: string);
}
