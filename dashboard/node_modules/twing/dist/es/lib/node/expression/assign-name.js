import { TwingNodeExpressionName } from "./name";
import { TwingNodeType } from "../../node";
export class TwingNodeExpressionAssignName extends TwingNodeExpressionName {
    constructor(name, lineno, columnno) {
        super(name, lineno, columnno);
        this.type = TwingNodeType.EXPRESSION_ASSIGN_NAME;
    }
    compile(compiler) {
        compiler
            .raw('context.proxy[')
            .string(this.getAttribute('name'))
            .raw(']');
    }
}
