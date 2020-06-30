"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_node_visitor_1 = require("../base-node-visitor");
const node_1 = require("../node");
const import_1 = require("../node/import");
const name_1 = require("../node/expression/name");
const assign_name_1 = require("../node/expression/assign-name");
const method_call_1 = require("../node/expression/method-call");
class TwingNodeVisitorMacroAutoImport extends base_node_visitor_1.TwingBaseNodeVisitor {
    constructor() {
        super(...arguments);
        this.inAModule = false;
        this.hasMacroCalls = false;
    }
    doEnterNode(node, env) {
        if (node.getType() == node_1.TwingNodeType.MODULE) {
            this.inAModule = true;
            this.hasMacroCalls = false;
        }
        return node;
    }
    doLeaveNode(node, env) {
        if (node.getType() == node_1.TwingNodeType.MODULE) {
            this.inAModule = false;
            if (this.hasMacroCalls) {
                node.getNode('constructor_end').setNode('_auto_macro_import', new import_1.TwingNodeImport(new name_1.TwingNodeExpressionName('_self', 0, 0), new assign_name_1.TwingNodeExpressionAssignName('_self', 0, 0), 0, 0, 'import', true));
            }
        }
        else if (this.inAModule) {
            if ((node.getType() == node_1.TwingNodeType.EXPRESSION_GET_ATTR) && (node.getNode('node').getType() === node_1.TwingNodeType.EXPRESSION_NAME) && (node.getNode('node').getAttribute('name') === '_self') && (node.getNode('attribute').getType() === node_1.TwingNodeType.EXPRESSION_CONSTANT)) {
                this.hasMacroCalls = true;
                let name = node.getNode('attribute').getAttribute('value');
                node = new method_call_1.TwingNodeExpressionMethodCall(node.getNode('node'), name, node.getNode('arguments'), node.getTemplateLine(), node.getTemplateColumn());
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
exports.TwingNodeVisitorMacroAutoImport = TwingNodeVisitorMacroAutoImport;
