import { TwingNode, TwingNodeType } from "../node";
export class TwingNodeSandbox extends TwingNode {
    constructor(body, lineno, columnno, tag = null) {
        super(new Map([['body', body]]), new Map(), lineno, columnno, tag);
        this.type = TwingNodeType.SANDBOX;
    }
    compile(compiler) {
        compiler
            .write('await (async () => {\n')
            .indent()
            .write('let alreadySandboxed = this.env.isSandboxed();\n')
            .write("if (!alreadySandboxed) {\n")
            .indent()
            .write("this.env.enableSandbox();\n")
            .outdent()
            .write("}\n")
            .subcompile(this.getNode('body'))
            .write("if (!alreadySandboxed) {\n")
            .indent()
            .write("this.env.disableSandbox();\n")
            .outdent()
            .write("}\n")
            .outdent()
            .write("})();\n");
    }
}
