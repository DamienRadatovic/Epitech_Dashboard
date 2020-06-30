import { TwingEnvironment } from "../../../environment";
/**
 * Reverses a variable.
 *
 * @param {TwingEnvironment} env
 * @param {string | Map<*, *>} item A traversable instance, or a string
 * @param {boolean} preserveKeys Whether to preserve key or not
 *
 * @returns {Promise<string | Map<any, any>>} The reversed input
 */
export declare function reverse(env: TwingEnvironment, item: any, preserveKeys?: boolean): Promise<string | Map<any, any>>;
