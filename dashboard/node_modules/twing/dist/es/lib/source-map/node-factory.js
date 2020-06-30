import { TwingSourceMapNode } from "./node";
export class TwingSourceMapNodeFactory {
    constructor(type) {
        this._type = type;
    }
    create(line, column, source) {
        return new TwingSourceMapNode(line, column, source, this.nodeType);
    }
    get nodeType() {
        return this._type;
    }
}
