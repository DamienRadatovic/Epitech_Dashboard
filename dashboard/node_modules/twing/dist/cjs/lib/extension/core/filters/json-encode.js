"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const iterator_to_hash_1 = require("../../../helpers/iterator-to-hash");
const is_map_1 = require("../../../helpers/is-map");
const is_pure_array_1 = require("../../../helpers/is-pure-array");
const iterator_to_array_1 = require("../../../helpers/iterator-to-array");
const locutusJsonEncode = require('locutus/php/json/json_encode');
function jsonEncode(value) {
    if (is_map_1.isMap(value)) {
        if (is_pure_array_1.isPureArray(value)) {
            value = iterator_to_array_1.iteratorToArray(value);
        }
        else {
            value = iterator_to_hash_1.iteratorToHash(value);
        }
    }
    return Promise.resolve(locutusJsonEncode(value));
}
exports.jsonEncode = jsonEncode;
