@{%
const mylexer = require("./lexer");
%}

@lexer mylexer

statements
    -> statement
        {%
            (data) => {
                return [data[0]];
            }
        %}
    | statements %NL statement
        {%
            (data) => {
                return [...data[0], data[2]];
            }
        %}

statement
    -> var_assign {% id %}
    | func_call   {% id %}

var_assign
    -> %identifiers _ "=" _ expr
        {%
            (data)=>{
                return {
                    type: "var_assign",
                    var_name: data[0],
                    value: data[4]
                }
            }
        %}

func_call
    -> %identifiers _ "(" _ (arg_list _):? ")"
        {%
            (data) => {
                return{
                     type: "func_call",
                     func_name: data[0],
                     arguments: data[4] ? data[4][0] : []
                }
            }
        %}
arg_list
    -> expr
        {%
            (data) => {
                return [data[0]];
            }
        %}
    | arg_list __ expr
        {%
            (data) => {
                return [...data[0],data[2]];
            }
        %}

expr
    -> %string  {% id %}
    |  %number  {% id %}
    |  %identifiers {% id %}
    |  func_call {% id %}

lambda -> "(" _ (param_list _):? ")" _ "=>" _ lambda_body
    {%
        (data) => {
            return{
                type: "lambda",
                parameters: data[2] ? data[2][0] : [],
                body: data[7]
            }
        }
    %}

param_list
    -> %identifiers (__ %identifiers):*
        {%
            (data) => {
                const repeatedPieces = data[1];
                const restParams = repeatedPieces.map(piece => piece[1]);
                return [data[0], ...restParams];
            }
        %}

lambda_body
    -> expr
        {%
            (data) => {
                return [data[0]];
            }
        %}
    | "{" _ %NL statements %NL _ "}"
        {%
            (data) => {
                return data[3];
            }
        %}

#optional whitesapce
_ -> %WS:*

#mandatory whitespace
__ -> %WS:+