"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ucwords = require('locutus/php/strings/ucwords');
/**
 * Returns a title-cased string.
 *
 * @param {TwingEnvironment} env
 * @param {string | TwingMarkup} string A string
 *
 * @returns {Promise<string>} The title-cased string
 */
function title(env, string) {
    let result = ucwords(string.toString().toLowerCase());
    return Promise.resolve(result);
}
exports.title = title;
