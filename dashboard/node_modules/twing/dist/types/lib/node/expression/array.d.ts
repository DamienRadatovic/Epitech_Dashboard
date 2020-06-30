import { TwingNodeExpression } from "../expression";
import { TwingCompiler } from "../../compiler";
export declare class TwingNodeExpressionArray extends TwingNodeExpression {
    private index;
    constructor(elements: Map<string | number, TwingNodeExpression>, lineno: number, columno: number);
    getKeyValuePairs(): Array<{
        key: TwingNodeExpression;
        value: TwingNodeExpression;
    }>;
    addElement(value: TwingNodeExpression, key?: TwingNodeExpression): void;
    compile(compiler: TwingCompiler): void;
}
