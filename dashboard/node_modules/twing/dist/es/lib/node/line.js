import { TwingNode, TwingNodeType } from "../node";
export class TwingNodeLine extends TwingNode {
    constructor(data, lineno, columnno, tag) {
        super(new Map(), new Map([['data', data]]), lineno, columnno, tag);
        this.type = TwingNodeType.LINE;
    }
    compile(compiler) {
        // noop
    }
}
