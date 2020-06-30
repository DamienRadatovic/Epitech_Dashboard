"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_1 = require("../node");
class TwingNodeWith extends node_1.TwingNode {
    constructor(body, variables, only, lineno, columnno, tag = null) {
        let nodes = new Map();
        nodes.set('body', body);
        if (variables) {
            nodes.set('variables', variables);
        }
        super(nodes, new Map([['only', only]]), lineno, columnno, tag);
        this.type = node_1.TwingNodeType.WITH;
    }
    compile(compiler) {
        if (this.hasNode('variables')) {
            let varsName = compiler.getVarName();
            compiler
                .write(`let ${varsName} = `)
                .subcompile(this.getNode('variables'))
                .raw(";\n")
                .write(`if (typeof (${varsName}) !== 'object') {\n`)
                .indent()
                .write('throw new this.RuntimeError(\'Variables passed to the "with" tag must be a hash.\', ')
                .repr(this.getTemplateLine())
                .raw(", this.getSourceContext());\n")
                .outdent()
                .write("}\n");
            if (this.getAttribute('only')) {
                compiler.write("context = new Map([['_parent', context]]);\n");
            }
            else {
                compiler.write("context.set('_parent', context.clone());\n");
            }
            compiler.write(`context = new this.Context(this.env.mergeGlobals(this.merge(context, this.convertToMap(${varsName}))));\n`);
        }
        else {
            compiler.write("context.set('_parent', context.clone());\n");
        }
        compiler
            .subcompile(this.getNode('body'))
            .write("context = context.get('_parent');\n");
    }
}
exports.TwingNodeWith = TwingNodeWith;
