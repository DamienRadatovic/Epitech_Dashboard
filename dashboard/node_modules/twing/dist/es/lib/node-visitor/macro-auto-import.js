import { TwingBaseNodeVisitor } from "../base-node-visitor";
import { TwingNodeType } from "../node";
import { TwingNodeImport } from "../node/import";
import { TwingNodeExpressionName } from "../node/expression/name";
import { TwingNodeExpressionAssignName } from "../node/expression/assign-name";
import { TwingNodeExpressionMethodCall } from "../node/expression/method-call";
export class TwingNodeVisitorMacroAutoImport extends TwingBaseNodeVisitor {
    constructor() {
        super(...arguments);
        this.inAModule = false;
        this.hasMacroCalls = false;
    }
    doEnterNode(node, env) {
        if (node.getType() == TwingNodeType.MODULE) {
            this.inAModule = true;
            this.hasMacroCalls = false;
        }
        return node;
    }
    doLeaveNode(node, env) {
        if (node.getType() == TwingNodeType.MODULE) {
            this.inAModule = false;
            if (this.hasMacroCalls) {
                node.getNode('constructor_end').setNode('_auto_macro_import', new TwingNodeImport(new TwingNodeExpressionName('_self', 0, 0), new TwingNodeExpressionAssignName('_self', 0, 0), 0, 0, 'import', true));
            }
        }
        else if (this.inAModule) {
            if ((node.getType() == TwingNodeType.EXPRESSION_GET_ATTR) && (node.getNode('node').getType() === TwingNodeType.EXPRESSION_NAME) && (node.getNode('node').getAttribute('name') === '_self') && (node.getNode('attribute').getType() === TwingNodeType.EXPRESSION_CONSTANT)) {
                this.hasMacroCalls = true;
                let name = node.getNode('attribute').getAttribute('value');
                node = new TwingNodeExpressionMethodCall(node.getNode('node'), name, node.getNode('arguments'), node.getTemplateLine(), node.getTemplateColumn());
                node.setAttribute('safe', true);
            }
        }
        return node;
    }
    getPriority() {
        // we must run before auto-escaping
        return -10;
    }
}
