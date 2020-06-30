import { TwingNodeExpression } from "../expression";
import { TwingNodeType } from "../../node";
export class TwingNodeExpressionTempName extends TwingNodeExpression {
    constructor(name, declaration, lineno, columno) {
        let attributes = new Map();
        attributes.set('name', name);
        attributes.set('declaration', declaration);
        super(new Map(), attributes, lineno, columno);
        this.type = TwingNodeType.EXPRESSION_TEMP_NAME;
    }
    compile(compiler) {
        compiler
            .raw(`${this.getAttribute('declaration') ? 'let ' : ''}$_`)
            .raw(this.getAttribute('name'))
            .raw('_');
    }
}
