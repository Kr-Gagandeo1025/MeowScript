// Generated automatically by nearley, version 2.20.1
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }

const mylexer = require("./lexer");
var grammar = {
    Lexer: mylexer,
    ParserRules: [
    {"name": "statements", "symbols": ["statement"], "postprocess": 
        (data) => {
            return [data[0]];
        }
                },
    {"name": "statements", "symbols": ["statements", (mylexer.has("NL") ? {type: "NL"} : NL), "statement"], "postprocess": 
        (data) => {
            return [...data[0], data[2]];
        }
                },
    {"name": "statement", "symbols": ["var_assign"], "postprocess": id},
    {"name": "statement", "symbols": ["func_call"], "postprocess": id},
    {"name": "var_assign", "symbols": [(mylexer.has("identifiers") ? {type: "identifiers"} : identifiers), "_", {"literal":"="}, "_", "expr"], "postprocess": 
        (data)=>{
            return {
                type: "var_assign",
                var_name: data[0],
                value: data[4]
            }
        }
                },
    {"name": "func_call$ebnf$1$subexpression$1", "symbols": ["arg_list", "_"]},
    {"name": "func_call$ebnf$1", "symbols": ["func_call$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "func_call$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "func_call", "symbols": [(mylexer.has("identifiers") ? {type: "identifiers"} : identifiers), "_", {"literal":"("}, "_", "func_call$ebnf$1", {"literal":")"}], "postprocess": 
        (data) => {
            return{
                 type: "func_call",
                 func_name: data[0],
                 arguments: data[4] ? data[4][0] : []
            }
        }
                },
    {"name": "arg_list", "symbols": ["expr"], "postprocess": 
        (data) => {
            return [data[0]];
        }
                },
    {"name": "arg_list", "symbols": ["arg_list", "__", "expr"], "postprocess": 
        (data) => {
            return [...data[0],data[2]];
        }
                },
    {"name": "expr", "symbols": [(mylexer.has("string") ? {type: "string"} : string)], "postprocess": id},
    {"name": "expr", "symbols": [(mylexer.has("number") ? {type: "number"} : number)], "postprocess": id},
    {"name": "expr", "symbols": [(mylexer.has("identifiers") ? {type: "identifiers"} : identifiers)], "postprocess": id},
    {"name": "expr", "symbols": ["func_call"], "postprocess": id},
    {"name": "lambda$ebnf$1$subexpression$1", "symbols": ["param_list", "_"]},
    {"name": "lambda$ebnf$1", "symbols": ["lambda$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "lambda$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "lambda", "symbols": [{"literal":"("}, "_", "lambda$ebnf$1", {"literal":")"}, "_", {"literal":"=>"}, "_", "lambda_body"], "postprocess": 
        (data) => {
            return{
                type: "lambda",
                parameters: data[2] ? data[2][0] : [],
                body: data[7]
            }
        }
            },
    {"name": "param_list$ebnf$1", "symbols": []},
    {"name": "param_list$ebnf$1$subexpression$1", "symbols": ["__", (mylexer.has("identifiers") ? {type: "identifiers"} : identifiers)]},
    {"name": "param_list$ebnf$1", "symbols": ["param_list$ebnf$1", "param_list$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "param_list", "symbols": [(mylexer.has("identifiers") ? {type: "identifiers"} : identifiers), "param_list$ebnf$1"], "postprocess": 
        (data) => {
            const repeatedPieces = data[1];
            const restParams = repeatedPieces.map(piece => piece[1]);
            return [data[0], ...restParams];
        }
                },
    {"name": "lambda_body", "symbols": ["expr"], "postprocess": 
        (data) => {
            return [data[0]];
        }
                },
    {"name": "lambda_body", "symbols": [{"literal":"{"}, "_", (mylexer.has("NL") ? {type: "NL"} : NL), "statements", (mylexer.has("NL") ? {type: "NL"} : NL), "_", {"literal":"}"}], "postprocess": 
        (data) => {
            return data[3];
        }
                },
    {"name": "_$ebnf$1", "symbols": []},
    {"name": "_$ebnf$1", "symbols": ["_$ebnf$1", (mylexer.has("WS") ? {type: "WS"} : WS)], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "_", "symbols": ["_$ebnf$1"]},
    {"name": "__$ebnf$1", "symbols": [(mylexer.has("WS") ? {type: "WS"} : WS)]},
    {"name": "__$ebnf$1", "symbols": ["__$ebnf$1", (mylexer.has("WS") ? {type: "WS"} : WS)], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "__", "symbols": ["__$ebnf$1"]}
]
  , ParserStart: "statements"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
