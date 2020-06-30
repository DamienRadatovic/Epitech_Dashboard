"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_1 = require("./node");
class TwingSourceMapNodeFactory {
    constructor(type) {
        this._type = type;
    }
    create(line, column, source) {
        return new node_1.TwingSourceMapNode(line, column, source, this.nodeType);
    }
    get nodeType() {
        return this._type;
    }
}
exports.TwingSourceMapNodeFactory = TwingSourceMapNodeFactory;
