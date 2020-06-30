"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_1 = require("../node");
/**
 * Represents a do node.
 *
 * The do tag works exactly like the regular variable expression ({{ ... }}) just that it doesn't print anything:
 * {% do 1 + 2 %}
 *
 * @author Eric MORAND <eric.morand@gmail.com>
 * @author Eric Morand <eric.morand@gmail.com>
 */
class TwingNodeDo extends node_1.TwingNode {
    constructor(expr, lineno, columnno, tag = null) {
        super(new Map([['expr', expr]]), new Map(), lineno, columnno, tag);
        this.type = node_1.TwingNodeType.DO;
    }
    compile(compiler) {
        compiler
            .subcompile(this.getNode('expr'), true)
            .raw(";\n");
    }
}
exports.TwingNodeDo = TwingNodeDo;
