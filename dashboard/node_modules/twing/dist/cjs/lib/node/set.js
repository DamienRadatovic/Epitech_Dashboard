"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_1 = require("../node");
const constant_1 = require("./expression/constant");
class TwingNodeSet extends node_1.TwingNode {
    constructor(capture, names, values, lineno, columnno, tag = null) {
        let nodes = new Map();
        nodes.set('names', names);
        nodes.set('values', values);
        let attributes = new Map();
        attributes.set('capture', capture);
        attributes.set('safe', false);
        super(nodes, attributes, lineno, columnno, tag);
        this.type = node_1.TwingNodeType.SET;
        this.TwingNodeCaptureInterfaceImpl = this;
        /*
         * Optimizes the node when capture is used for a large block of text.
         *
         * {% set foo %}foo{% endset %} is compiled to $context['foo'] = new Twig_Markup("foo");
         */
        if (this.getAttribute('capture')) {
            this.setAttribute('safe', true);
            let values = this.getNode('values');
            if (values.getType() === node_1.TwingNodeType.TEXT) {
                this.setNode('values', new constant_1.TwingNodeExpressionConstant(values.getAttribute('data'), values.getTemplateLine(), values.getTemplateColumn()));
                this.setAttribute('capture', false);
            }
        }
    }
    compile(compiler) {
        if (this.getNode('names').getNodes().size > 1) {
            compiler.write('[');
            for (let [idx, node] of this.getNode('names').getNodes()) {
                if (idx > 0) {
                    compiler.raw(', ');
                }
                compiler
                    .subcompile(node);
            }
            compiler.raw(']');
        }
        else {
            if (this.getAttribute('capture')) {
                compiler
                    .write("this.startOutputBuffer();\n")
                    .subcompile(this.getNode('values'));
            }
            compiler.subcompile(this.getNode('names'), false);
            if (this.getAttribute('capture')) {
                compiler
                    .raw(" = (() => {let tmp = this.getAndCleanOutputBuffer(); return tmp === '' ? '' : new this.Markup(tmp, this.env.getCharset());})()");
            }
        }
        if (!this.getAttribute('capture')) {
            compiler.raw(' = ');
            if (this.getNode('names').getNodes().size > 1) {
                compiler.raw('[');
                for (let [idx, value] of this.getNode('values').getNodes()) {
                    if (idx > 0) {
                        compiler.raw(', ');
                    }
                    compiler
                        .subcompile(value);
                }
                compiler.raw(']');
            }
            else {
                if (this.getAttribute('safe')) {
                    compiler
                        .raw("await (async () => {let tmp = ")
                        .subcompile(this.getNode('values'))
                        .raw("; return tmp === '' ? '' : new this.Markup(tmp, this.env.getCharset());})()");
                }
                else {
                    compiler.subcompile(this.getNode('values'));
                }
            }
        }
        compiler.raw(';\n');
    }
}
exports.TwingNodeSet = TwingNodeSet;
