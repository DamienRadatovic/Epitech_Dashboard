"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const token_parser_1 = require("../token-parser");
const syntax_1 = require("../error/syntax");
const sandbox_1 = require("../node/sandbox");
const node_1 = require("../node");
const ctype_space_1 = require("../helpers/ctype-space");
const twig_lexer_1 = require("twig-lexer");
class TwingTokenParserSandbox extends token_parser_1.TwingTokenParser {
    parse(token) {
        let stream = this.parser.getStream();
        stream.expect(twig_lexer_1.TokenType.TAG_END);
        let body = this.parser.subparse([this, this.decideBlockEnd], true);
        stream.expect(twig_lexer_1.TokenType.TAG_END);
        // in a sandbox tag, only include tags are allowed
        if (body.getType() !== node_1.TwingNodeType.INCLUDE) {
            body.getNodes().forEach(function (node) {
                if (!(node.getType() === node_1.TwingNodeType.TEXT && ctype_space_1.ctypeSpace(node.getAttribute('data')))) {
                    if (node.getType() !== node_1.TwingNodeType.INCLUDE) {
                        throw new syntax_1.TwingErrorSyntax('Only "include" tags are allowed within a "sandbox" section.', node.getTemplateLine(), stream.getSourceContext());
                    }
                }
            });
        }
        return new sandbox_1.TwingNodeSandbox(body, token.line, token.column, this.getTag());
    }
    decideBlockEnd(token) {
        return token.test(twig_lexer_1.TokenType.NAME, 'endsandbox');
    }
    getTag() {
        return 'sandbox';
    }
}
exports.TwingTokenParserSandbox = TwingTokenParserSandbox;
