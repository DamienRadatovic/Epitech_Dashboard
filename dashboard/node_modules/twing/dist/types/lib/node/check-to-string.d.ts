import { TwingNode } from "../node";
import { TwingNodeExpression } from "./expression";
import { TwingCompiler } from "../compiler";
/**
 * Checks if casting an expression to toString() is allowed by the sandbox.
 *
 * For instance, when there is a simple Print statement, like {{ article }},
 * and if the sandbox is enabled, we need to check that the toString()
 * method is allowed if 'article' is an object. The same goes for {{ article|upper }}
 * or {{ random(article) }}.
 */
export declare class TwingNodeCheckToString extends TwingNode {
    constructor(expression: TwingNodeExpression);
    compile(compiler: TwingCompiler): void;
}
