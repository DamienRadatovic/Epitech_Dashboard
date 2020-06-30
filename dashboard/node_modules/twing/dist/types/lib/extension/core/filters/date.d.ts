import { TwingEnvironment } from "../../../environment";
import { DateTime, Duration } from "luxon";
/**
 * Converts a date to the given format.
 *
 * <pre>
 *   {{ post.published_at|date("m/d/Y") }}
 * </pre>
 *
 * @param {TwingEnvironment} env
 * @param {DateTime|Duration|string} date A date
 * @param {string|null} format The target format, null to use the default
 * @param {string|null|boolean} timezone The target timezone, null to use the default, false to leave unchanged
 *
 * @return {Promise<string>} The formatted date
 */
export declare function date(env: TwingEnvironment, date: DateTime | Duration | string, format?: string, timezone?: string | null | false): Promise<string>;
