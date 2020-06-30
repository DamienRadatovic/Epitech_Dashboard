"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const iterator_to_map_1 = require("../../../helpers/iterator-to-map");
function reduce(map, callback, initial = null) {
    map = iterator_to_map_1.iteratorToMap(map);
    let values = Array.from(map.values());
    return Promise.resolve(values.reduce((previousValue, currentValue) => {
        return callback(previousValue, currentValue);
    }, initial));
}
exports.reduce = reduce;
