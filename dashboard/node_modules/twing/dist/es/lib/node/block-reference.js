import { TwingNode, TwingNodeType } from "../node";
/**
 * Represents a block call node.
 *
 * @author Eric MORAND <eric.morand@gmail.com>
 */
export class TwingNodeBlockReference extends TwingNode {
    constructor(name, lineno, columnno, tag = null) {
        super(new Map(), new Map([['name', name]]), lineno, columnno, tag);
        this.type = TwingNodeType.BLOCK_REFERENCE;
        this.TwingNodeOutputInterfaceImpl = this;
    }
    compile(compiler) {
        compiler
            .write(`await this.traceableDisplayBlock(${this.getTemplateLine()}, this.getSourceContext())('${this.getAttribute('name')}', context.clone(), blocks);\n`);
    }
}
