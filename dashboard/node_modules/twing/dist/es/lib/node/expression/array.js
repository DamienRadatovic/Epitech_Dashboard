import { TwingNodeExpression } from "../expression";
import { TwingNodeExpressionConstant } from "./constant";
import { TwingNodeType } from "../../node";
import { push } from "../../helpers/push";
import { ctypeDigit } from "../../helpers/ctype-digit";
let array_chunk = require('locutus/php/array/array_chunk');
export class TwingNodeExpressionArray extends TwingNodeExpression {
    constructor(elements, lineno, columno) {
        super(elements, new Map(), lineno, columno);
        this.type = TwingNodeType.EXPRESSION_ARRAY;
        this.index = -1;
        for (let pair of this.getKeyValuePairs()) {
            let expression = pair.key;
            if ((expression.getType() === TwingNodeType.EXPRESSION_CONSTANT) && (ctypeDigit('' + expression.getAttribute('value'))) && (expression.getAttribute('value') > this.index)) {
                this.index = expression.getAttribute('value');
            }
        }
    }
    getKeyValuePairs() {
        let pairs = [];
        array_chunk(Array.from(this.nodes.values()), 2).forEach(function (pair) {
            pairs.push({
                key: pair[0],
                value: pair[1]
            });
        });
        return pairs;
    }
    addElement(value, key = null) {
        if (key === null) {
            this.index++;
            key = new TwingNodeExpressionConstant(this.index, value.getTemplateLine(), value.getTemplateColumn());
        }
        push(this.nodes, key);
        push(this.nodes, value);
    }
    compile(compiler) {
        compiler.raw('new Map([');
        let first = true;
        for (let pair of this.getKeyValuePairs()) {
            if (!first) {
                compiler.raw(', ');
            }
            first = false;
            compiler
                .raw('[')
                .subcompile(pair.key)
                .raw(', ')
                .subcompile(pair.value)
                .raw(']');
        }
        compiler.raw('])');
    }
}
