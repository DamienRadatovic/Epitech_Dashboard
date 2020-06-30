"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_1 = require("../node");
class TwingNodeComment extends node_1.TwingNode {
    constructor(data, lineno, columnno) {
        super(new Map(), new Map([['data', data]]), lineno, columnno);
        this.type = node_1.TwingNodeType.COMMENT;
    }
    compile(compiler) {
        // noop
    }
}
exports.TwingNodeComment = TwingNodeComment;
