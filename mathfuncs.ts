interface Data {
    str: string;
    num: number;
}


let multiply1: string = "mal";
let multiply2: string = "multipliziert"
let multiply: string[] = [multiply1,multiply2]
let subtract1: string = "weniger"
let subtract2: string = "minus"
let subtract: string[] = [subtract1,subtract2]
let add1: string = "und"
let add2: string = "plus"
let add: string[] = [add1,add2]
let divide: string = "geteilt durch";

var operand = getOperand();
var firstOp = genNumber();
var secondOp = genNumber();
let res: Data = {str: "",num:0};

let negative: string = "negativ";
let and: string = "und";
let fail: Data = {num:0, str:"null"};
let numbers: Data[] = [{num:0, str:"null"},{num:1, str:"ein"},{num:2, str:"zwei"},{num:3, str:"drei"},{num:4, str:"vier"},{num:5, str:"fünf"},{num:6, str:"sechs"},{num:7, str:"sieben"},{num:8, str:"acht"},{num:9, str:"nuen"},{num:10, str:"zehn"},{num:11, str:"elf"},{num:12, str:"zwölf"},{num:13, str:"dreizehn"},{num:14, str:"vierzehn"},{num:15, str:"fünfzehn"},{num:16, str:"sechzehn"},{num:17, str:"siebzehn"},{num:18, str:"achtzehn"},{num:19, str:"nuenzehn"},{num:20, str:"zwanzig"},{num:30, str:"dreißig"},{num:40, str:"vierzig"},{num:50, str:"fünfzig"},{num:60, str:"sechzig"},{num:70, str:"siebzig"},{num:80, str:"achtzig"},{num:90, str:"neunzig"},{num:100, str:"hundert"},{num:1000, str:"tausend"}];
let hundredspos: number = 28;
let thousandspos: number = 29;

function getOperand() {
    const operands: string[] = ["•","+","-","/"];
    var index = Math.floor(Math.random() * operands.length);
    return operands[index];
}

function HandleTens(input: number) {
    let retVal: Data = {str: "", num: input}
    if(input < 20) {
        //Handle directly
        for (var i = 0; i < numbers.length; i++)
        {
            if (input == numbers[i].num)
            {
                return numbers[i];
            }   
        }
    } else if (input < 100) { 
        let tens: number = Math.floor(input / 10) * 10
        let ones: number = Math.floor(input % 10)
        for(var i = 0; i < 10; i++)
        {
            if(numbers[i].num == ones) {
                retVal.str = numbers[i].str
            }
        }
        for (var i = 19; i < numbers.length; i++)
        {
            if(numbers[i].num == tens) {
                retVal.str += and + numbers[i].str;
            }
        }
    } else {
        //Error condition
        return fail;
    }
    return retVal;
}

function HandleHundreds(input: number) {
    let retVal: Data = {str: "", num: input}
    if(input < 1000) {
        let hundreds: number = Math.floor(input / 100);
        for(var i = 0; i < 10; i++)
        {
            if(numbers[i].num == hundreds) {
                retVal.str = numbers[i].str + numbers[hundredspos].str + " ";
            }
        }
        let tens: number = input-hundreds*100;
        retVal.str += HandleTens(tens).str;
    } else {
        //Error condition
        return fail;
    }
    return retVal;
}

function HandleThousands(input: number) {
    let retVal: Data = {str: "", num: input}
    let thousands: number = Math.floor(input / 1000);
    if (input < 100000) {
        retVal.str = HandleTens(thousands).str + numbers[thousandspos].str + " ";
    } else {
        //Error
        return fail;
    }
    let hundreds: number = input-thousands*1000;
    retVal.str += HandleHundreds(hundreds).str;
    return retVal;
}


function HandleNumber(input: number) {
    let isNegative: boolean = false;
    let retVal: Data = {str: "", num: input}
    if (input < 0) {
        isNegative = true;
        input = Math.abs(input)
    }
        
    if(input < 100) {
        retVal = HandleTens(input);
    } else if (input < 1000) {
        retVal = HandleHundreds(input)
    } else {
        retVal = HandleThousands(input)
    }
    if (isNegative) {
        console.log(input)
        retVal.str = negative + " " + retVal.str;
    }
    return retVal
}

function performMath(num1:number,num2:number,operand:string) {
    let numericResult: number = 0;
    if (operand == "•") {
        numericResult = num1 * num2;
    } else if (operand == "+") {
        numericResult = num1 + num2;
    } else if (operand == "-") {
        numericResult = num1 - num2;
    } else {
        //Assumes division
        numericResult = Math.floor(num1 / num2);
    }
    return HandleNumber(numericResult);
}

function genNumber() {
    const checkbox_easy = document.getElementById('easy') as HTMLInputElement | null;
    const checkbox_medium = document.getElementById('med') as HTMLInputElement | null;
    const checkbox_hard = document.getElementById('hard') as HTMLInputElement | null;

    let multiplier: number = 0;
    if (checkbox_easy?.checked) {
        multiplier = 15;
    } else if (checkbox_medium?.checked) {
        multiplier = 50;
    } else {
        multiplier = 200;
    }
    return Math.floor(Math.random() * multiplier);
}

function getOperandString(operand: String) {
    let rnd:number = Math.random() > 0.49 ? 1 : 0;
    if (operand == "•") {
        return multiply[rnd];
    } else if (operand == "+") {
        return add[rnd];
    } else if (operand == "-") {
        return subtract[rnd];
    } else {
        //Assumes division
        return divide;
    }
}

function setText(num1:number,num2:number,operand:string) {
    let genbox = document.getElementById("generatedstring") as HTMLElement | null;
    if( genbox != null) {
        genbox.innerHTML = HandleNumber(num1).str + " " + getOperandString(operand) + " " + HandleNumber(num2).str + " sind ?";
    }
}

export function checkMath(e:Event) {
    let genbox = document.getElementById("generatedstring") as HTMLElement | null;
    let enterbox = document.getElementById("guess") as HTMLInputElement | null;
    if (enterbox != null) {
        if (enterbox.value != res.str) {
            if(genbox != null) {
                genbox.innerHTML += " " + res.str;
            }
        } else {
            if(genbox != null) {
                genbox.innerHTML = "Schon gut";
            }
        }
    }
}

export function generateMath(e:Event) {
    operand = getOperand();
    firstOp = genNumber();
    secondOp = genNumber();
    res = performMath(firstOp,secondOp,operand);
    setText(firstOp,secondOp,operand);
    let enterbox = document.getElementById("guess") as HTMLInputElement | null;
    if (enterbox != null) {
        enterbox.value = "";
    }
}