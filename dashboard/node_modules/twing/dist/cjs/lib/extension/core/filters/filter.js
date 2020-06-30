"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const iterator_to_map_1 = require("../../../helpers/iterator-to-map");
function filter(map, callback) {
    let result = new Map();
    map = iterator_to_map_1.iteratorToMap(map);
    for (let [k, v] of map) {
        if (callback(v)) {
            result.set(k, v);
        }
    }
    return Promise.resolve(result);
}
exports.filter = filter;
