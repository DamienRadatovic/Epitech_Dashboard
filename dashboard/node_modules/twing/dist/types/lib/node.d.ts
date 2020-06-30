import { TwingCompiler } from "./compiler";
export declare enum TwingNodeType {
    AUTO_ESCAPE = "auto_escape",
    BLOCK = "block",
    BLOCK_REFERENCE = "block_reference",
    BODY = "body",
    COMMENT = "comment",
    DEPRECATED = "deprecated",
    DO = "do",
    EXPRESSION_ARRAY = "expression_array",
    EXPRESSION_ASSIGN_NAME = "expression_assign_name",
    EXPRESSION_BINARY = "expression_binary",
    EXPRESSION_BINARY_CONCAT = "expression_binary_concat",
    EXPRESSION_BINARY_RANGE = "expression_binary_range",
    EXPRESSION_BLOCK_REFERENCE = "expression_block_reference",
    EXPRESSION_CONDITIONAL = "expression_conditional",
    EXPRESSION_CONSTANT = "expression_constant",
    EXPRESSION_FILTER = "expression_filter",
    EXPRESSION_FUNCTION = "expression_function",
    EXPRESSION_GET_ATTR = "expression_get_attr",
    EXPRESSION_METHOD_CALL = "expression_method_call",
    EXPRESSION_NAME = "expression_name",
    EXPRESSION_NULL_COALESCE = "expression_null_coalesce",
    EXPRESSION_PARENT = "expression_parent",
    EXPRESSION_TEMP_NAME = "expression_temp_name",
    EXPRESSION_TEST = "expression_test",
    EXPRESSION_UNARY = "expression_unary",
    EXPRESSION_UNARY_NEG = "expression_unary_neg",
    EXPRESSION_UNARY_POS = "expression_unary_pos",
    FLUSH = "flush",
    FOR = "for",
    IF = "if",
    IMPORT = "import",
    INCLUDE = "include",
    INLINE_PRINT = "inline_print",
    LINE = "line",
    MACRO = "macro",
    MODULE = "module",
    PRINT = "print",
    SANDBOX = "sandbox",
    SET = "set",
    SPACELESS = "spaceless",
    TEXT = "text",
    VERBATIM = "verbatim",
    WITH = "with"
}
export declare class TwingNode {
    protected nodes: Map<number | string, TwingNode>;
    protected attributes: Map<string, any>;
    protected lineno: number;
    protected columnno: number;
    protected tag: string;
    protected type: TwingNodeType;
    private name;
    private types;
    /**
     * Constructor.
     *
     * The nodes are automatically made available as properties ($this->node).
     * The attributes are automatically made available as array items ($this['name']).
     *
     * @param nodes Map<string | number, TwingNode>  A map of named nodes
     * @param attributes Map<string, any> A map of attributes (should not be nodes)
     * @param lineno number The line number
     * @param columnno number The column number
     * @param tag string The tag name associated with the Node
     */
    constructor(nodes?: Map<string | number, TwingNode>, attributes?: Map<string, any>, lineno?: number, columnno?: number, tag?: string);
    /**
     * @returns {TwingNode}
     */
    clone(): TwingNode;
    toString(): string;
    getType(): TwingNodeType;
    addType(type: TwingNodeType): void;
    is(type: TwingNodeType): boolean;
    compile(compiler: TwingCompiler): any;
    getTemplateLine(): number;
    getTemplateColumn(): number;
    getNodeTag(): string;
    /**
     * @returns booleqn
     */
    hasAttribute(name: string): boolean;
    /**
     *
     * @param {string} name
     * @returns any
     */
    getAttribute(name: string): any;
    /**
     * @param {string} name
     * @param {*} value
     */
    setAttribute(name: string, value: any): void;
    removeAttribute(name: string): void;
    /**
     * @return bool
     */
    hasNode(name: any): boolean;
    /**
     * @return TwingNode
     */
    getNode(name: string | number): TwingNode;
    setNode(name: string | number, node: TwingNode): void;
    removeNode(name: string | number): void;
    count(): number;
    setTemplateName(name: string): void;
    getTemplateName(): string;
    getNodes(): Map<string | number, TwingNode>;
}
