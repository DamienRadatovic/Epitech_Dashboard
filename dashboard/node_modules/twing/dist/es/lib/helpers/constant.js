export function constant(env, name, object = null) {
    let candidate;
    if (object) {
        candidate = object;
    }
    else {
        candidate = env;
    }
    return candidate.constructor[name];
}
