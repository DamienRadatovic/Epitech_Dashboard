import { TwingNodeExpression } from "../expression";
import { TwingNodeType } from "../../node";
export class TwingNodeExpressionBlockReference extends TwingNodeExpression {
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
        this.type = TwingNodeType.EXPRESSION_BLOCK_REFERENCE;
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
