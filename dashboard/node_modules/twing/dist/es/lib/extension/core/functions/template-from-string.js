/**
 * Loads a template from a string.
 *
 * <pre>
 * {{ include(template_from_string("Hello {{ name }}")) }}
 * </pre>
 *
 * @param {TwingEnvironment} env A TwingEnvironment instance
 * @param {string} template A template as a string or object implementing toString()
 * @param {string} name An optional name for the template to be used in error messages
 *
 * @returns {Promise<TwingTemplate>}
 */
export function templateFromString(env, template, name = null) {
    return env.createTemplate(template, name);
}
