"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constant_1 = require("../../../helpers/constant");
function constant(env, name, object = null) {
    return Promise.resolve(constant_1.constant(env, name, object));
}
exports.constant = constant;
