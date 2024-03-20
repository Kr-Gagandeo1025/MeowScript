const fs = require("mz/fs");
const util = require('util');
const exec = util.promisify(require('node:child_process').exec);

async function main(){
    const filename = process.argv[2];
    if(!filename){
        console.log("Please provide a .cat file");
        return;
    }
    const astFilename = filename.replace(".cat",".ast");
    const jsFilename = filename.replace(".cat",".js");
    await CheckExec(`node parse.js ${filename}`);
    await CheckExec(`node generate.js ${astFilename}`);
    await CheckExec(`node ${jsFilename}`);
}

async function CheckExec(command){
    const output = await exec(command);
    if(output.stdout){
        process.stdout.write(output.stdout);
    }
    if(output.stderr){
        process.stdout.write(output.stderr);
    }
}

main().catch(err=> console.log(err.stack));