import { TwingEnvironment } from "../../../environment";
import { TwingSource } from "../../../source";
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
export declare function source(env: TwingEnvironment, from: TwingSource, name: string, ignoreMissing?: boolean): Promise<string>;
