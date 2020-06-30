import { constant as constantHelper } from "../../../helpers/constant";
export function constant(env, name, object = null) {
    return Promise.resolve(constantHelper(env, name, object));
}
