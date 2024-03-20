const fs = require("mz/fs");

async function main(){
    const filename = process.argv[2];
    if(!filename){
        console.log("Please provide a .ast file.");
        return;
    }

    const astJSON = (await fs.readFile(filename)).toString();
    const runtimeJs = (await fs.readFile("runtime.js")).toString();
    const statements = JSON.parse(astJSON);
    const jsCode = generateJsforStatements(statements)+ "\n" +runtimeJs;
    const outputFilename = filename.replace(".ast",".js");
    await fs.writeFile(outputFilename,jsCode);
    console.log(`wrote ${outputFilename}.`)
}

function generateJsforStatements(statements){
    const lines = [];
    for(let statement of statements){
        const line = generateJsforStatementOrExpr(statement);
        lines.push(line);
    }
    return lines.join("\n");
}

function generateJsforStatementOrExpr(astNode){
    if (astNode.type === "var_assign"){
        const varName = astNode.var_name.value;
        const jsExpr = generateJsforStatementOrExpr(astNode.value);
        const js = `var ${varName} = ${jsExpr};`;
        return js;
    } else if(astNode.type === "func_call"){
        const funcName = astNode.func_name.value;
        const argList = astNode.arguments.map((arg)=>{
            return generateJsforStatementOrExpr(arg);
        }).join(", ");
        return `${funcName}(${argList})`;
    } else if(astNode.type === "string"){
        return astNode.value;
    }else if(astNode.type === "number"){
        return astNode.value;
    }else if(astNode.type === "identifiers"){
        return astNode.value;
    }
    else {
        throw new Error(`Unhandled AST node type ${astNode.type}`);
    }
}

main().catch(err => console.log(err.stack));