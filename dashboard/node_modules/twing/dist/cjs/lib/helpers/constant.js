"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function constant(env, name, object = null) {
    let candidate;
    if (object) {
        candidate = object;
    }
    else {
        candidate = env;
    }
    return candidate.constructor[name];
}
exports.constant = constant;
