"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const call_1 = require("./call");
const node_1 = require("../../node");
class TwingNodeExpressionTest extends call_1.TwingNodeExpressionCall {
    constructor(node, name, nodeArguments, lineno, columnno) {
        let nodes = new Map();
        nodes.set('node', node);
        if (nodeArguments !== null) {
            nodes.set('arguments', nodeArguments);
        }
        super(nodes, new Map([['name', name]]), lineno, columnno);
        this.type = node_1.TwingNodeType.EXPRESSION_TEST;
    }
    compile(compiler) {
        let name = this.getAttribute('name');
        let test = compiler.getEnvironment().getTest(name);
        this.setAttribute('name', name);
        this.setAttribute('type', 'test');
        this.setAttribute('needs_environment', test.needsEnvironment());
        this.setAttribute('arguments', test.getArguments());
        this.setAttribute('callable', test.getCallable());
        this.setAttribute('is_variadic', test.isVariadic());
        this.setAttribute('accepted_arguments', test.getAcceptedArgments());
        super.compileCallable(compiler);
    }
}
exports.TwingNodeExpressionTest = TwingNodeExpressionTest;
