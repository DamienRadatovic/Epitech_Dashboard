import { TwingNodeExpression } from "./expression";
import { TwingNodeInclude } from "./include";
import { TwingCompiler } from "../compiler";
export declare class TwingNodeEmbed extends TwingNodeInclude {
    constructor(name: string, index: number, variables: TwingNodeExpression, only: boolean, ignoreMissing: boolean, lineno: number, columnno: number, tag: string);
    protected addGetTemplate(compiler: TwingCompiler): void;
}
