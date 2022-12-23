interface Data {
    str: string;
    num: number;
}

const multiply1: string = "mal";
const multiply2: string = "multipliziert"
const multiply: string[] = [multiply1,multiply2]
const subtract1: string = "weniger"
const subtract2: string = "minus"
const subtract: string[] = [subtract1,subtract2]
const add1: string = "und"
const add2: string = "plus"
const add: string[] = [add1,add2]
const divide: string = "geteilt durch";
var res: Data = {str: "",num:0};
const negative: string = "negativ";
const and: string = "und";
const fail: Data = {num:0, str:"bad"};
const strings: string[] = ["null","ein","zwei","drei","vier","fünf","sechs","sieben","acht","nuen","zehn","elf","zwölf","dreizehn","vierzehn","fünfzehn","sechzehn","siebzehn","achtzehn","nuenzehn","zwanzig","dreißig","vierzig","fünfzig","sechzig","siebzig","achtzig","neunzig","hundert","tausend"]
const numerals: number[] = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,30,40,50,60,70,80,90,100,1000];
const hundredspos: number = 28;
const thousandspos: number = 29;

function getOperand() {
    const operands: string[] = ["•","+","-","/"];
    var index = Math.floor(Math.random() * operands.length);
    return operands[index];
}

function HandleTens(input: number) {
    console.log("Tens:" + input)
    var retVal: Data = {str: "", num: input}
    var i:number = 0;
    if(input < 20) {
        //Handle directly
        for (i = 0; i < 20; i++)
        {
            console.log(input + "<-input numbers.num->" + numerals[i] + "i:" + i);
            if (input == numerals[i])
            {
                console.log("numbers " + i + " str: " + strings[i] );
                var retDat:Data = {str: strings[i], num: numerals[i]};
                //return numbers[i];
                return retDat;
            }   
        }
    } else if (input < 100) { 
        var tens: number = Math.floor(input / 10) * 10
        var ones: number = Math.floor(input % 10)
        for(i = 0; i < 10; i++)
        {
            if(numerals[i] == ones && ones != 0) {
                retVal.str = strings[i]
            }
        }
        for (i = 19; i < numerals.length; i++)
        {
            if(numerals[i] == tens) {
                if (ones == 0) {
                    retVal.str += strings[i];
                } else {
                    retVal.str += and + strings[i];
                }
            }
        }
    } else {
        //Error condition
        return fail;
    }
    return retVal;
}

function HandleHundreds(input: number) {
    var retVal: Data = {str: "", num: input}
    var i:number = 0;
    if(input < 1000) {
        var hundreds: number = Math.floor(input / 100);
        for(i = 0; i < 10; i++)
        {
            if(numerals[i] == hundreds) {
                retVal.str = strings[i] + strings[hundredspos] + " ";
            }
        }
        var tens: number = input-hundreds*100;
        if(tens != 0) {
            retVal.str += HandleTens(tens).str;
        }
    } else {
        //Error condition
        return fail;
    }
    return retVal;
}

function HandleThousands(input: number) {
    var retVal: Data = {str: "", num: input}
    var thousands: number = Math.floor(input / 1000);
    if (input < 100000) {
        retVal.str = HandleTens(thousands).str + strings[thousandspos] + " ";
    } else {
        //Error
        return fail;
    }
    var hundreds: number = input-thousands*1000;
    if (hundreds != 0) {
        retVal.str += HandleHundreds(hundreds).str;
    }
    return retVal;
}


function HandleNumber(input: number) {
    var isNegative: boolean = false;
    var retVal: Data = {str: "invalid", num: input};
    if (input < 0) {
        isNegative = true;
        input = Math.abs(input);
    }
        
    if(input < 100) {
        retVal = HandleTens(input);
    } else if (input < 1000) {
        retVal = HandleHundreds(input);
    } else {
        retVal = HandleThousands(input);
    }
    if (isNegative == true) {
        retVal.str = negative + " " + retVal.str;
    }
    console.log("number:" + input + " txt:" + retVal.str);
    return retVal;
}

function performMath(num1:number,num2:number,operand:string) {
    var numericResult: number = 0;
    if (operand == "•") {
        numericResult = num1 * num2;
        console.log(num1 + "•" + num2)
    } else if (operand == "+") {
        numericResult = num1 + num2;
        console.log(num1 + "+" + num2)
    } else if (operand == "-") {
        numericResult = num1 - num2;
        console.log(num1 + "-" + num2)
    } else {
        //Assumes division
        if(num2 == 0) {
            numericResult = 0;
        } else {
            numericResult = Math.floor(num1 / num2);
            console.log(num1 + "/" + num2)
        }
    }
    console.log("Handling:" + numericResult);
    return HandleNumber(numericResult);
}

function genNumber() {
    var checkbox_easy = document.getElementById('easy') as HTMLInputElement | null;
    var checkbox_medium = document.getElementById('med') as HTMLInputElement | null;
    var checkbox_hard = document.getElementById('hard') as HTMLInputElement | null;

    var multiplier: number = 0;
    if (checkbox_easy?.checked) {
        multiplier = 15;
    } else if (checkbox_medium?.checked) {
        multiplier = 50;
    } else {
        multiplier = 200;
    }
    return Math.abs(Math.floor(Math.random() * multiplier));
}

function getOperandString(operand: String) {
    var rnd:number = Math.random() > 0.49 ? 1 : 0;
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
    var genbox = document.getElementById("generatedstring") as HTMLElement | null;
    if( genbox != null) {
        genbox.style.animation = 'none';
        genbox.offsetHeight;
        //genbox.style.animation = "fadeInOpacity"; 
        genbox.innerHTML = HandleNumber(num1).str + " " + getOperandString(operand) + " " + HandleNumber(num2).str + " sind ?";
    }
}

export function checkMath(e:Event) {
    var genbox = document.getElementById("generatedstring") as HTMLElement | null;
    var enterbox = document.getElementById("guess") as HTMLInputElement | null;
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
    var operand = getOperand();
    var firstOp = genNumber();
    var secondOp = genNumber();
    res.str = "";
    res.num = 0;
    setText(firstOp,secondOp,operand);
    res = performMath(firstOp,secondOp,operand);
    var enterbox = document.getElementById("guess") as HTMLInputElement | null;
    if (enterbox != null) {
        enterbox.value = "";
    }
}