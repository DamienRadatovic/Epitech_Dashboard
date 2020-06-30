import { TwingEnvironment } from "../../../environment";
/**
 * Escapes a string.
 *
 * @param {TwingEnvironment} env
 * @param {*} string The value to be escaped
 * @param {string} strategy The escaping strategy
 * @param {string} charset The charset
 * @param {boolean} autoescape Whether the function is called by the auto-escaping feature (true) or by the developer (false)
 *
 * @returns {Promise<string>}
 */
export declare function escape(env: TwingEnvironment, string: any, strategy?: string, charset?: string, autoescape?: boolean): Promise<string>;
