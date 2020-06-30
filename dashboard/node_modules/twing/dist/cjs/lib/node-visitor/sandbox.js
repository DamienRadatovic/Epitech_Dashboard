"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_node_visitor_1 = require("../base-node-visitor");
const node_1 = require("../node");
const check_security_1 = require("../node/check-security");
const check_to_string_1 = require("../node/check-to-string");
class TwingNodeVisitorSandbox extends base_node_visitor_1.TwingBaseNodeVisitor {
    constructor() {
        super();
        this.inAModule = false;
        this.TwingNodeVisitorInterfaceImpl = this;
    }
    doEnterNode(node, env) {
        if (!env.isSandboxed()) {
            return node;
        }
        if (node.getType() === node_1.TwingNodeType.MODULE) {
            this.inAModule = true;
            this.tags = new Map();
            this.filters = new Map();
            this.functions = new Map();
            return node;
        }
        else if (this.inAModule) {
            // look for tags
            if (node.getNodeTag() && !(this.tags.has(node.getNodeTag()))) {
                this.tags.set(node.getNodeTag(), node);
            }
            // look for filters
            if (node.getType() === node_1.TwingNodeType.EXPRESSION_FILTER && !this.filters.has(node.getNode('filter').getAttribute('value'))) {
                this.filters.set(node.getNode('filter').getAttribute('value'), node);
            }
            // look for functions
            if (node.getType() === node_1.TwingNodeType.EXPRESSION_FUNCTION && !this.functions.has(node.getAttribute('name'))) {
                this.functions.set(node.getAttribute('name'), node);
            }
            // the .. operator is equivalent to the range() function
            if (node.getType() === node_1.TwingNodeType.EXPRESSION_BINARY_RANGE && !(this.functions.has('range'))) {
                this.functions.set('range', node);
            }
            // wrap print to check toString() calls
            if (node.getType() === node_1.TwingNodeType.PRINT) {
                this.needsToStringWrap = true;
                this.wrapNode(node, 'expr');
            }
            if (node.getType() === node_1.TwingNodeType.SET && !node.getAttribute('capture')) {
                this.needsToStringWrap = true;
            }
            // wrap outer nodes that can implicitly call toString()
            if (this.needsToStringWrap) {
                if (node.getType() === node_1.TwingNodeType.EXPRESSION_BINARY_CONCAT) {
                    this.wrapNode(node, 'left');
                    this.wrapNode(node, 'right');
                }
                if (node.getType() === node_1.TwingNodeType.EXPRESSION_FILTER) {
                    this.wrapNode(node, 'node');
                    this.wrapArrayNode(node, 'arguments');
                }
                if (node.getType() === node_1.TwingNodeType.EXPRESSION_FUNCTION) {
                    this.wrapArrayNode(node, 'arguments');
                }
            }
        }
        return node;
    }
    doLeaveNode(node, env) {
        if (!env.isSandboxed()) {
            return node;
        }
        if (node.getType() === node_1.TwingNodeType.MODULE) {
            this.inAModule = false;
            let nodes = new Map();
            let i = 0;
            nodes.set(i++, new check_security_1.TwingNodeCheckSecurity(this.filters, this.tags, this.functions));
            nodes.set(i++, node.getNode('display_start'));
            node.getNode('constructor_end').setNode('_security_check', new node_1.TwingNode(nodes));
        }
        else if (this.inAModule) {
            if (node.getType() === node_1.TwingNodeType.PRINT || node.getType() === node_1.TwingNodeType.SET) {
                this.needsToStringWrap = false;
            }
        }
        return node;
    }
    wrapNode(node, name) {
        let expr = node.getNode(name);
        if (expr.getType() === node_1.TwingNodeType.EXPRESSION_NAME || expr.getType() === node_1.TwingNodeType.EXPRESSION_GET_ATTR) {
            node.setNode(name, new check_to_string_1.TwingNodeCheckToString(expr));
        }
    }
    wrapArrayNode(node, name) {
        let args = node.getNode(name);
        for (let [name] of args.getNodes()) {
            this.wrapNode(args, name);
        }
    }
    getPriority() {
        return 0;
    }
}
exports.TwingNodeVisitorSandbox = TwingNodeVisitorSandbox;
