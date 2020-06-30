import { TwingEnvironment } from "../../../environment";
import { TwingMarkup } from "../../../markup";
/**
 * Returns a title-cased string.
 *
 * @param {TwingEnvironment} env
 * @param {string | TwingMarkup} string A string
 *
 * @returns {Promise<string>} The title-cased string
 */
export declare function title(env: TwingEnvironment, string: string | TwingMarkup): Promise<string>;
