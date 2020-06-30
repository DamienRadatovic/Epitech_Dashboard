"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_1 = require("../node");
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
class TwingNodeAutoEscape extends node_1.TwingNode {
    constructor(value, body, lineno, columnno, tag = 'autoescape') {
        super(new Map([['body', body]]), new Map([['value', value]]), lineno, columnno, tag);
        this.type = node_1.TwingNodeType.AUTO_ESCAPE;
    }
    compile(compiler) {
        compiler.subcompile(this.getNode('body'));
    }
}
exports.TwingNodeAutoEscape = TwingNodeAutoEscape;
