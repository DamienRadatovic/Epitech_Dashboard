import { TwingEnvironment } from "../../../environment";
import { DateTime, Duration } from "luxon";
/**
 * Returns a new date object modified.
 *
 * <pre>
 *   {{ post.published_at|date_modify("-1day")|date("m/d/Y") }}
 * </pre>
 *
 * @param {TwingEnvironment} env
 * @param {DateTime|Duration|string} date A date
 * @param {string} modifier A modifier string
 *
 * @returns {Promise<DateTime>} A new date object
 */
export declare function dateModify(env: TwingEnvironment, date: Date | DateTime | Duration | string, modifier: string): Promise<DateTime>;
