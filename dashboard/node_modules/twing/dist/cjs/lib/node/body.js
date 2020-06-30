"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_1 = require("../node");
/**
 * Represents a body node.
 *
 * @author Eric MORAND <eric.morand@gmail.com>
 */
class TwingNodeBody extends node_1.TwingNode {
    constructor(nodes = new Map(), attributes = new Map(), lineno = 0, columnno = 0, tag = null) {
        super(nodes, attributes, lineno, columnno, tag);
        this.type = node_1.TwingNodeType.BODY;
    }
}
exports.TwingNodeBody = TwingNodeBody;
