import { TwingNode, TwingNodeType } from "../node";
export class TwingNodeComment extends TwingNode {
    constructor(data, lineno, columnno) {
        super(new Map(), new Map([['data', data]]), lineno, columnno);
        this.type = TwingNodeType.COMMENT;
    }
    compile(compiler) {
        // noop
    }
}
