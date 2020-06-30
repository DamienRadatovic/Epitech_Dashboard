import { TwingEnvironment } from "../../../environment";
/**
 * Splits the string into an array.
 *
 * <pre>
 *  {{ "one,two,three"|split(',') }}
 *  {# returns [one, two, three] #}
 *
 *  {{ "one,two,three,four,five"|split(',', 3) }}
 *  {# returns [one, two, "three,four,five"] #}
 *
 *  {{ "123"|split('') }}
 *  {# returns [1, 2, 3] #}
 *
 *  {{ "aabbcc"|split('', 2) }}
 *  {# returns [aa, bb, cc] #}
 * </pre>
 *
 * @param {TwingEnvironment} env
 * @param {string} value A string
 * @param {string} delimiter The delimiter
 * @param {number} limit The limit
 *
 * @returns {Promise<Array<string>>} The split string as an array
 */
export declare function split(env: TwingEnvironment, value: string, delimiter: string, limit: number): Promise<Array<string>>;
