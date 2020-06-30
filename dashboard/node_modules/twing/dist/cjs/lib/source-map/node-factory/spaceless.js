"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_factory_1 = require("../node-factory");
const spaceless_1 = require("../node/spaceless");
const node_1 = require("../../node");
class TwingSourceMapNodeFactorySpaceless extends node_factory_1.TwingSourceMapNodeFactory {
    constructor() {
        super(node_1.TwingNodeType.SPACELESS);
    }
    create(line, column, source) {
        return new spaceless_1.TwingSourceMapNodeSpaceless(line, column, source);
    }
}
exports.TwingSourceMapNodeFactorySpaceless = TwingSourceMapNodeFactorySpaceless;
