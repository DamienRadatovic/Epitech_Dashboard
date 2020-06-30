import { TwingNodeExpressionBinary } from "../binary";
export class TwingNodeExpressionBinaryStartsWith extends TwingNodeExpressionBinary {
    compile(compiler) {
        compiler
            .raw('await (async () => {')
            .raw(`let left = `)
            .subcompile(this.getNode('left'))
            .raw('; ')
            .raw(`let right = `)
            .subcompile(this.getNode('right'))
            .raw('; ')
            .raw(`return typeof left === 'string' && typeof right === 'string' && (right.length < 1 || left.startsWith(right));`)
            .raw('})()');
    }
}
