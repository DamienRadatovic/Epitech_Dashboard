import { TwingSourceMapNodeFactory } from "../node-factory";
import { TwingSourceMapNodeSpaceless } from "../node/spaceless";
import { TwingNodeType } from "../../node";
export class TwingSourceMapNodeFactorySpaceless extends TwingSourceMapNodeFactory {
    constructor() {
        super(TwingNodeType.SPACELESS);
    }
    create(line, column, source) {
        return new TwingSourceMapNodeSpaceless(line, column, source);
    }
}
