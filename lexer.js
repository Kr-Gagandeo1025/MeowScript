const moo = require('moo');
const fs = require("mz/fs");

let lexer = moo.compile({
    WS : /[ \t]+/,
    comment: /\^\^.*?$/,
    number: /0|[1-9][0-9]*/,
    string: /"(?:\\["\\]|[^\n"\\])*"/,
    lparan: '(',
    rparan: ')',
    lbrace: '{',
    rbrace: '}',
    // keywords: ['play', 'hunt', 'purr', 'hisses', 'meow'],
    identifiers: /[a-zA-Z][a-zA-Z_0-9]*/,
    fatarrow: '=>',
    assign: '=',
    NL: {match: /\n/, lineBreaks:true},
});

module.exports = lexer;

async function main() {
    const code = (await fs.readFile("example.cat")).toString();
    lexer.reset(code);
    while (true) {
        const token = lexer.next();
        if(!token){
            break;
        }
        console.log(token);
    }
}
