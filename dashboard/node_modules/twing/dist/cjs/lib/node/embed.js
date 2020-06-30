"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const include_1 = require("./include");
class TwingNodeEmbed extends include_1.TwingNodeInclude {
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
exports.TwingNodeEmbed = TwingNodeEmbed;
