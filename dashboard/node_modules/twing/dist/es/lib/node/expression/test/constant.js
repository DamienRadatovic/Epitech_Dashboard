import { TwingNodeExpressionTest } from "../test";
export class TwingNodeExpressionTestConstant extends TwingNodeExpressionTest {
    compile(compiler) {
        compiler
            .raw('(')
            .subcompile(this.getNode('node'))
            .raw(' === this.constant(this.env, ')
            .subcompile(this.getNode('arguments').getNode(0));
        if (this.getNode('arguments').hasNode(1)) {
            compiler
                .raw(', ')
                .subcompile(this.getNode('arguments').getNode(1));
        }
        compiler.raw('))');
    }
}
