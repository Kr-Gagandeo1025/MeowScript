var billi = "meomeow";
meow("Hello", billi)
var add = meowaddsmeow(1, 2);
var div = meowdivsmeow(4, 2);
meow("addition is", add, "division is", div)
purrs("meow", 4)
meow(paws(2, 4), scratch(144))
function meow(...args){
    console.log(...args);
}

function meowaddsmeow(x, y){
    return x + y;
}

function meowsubsmeow(x,y){
    return x - y;
}

function meowmultsmeow(x,y){
    return x * y;
}

function meowdivsmeow(x,y){
    return x * y;
}

function purrs(x,y){
    for(i=0; i<y; i++){
        console.log(x);
    }
}

function paws(x,y){
    return Math.pow(x,y);
}

function scratch(x){
    return Math.sqrt(x);
}
