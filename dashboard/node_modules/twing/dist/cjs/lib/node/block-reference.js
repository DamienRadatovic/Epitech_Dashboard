"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_1 = require("../node");
/**
 * Represents a block call node.
 *
 * @author Eric MORAND <eric.morand@gmail.com>
 */
class TwingNodeBlockReference extends node_1.TwingNode {
    constructor(name, lineno, columnno, tag = null) {
        super(new Map(), new Map([['name', name]]), lineno, columnno, tag);
        this.type = node_1.TwingNodeType.BLOCK_REFERENCE;
        this.TwingNodeOutputInterfaceImpl = this;
    }
    compile(compiler) {
        compiler
            .write(`await this.traceableDisplayBlock(${this.getTemplateLine()}, this.getSourceContext())('${this.getAttribute('name')}', context.clone(), blocks);\n`);
    }
}
exports.TwingNodeBlockReference = TwingNodeBlockReference;
