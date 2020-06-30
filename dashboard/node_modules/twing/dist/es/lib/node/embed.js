import { TwingNodeInclude } from "./include";
export class TwingNodeEmbed extends TwingNodeInclude {
    constructor(name, index, variables, only, ignoreMissing, lineno, columnno, tag) {
        super(null, variables, only, ignoreMissing, lineno, columnno, tag);
        this.setAttribute('name', name);
        this.setAttribute('index', index);
    }
    addGetTemplate(compiler) {
        compiler
            .raw('await this.loadTemplate(')
            .string(this.getAttribute('name'))
            .raw(', ')
            .repr(this.getTemplateLine())
            .raw(', ')
            .string(this.getAttribute('index'))
            .raw(')');
    }
}
