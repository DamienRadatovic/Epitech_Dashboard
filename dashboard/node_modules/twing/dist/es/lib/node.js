const var_export = require('locutus/php/var/var_export');
export var TwingNodeType;
(function (TwingNodeType) {
    TwingNodeType["AUTO_ESCAPE"] = "auto_escape";
    TwingNodeType["BLOCK"] = "block";
    TwingNodeType["BLOCK_REFERENCE"] = "block_reference";
    TwingNodeType["BODY"] = "body";
    TwingNodeType["COMMENT"] = "comment";
    TwingNodeType["DEPRECATED"] = "deprecated";
    TwingNodeType["DO"] = "do";
    TwingNodeType["EXPRESSION_ARRAY"] = "expression_array";
    TwingNodeType["EXPRESSION_ASSIGN_NAME"] = "expression_assign_name";
    TwingNodeType["EXPRESSION_BINARY"] = "expression_binary";
    TwingNodeType["EXPRESSION_BINARY_CONCAT"] = "expression_binary_concat";
    TwingNodeType["EXPRESSION_BINARY_RANGE"] = "expression_binary_range";
    TwingNodeType["EXPRESSION_BLOCK_REFERENCE"] = "expression_block_reference";
    TwingNodeType["EXPRESSION_CONDITIONAL"] = "expression_conditional";
    TwingNodeType["EXPRESSION_CONSTANT"] = "expression_constant";
    TwingNodeType["EXPRESSION_FILTER"] = "expression_filter";
    TwingNodeType["EXPRESSION_FUNCTION"] = "expression_function";
    TwingNodeType["EXPRESSION_GET_ATTR"] = "expression_get_attr";
    TwingNodeType["EXPRESSION_METHOD_CALL"] = "expression_method_call";
    TwingNodeType["EXPRESSION_NAME"] = "expression_name";
    TwingNodeType["EXPRESSION_NULL_COALESCE"] = "expression_null_coalesce";
    TwingNodeType["EXPRESSION_PARENT"] = "expression_parent";
    TwingNodeType["EXPRESSION_TEMP_NAME"] = "expression_temp_name";
    TwingNodeType["EXPRESSION_TEST"] = "expression_test";
    TwingNodeType["EXPRESSION_UNARY"] = "expression_unary";
    TwingNodeType["EXPRESSION_UNARY_NEG"] = "expression_unary_neg";
    TwingNodeType["EXPRESSION_UNARY_POS"] = "expression_unary_pos";
    TwingNodeType["FLUSH"] = "flush";
    TwingNodeType["FOR"] = "for";
    TwingNodeType["IF"] = "if";
    TwingNodeType["IMPORT"] = "import";
    TwingNodeType["INCLUDE"] = "include";
    TwingNodeType["INLINE_PRINT"] = "inline_print";
    TwingNodeType["LINE"] = "line";
    TwingNodeType["MACRO"] = "macro";
    TwingNodeType["MODULE"] = "module";
    TwingNodeType["PRINT"] = "print";
    TwingNodeType["SANDBOX"] = "sandbox";
    TwingNodeType["SET"] = "set";
    TwingNodeType["SPACELESS"] = "spaceless";
    TwingNodeType["TEXT"] = "text";
    TwingNodeType["VERBATIM"] = "verbatim";
    TwingNodeType["WITH"] = "with";
})(TwingNodeType || (TwingNodeType = {}));
export class TwingNode {
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
    constructor(nodes = new Map(), attributes = new Map(), lineno = 0, columnno = 0, tag = null) {
        this.name = null;
        this.nodes = nodes;
        this.attributes = attributes;
        this.lineno = lineno;
        this.columnno = columnno;
        this.tag = tag;
        this.type = null;
        this.types = [];
    }
    /**
     * @returns {TwingNode}
     */
    clone() {
        let result = Reflect.construct(this.constructor, []);
        for (let [name, node] of this.getNodes()) {
            result.setNode(name, node.clone());
        }
        for (let [name, node] of this.attributes) {
            if (node instanceof TwingNode) {
                node = node.clone();
            }
            result.setAttribute(name, node);
        }
        result.lineno = this.lineno;
        result.columnno = this.columnno;
        result.tag = this.tag;
        result.type = this.type;
        return result;
    }
    toString() {
        let attributes = [];
        for (let [name, value] of this.attributes) {
            let attributeRepr;
            if (value instanceof TwingNode) {
                attributeRepr = '' + value.toString();
            }
            else {
                attributeRepr = '' + var_export(value, true);
            }
            attributes.push(`${name}: ${attributeRepr.replace(/\n/g, '')}`);
        }
        attributes.push(`line: ${this.getTemplateLine()}`);
        attributes.push(`column: ${this.getTemplateColumn()}`);
        let repr = [this.constructor.name + '(' + attributes.join(', ')];
        if (this.nodes.size > 0) {
            for (let [name, node] of this.nodes) {
                let len = ('' + name).length + 4;
                let nodeRepr = [];
                for (let line of node.toString().split('\n')) {
                    nodeRepr.push(' '.repeat(len) + line);
                }
                repr.push(`  ${name}: ${nodeRepr.join('\n').trimLeft()}`);
            }
            repr.push(')');
        }
        else {
            repr[0] += ')';
        }
        return repr.join('\n');
    }
    getType() {
        return this.type;
    }
    addType(type) {
        this.types.push(type);
    }
    is(type) {
        return this.types.includes(type);
    }
    compile(compiler) {
        for (let [k, node] of this.nodes) {
            node.compile(compiler);
        }
    }
    getTemplateLine() {
        return this.lineno;
    }
    getTemplateColumn() {
        return this.columnno;
    }
    getNodeTag() {
        return this.tag;
    }
    /**
     * @returns booleqn
     */
    hasAttribute(name) {
        return this.attributes.has(name);
    }
    /**
     *
     * @param {string} name
     * @returns any
     */
    getAttribute(name) {
        if (!this.attributes.has(name)) {
            throw new Error(`Attribute "${name}" does not exist for Node "${this.constructor.name}".`);
        }
        return this.attributes.get(name);
    }
    /**
     * @param {string} name
     * @param {*} value
     */
    setAttribute(name, value) {
        this.attributes.set(name, value);
    }
    removeAttribute(name) {
        this.attributes.delete(name);
    }
    /**
     * @return bool
     */
    hasNode(name) {
        return this.nodes.has(name);
    }
    /**
     * @return TwingNode
     */
    getNode(name) {
        if (!this.nodes.has(name)) {
            throw new Error(`Node "${name}" does not exist for Node "${this.constructor.name}".`);
        }
        return this.nodes.get(name);
    }
    setNode(name, node) {
        this.nodes.set(name, node);
    }
    removeNode(name) {
        this.nodes.delete(name);
    }
    count() {
        return this.nodes.size;
    }
    setTemplateName(name) {
        this.name = name;
        for (let [k, node] of this.nodes) {
            node.setTemplateName(name);
        }
    }
    getTemplateName() {
        return this.name;
    }
    getNodes() {
        return this.nodes;
    }
}
