import { TwingNodePrint } from "./print";
export class TwingNodeSandboxedPrint extends TwingNodePrint {
    compile(compiler) {
        compiler
            .write('this.echo(this.env.ensureToStringAllowed(')
            .subcompile(this.getNode('expr'))
            .raw("));\n");
    }
}
