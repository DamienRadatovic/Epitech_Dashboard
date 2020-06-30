/**
 * Converts a string to uppercase.
 *
 * @param {TwingEnvironment} env
 * @param {string | TwingMarkup} string A string
 *
 * @returns {Promise<string>} The uppercased string
 */
export function upper(env, string) {
    return Promise.resolve(string.toString().toUpperCase());
}
