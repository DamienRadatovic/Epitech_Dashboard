"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_1 = require("../../node");
const call_1 = require("./call");
class TwingNodeExpressionFilter extends call_1.TwingNodeExpressionCall {
    constructor(node, filterName, methodArguments, lineno, columnno, tag = null) {
        let nodes = new Map();
        nodes.set('node', node);
        nodes.set('filter', filterName);
        nodes.set('arguments', methodArguments);
        super(nodes, new Map(), lineno, columnno, tag);
        this.type = node_1.TwingNodeType.EXPRESSION_FILTER;
    }
    compile(compiler) {
        let name = this.getNode('filter').getAttribute('value');
        let filter = compiler.getEnvironment().getFilter(name);
        let callable = filter.getCallable();
        this.setAttribute('name', name);
        this.setAttribute('type', 'filter');
        this.setAttribute('needs_environment', filter.needsEnvironment());
        this.setAttribute('needs_context', filter.needsContext());
        this.setAttribute('needs_source', filter.needsSource());
        this.setAttribute('arguments', filter.getArguments());
        this.setAttribute('callable', callable);
        this.setAttribute('is_variadic', filter.isVariadic());
        this.setAttribute('accepted_arguments', filter.getAcceptedArgments());
        this.compileCallable(compiler);
    }
}
exports.TwingNodeExpressionFilter = TwingNodeExpressionFilter;
