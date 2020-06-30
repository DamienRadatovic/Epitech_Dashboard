"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_1 = require("../../node");
const call_1 = require("./call");
class TwingNodeExpressionFunction extends call_1.TwingNodeExpressionCall {
    constructor(name, functionArguments, lineno, columnno) {
        let nodes = new Map([
            ['arguments', functionArguments]
        ]);
        let attributes = new Map();
        attributes.set('name', name);
        attributes.set('is_defined_test', false);
        super(nodes, attributes, lineno, columnno);
        this.type = node_1.TwingNodeType.EXPRESSION_FUNCTION;
    }
    compile(compiler) {
        let name = this.getAttribute('name');
        let function_ = compiler.getEnvironment().getFunction(name);
        this.setAttribute('name', name);
        this.setAttribute('type', 'function');
        this.setAttribute('needs_environment', function_.needsEnvironment());
        this.setAttribute('needs_context', function_.needsContext());
        this.setAttribute('needs_source', function_.needsSource());
        this.setAttribute('arguments', function_.getArguments());
        let callable = function_.getCallable();
        this.setAttribute('callable', callable);
        this.setAttribute('is_variadic', function_.isVariadic());
        this.setAttribute('accepted_arguments', function_.getAcceptedArgments());
        this.compileCallable(compiler);
    }
}
exports.TwingNodeExpressionFunction = TwingNodeExpressionFunction;
