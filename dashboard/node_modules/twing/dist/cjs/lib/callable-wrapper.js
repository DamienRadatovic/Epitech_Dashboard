"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const error_1 = require("./error");
class TwingCallableWrapper {
    constructor(name, callable, acceptedArguments, options = {}) {
        this.arguments = [];
        this.name = name;
        this.callable = callable;
        this.acceptedArguments = acceptedArguments;
        this.options = Object.assign({}, {
            needs_environment: false,
            needs_context: false,
            needs_source: false,
            is_variadic: false,
            is_safe: null,
            is_safe_callback: null,
            deprecated: false,
            alternative: null
        }, options);
    }
    getName() {
        return this.name;
    }
    /**
     * @returns {Function}
     */
    getCallable() {
        return this.callable;
    }
    /**
     * @return TwingCallableArgument[]
     */
    getAcceptedArgments() {
        return this.acceptedArguments;
    }
    /**
     * Returns the traceable callable.
     *
     * @param {number} lineno
     * @param {TwingSource} source
     *
     * @return {TwingCallable<T>}
     */
    traceableCallable(lineno, source) {
        let callable = this.callable;
        return function () {
            return callable.apply(null, arguments).catch((e) => {
                if (e instanceof error_1.TwingError) {
                    if (e.getTemplateLine() === -1) {
                        e.setTemplateLine(lineno);
                        e.setSourceContext(source);
                    }
                }
                throw e;
            });
        };
    }
    isVariadic() {
        return this.options.is_variadic;
    }
    isDeprecated() {
        return this.options.deprecated ? true : false;
    }
    needsEnvironment() {
        return this.options.needs_environment;
    }
    needsContext() {
        return this.options.needs_context;
    }
    needsSource() {
        return this.options.needs_source;
    }
    getSafe(functionArgs) {
        if (this.options.is_safe !== null) {
            return this.options.is_safe;
        }
        if (this.options.is_safe_callback) {
            return this.options.is_safe_callback(functionArgs);
        }
        return [];
    }
    getDeprecatedVersion() {
        return this.options.deprecated;
    }
    getAlternative() {
        return this.options.alternative;
    }
    setArguments(arguments_) {
        this.arguments = arguments_;
    }
    getArguments() {
        return this.arguments;
    }
    getExpressionFactory() {
        return this.options.expression_factory;
    }
}
exports.TwingCallableWrapper = TwingCallableWrapper;
