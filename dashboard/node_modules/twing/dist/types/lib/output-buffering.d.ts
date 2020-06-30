export declare class TwingOutputHandler {
    private content;
    private level;
    /**
     * @param level
     * @param flags Unused, kept for backward compatibility
     */
    constructor(level: number, flags: number);
    getContent(): string;
    write(value: string): void;
    append(value: string): void;
}
export declare class TwingOutputBuffering {
    static handlers: Array<TwingOutputHandler>;
    static echo(string: any): string | void;
    /**
     * Turn on Output Buffering (specifying an optional output handler).
     *
     * @returns {boolean}
     */
    static obStart(): boolean;
    /**
     * Flush (send) contents of the output buffer. The last buffer content is sent to next buffer
     *
     * In human terms, append the top-most buffer to the second-top-most buffer and empty the top-most buffer
     *
     * ┌─────────┐    ┌─────────┐
     * │   oof   │    │         │
     * ├─────────┤    ├─────────┤
     * │   bar   │ => │  baroof │
     * ├─────────┤    ├─────────┤
     * │   foo   │    │   foo   │ => true
     * └─────────┘    └─────────┘
     *
     */
    static obFlush(): boolean;
    /**
     * Alias for TwingOutputBuffering.obFlush
     *
     * @returns {boolean}
     */
    static flush(): boolean;
    /**
     * Flush (send) the output buffer, and delete current output buffer
     *
     * In human terms: append the top-most buffer to the second-top-most buffer and remove the top-most buffer
     *
     * ┌─────────┐
     * │   oof   │
     * ├─────────┤    ┌─────────┐
     * │   bar   │ -> │  baroof │
     * ├─────────┤    ├─────────┤
     * │   foo   │    │   foo   │ => true
     * └─────────┘    └─────────┘
     *
     * @returns {boolean}
     */
    static obEndFlush(): boolean;
    /**
     * Get active buffer contents, flush (send) the output buffer, and delete active output buffer
     *
     * In human terms: append the top-most buffer to the second-top-most buffer, remove the top-most buffer and returns its content
     *
     * ┌─────────┐
     * │   oof   │
     * ├─────────┤    ┌─────────┐
     * │   bar   │ -> │  baroof │
     * ├─────────┤    ├─────────┤
     * │   foo   │    │   foo   │ => oof
     * └─────────┘    └─────────┘
     *
     * @returns {string | false}
     */
    static obGetFlush(): string | false;
    /**
     * Clean (erase) the output buffer
     *
     * In human terms, empty the top-most buffer
     *
     * ┌─────────┐    ┌─────────┐
     * │   oof   │    │         │
     * ├─────────┤    ├─────────┤
     * │   bar   │ => │   bar   │
     * ├─────────┤    ├─────────┤
     * │   foo   │    │   foo   │ => true
     * └─────────┘    └─────────┘
     *
     */
    static obClean(): boolean;
    /**
     * Clean the output buffer, and delete active output buffer
     *
     * In human terms: clean the top-most buffer and remove the top-most buffer
     *
     * ┌─────────┐
     * │   oof   │
     * ├─────────┤    ┌─────────┐
     * │   bar   │ -> │   bar   │
     * ├─────────┤    ├─────────┤
     * │   foo   │    │   foo   │ => true
     * └─────────┘    └─────────┘
     *
     * @returns {boolean}
     */
    static obEndClean(): boolean;
    /**
     * Get active buffer contents and delete active output buffer
     *
     * In human terms: Remove the top-most buffer and returns its content
     *
     * ┌─────────┐
     * │   oof   │
     * ├─────────┤    ┌─────────┐
     * │   bar   │ -> │   bar   │
     * ├─────────┤    ├─────────┤
     * │   foo   │    │   foo   │ => oof
     * └─────────┘    └─────────┘
     *
     * @returns {string | false}
     */
    static obGetClean(): string | false;
    /**
     * Return the nesting level of the output buffering mechanism
     *
     * @returns {number}
     */
    static obGetLevel(): number;
    /**
     * Return the contents of the output buffer
     *
     * @returns {string | false}
     */
    static obGetContents(): string | false;
    /**
     * Append the string to the top-most buffer or return  the string if there is none
     *
     * @param {string} string | void
     */
    private static outputWrite;
    private static getActive;
}
export declare const echo: typeof TwingOutputBuffering.echo;
export declare const obStart: typeof TwingOutputBuffering.obStart;
export declare const obEndClean: typeof TwingOutputBuffering.obEndClean;
export declare const obGetClean: typeof TwingOutputBuffering.obGetClean;
export declare const obGetContents: typeof TwingOutputBuffering.obGetContents;
export declare const obGetLevel: typeof TwingOutputBuffering.obGetLevel;
export declare const flush: typeof TwingOutputBuffering.flush;
