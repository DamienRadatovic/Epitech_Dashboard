import { TwingEnvironment } from "../../../environment";
import { TwingSource } from "../../../source";
import { TwingTemplate } from "../../../template";
/**
 * Renders a template.
 *
 * @param {TwingEnvironment} env
 * @param {any} context
 * @param {TwingSource} from
 * @param {string | Map<number, string | TwingTemplate>} templates The template to render or an array of templates to try consecutively
 * @param {any} variables The variables to pass to the template
 * @param {boolean} withContext
 * @param {boolean} ignoreMissing Whether to ignore missing templates or not
 * @param {boolean} sandboxed Whether to sandbox the template or not
 *
 * @returns {Promise<string>} The rendered template
 */
export declare function include(env: TwingEnvironment, context: any, from: TwingSource, templates: string | Map<number, string | TwingTemplate> | TwingTemplate, variables?: any, withContext?: boolean, ignoreMissing?: boolean, sandboxed?: boolean): Promise<string>;
