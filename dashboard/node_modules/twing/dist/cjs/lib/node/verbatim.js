"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_1 = require("../node");
const text_1 = require("./text");
/**
 * Represents a verbatim node.
 *
 * @author Eric Morand <eric.morand@gmail.com>
 */
class TwingNodeVerbatim extends text_1.TwingNodeText {
    constructor(data, lineno, columnno, tag) {
        super(data, lineno, columnno, tag);
        this.type = node_1.TwingNodeType.VERBATIM;
    }
}
exports.TwingNodeVerbatim = TwingNodeVerbatim;
