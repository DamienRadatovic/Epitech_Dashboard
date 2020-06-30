"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Represents an import node.
 *
 * @author Eric MORAND <eric.morand@gmail.com>
 */
const node_1 = require("../node");
class TwingNodeImport extends node_1.TwingNode {
    constructor(expr, varName, lineno, columnno, tag = null, global = true) {
        let nodes = new Map();
        nodes.set('expr', expr);
        nodes.set('var', varName);
        let attributes = new Map();
        attributes.set('global', global);
        super(nodes, attributes, lineno, columnno, tag);
        this.type = node_1.TwingNodeType.IMPORT;
    }
    compile(compiler) {
        compiler
            .write('aliases.proxy[')
            .repr(this.getNode('var').getAttribute('name'))
            .raw('] = ');
        if (this.getAttribute('global')) {
            compiler
                .raw('this.aliases.proxy[')
                .repr(this.getNode('var').getAttribute('name'))
                .raw('] = ');
        }
        if (this.getNode('expr').getType() === node_1.TwingNodeType.EXPRESSION_NAME && this.getNode('expr').getAttribute('name') === '_self') {
            compiler.raw('this');
        }
        else {
            compiler
                .raw('await this.loadTemplate(')
                .subcompile(this.getNode('expr'))
                .raw(', ')
                .repr(this.getTemplateLine())
                .raw(')');
        }
        compiler.raw(";\n");
    }
}
exports.TwingNodeImport = TwingNodeImport;
