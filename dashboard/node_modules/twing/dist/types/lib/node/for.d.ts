import { TwingNode } from "../node";
import { TwingNodeExpression } from "./expression";
import { TwingNodeExpressionAssignName } from "./expression/assign-name";
import { TwingCompiler } from "../compiler";
export declare class TwingNodeFor extends TwingNode {
    private loop;
    constructor(keyTarget: TwingNodeExpressionAssignName, valueTarget: TwingNodeExpressionAssignName, seq: TwingNodeExpression, ifexpr: TwingNodeExpression, body: TwingNode, elseNode: TwingNode, lineno: number, columnno: number, tag?: string);
    compile(compiler: TwingCompiler): void;
}
