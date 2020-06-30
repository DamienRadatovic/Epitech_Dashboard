import { TwingBaseNodeVisitor } from "../base-node-visitor";
import { TwingNode } from "../node";
import { TwingEnvironment } from "../environment";
/**
 * TwingNodeVisitorOptimizer tries to optimizes the AST.
 *
 * This visitor is always the last registered one.
 *
 * You can configure which optimizations you want to activate via the
 * optimizer mode.
 *
 * @author Eric MORAND <eric.morand@gmail.com>
 */
export declare class TwingNodeVisitorOptimizer extends TwingBaseNodeVisitor {
    static readonly OPTIMIZE_ALL = -1;
    static readonly OPTIMIZE_NONE = 0;
    static readonly OPTIMIZE_FOR = 2;
    static readonly OPTIMIZE_RAW_FILTER = 4;
    static readonly OPTIMIZE_VAR_ACCESS = 8;
    private loops;
    private loopsTargets;
    private optimizers;
    /**
     * @param {number} optimizers The optimizer mode
     */
    constructor(optimizers?: number);
    protected doEnterNode(node: TwingNode, env: TwingEnvironment): TwingNode;
    protected doLeaveNode(node: TwingNode, env: TwingEnvironment): TwingNode;
    /**
     * Optimizes print nodes.
     *
     * It replaces:
     *
     *   * "echo this.render(Parent)Block()" with "this.display(Parent)Block()"
     *
     * @returns {TwingNode}
     */
    private optimizePrintNode;
    /**
     * Removes "raw" filters.
     *
     * @returns {TwingNode}
     */
    private optimizeRawFilter;
    /**
     * Optimizes "for" tag by removing the "loop" variable creation whenever possible.
     */
    private enterOptimizeFor;
    /**
     * Optimizes "for" tag by removing the "loop" variable creation whenever possible.
     */
    private leaveOptimizeFor;
    private addLoopToCurrent;
    private addLoopToAll;
    getPriority(): number;
}
