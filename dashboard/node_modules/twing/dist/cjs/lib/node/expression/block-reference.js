"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const expression_1 = require("../expression");
const node_1 = require("../../node");
class TwingNodeExpressionBlockReference extends expression_1.TwingNodeExpression {
    constructor(name, template, lineno, columnno, tag = null) {
        let nodes = new Map();
        nodes.set('name', name);
        if (template) {
            nodes.set('template', template);
        }
        let attributes = new Map([
            ['is_defined_test', false],
            ['output', false]
        ]);
        super(nodes, attributes, lineno, columnno, tag);
        this.type = node_1.TwingNodeType.EXPRESSION_BLOCK_REFERENCE;
    }
    compile(compiler) {
        if (this.getAttribute('is_defined_test')) {
            this.compileTemplateCall(compiler, 'traceableHasBlock');
        }
        else {
            if (this.getAttribute('output')) {
                this
                    .compileTemplateCall(compiler, `traceableDisplayBlock`)
                    .raw(";\n");
            }
            else {
                this.compileTemplateCall(compiler, 'traceableRenderBlock');
            }
        }
    }
    compileTemplateCall(compiler, method) {
        compiler.write('await ');
        if (!this.hasNode('template')) {
            compiler.raw('this');
        }
        else {
            compiler
                .raw('(await this.loadTemplate(')
                .subcompile(this.getNode('template'))
                .raw(', ')
                .repr(this.getTemplateLine())
                .raw('))');
        }
        compiler.raw(`.${method}(${this.getTemplateLine()}, this.getSourceContext())`);
        this.compileBlockArguments(compiler);
        return compiler;
    }
    compileBlockArguments(compiler) {
        compiler
            .raw('(')
            .subcompile(this.getNode('name'))
            .raw(', context.clone()');
        if (!this.hasNode('template')) {
            compiler.raw(', blocks');
        }
        return compiler.raw(')');
    }
}
exports.TwingNodeExpressionBlockReference = TwingNodeExpressionBlockReference;
