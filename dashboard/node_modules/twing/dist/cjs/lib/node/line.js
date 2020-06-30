"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_1 = require("../node");
class TwingNodeLine extends node_1.TwingNode {
    constructor(data, lineno, columnno, tag) {
        super(new Map(), new Map([['data', data]]), lineno, columnno, tag);
        this.type = node_1.TwingNodeType.LINE;
    }
    compile(compiler) {
        // noop
    }
}
exports.TwingNodeLine = TwingNodeLine;
