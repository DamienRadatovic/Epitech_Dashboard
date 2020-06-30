"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const loader_1 = require("../../../error/loader");
/**
 * Returns a template content without rendering it.
 *
 * @param {TwingEnvironment} env
 * @param {TwingSource} from
 * @param {string} name The template name
 * @param {boolean} ignoreMissing Whether to ignore missing templates or not
 *
 * @return {Promise<string>} The template source
 */
function source(env, from, name, ignoreMissing = false) {
    return env.getLoader().getSourceContext(name, from).then((source) => {
        return source.getCode();
    }).catch((e) => {
        if (e instanceof loader_1.TwingErrorLoader) {
            if (!ignoreMissing) {
                throw e;
            }
            else {
                return null;
            }
        }
        else {
            throw e;
        }
    });
}
exports.source = source;
