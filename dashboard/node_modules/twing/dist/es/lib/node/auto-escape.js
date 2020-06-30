import { TwingNode, TwingNodeType } from "../node";
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
export class TwingNodeAutoEscape extends TwingNode {
    constructor(value, body, lineno, columnno, tag = 'autoescape') {
        super(new Map([['body', body]]), new Map([['value', value]]), lineno, columnno, tag);
        this.type = TwingNodeType.AUTO_ESCAPE;
    }
    compile(compiler) {
        compiler.subcompile(this.getNode('body'));
    }
}
