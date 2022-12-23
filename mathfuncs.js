"use strict";
exports.__esModule = true;
exports.generateMath = exports.checkMath = void 0;
var multiply1 = "mal";
var multiply2 = "multipliziert";
var multiply = [multiply1, multiply2];
var subtract1 = "weniger";
var subtract2 = "minus";
var subtract = [subtract1, subtract2];
var add1 = "und";
var add2 = "plus";
var add = [add1, add2];
var divide = "geteilt durch";
var res = { str: "", num: 0 };
var negative = "negativ";
var and = "und";
var fail = { num: 0, str: "bad" };
var strings = ["null", "ein", "zwei", "drei", "vier", "fünf", "sechs", "sieben", "acht", "nuen", "zehn", "elf", "zwölf", "dreizehn", "vierzehn", "fünfzehn", "sechzehn", "siebzehn", "achtzehn", "nuenzehn", "zwanzig", "dreißig", "vierzig", "fünfzig", "sechzig", "siebzig", "achtzig", "neunzig", "hundert", "tausend"];
var numerals = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 30, 40, 50, 60, 70, 80, 90, 100, 1000];
var hundredspos = 28;
var thousandspos = 29;
var nos = ["Überhaupt nicht", "Auf gar keinen Fall", "Absolut nicht", "Nein", "Nö"];
var operands = ["•", "+", "-", "/"];
var difficulties = ["Einfach", "Mittel", "Schwer"];
function getOperand() {
    var index = Math.floor(Math.random() * operands.length);
    return operands[index];
}
function getNo() {
    var index = Math.floor(Math.random() * nos.length);
    return nos[index];
}
function populateDifficulties() {
    var easylabel = document.getElementById("easylabel");
    var medlabel = document.getElementById("medlabel");
    var hardlabel = document.getElementById("hardlabel");
    if (easylabel != null) {
        easylabel.textContent = difficulties[0];
    }
    if (medlabel != null) {
        medlabel.textContent = difficulties[1];
    }
    if (hardlabel != null) {
        hardlabel.textContent = difficulties[2];
    }
}
document.body.onload = function (event) {
    //if(document.readyState === "complete") {
    populateDifficulties();
    //}
};
function HandleTens(input) {
    var retVal = { str: "", num: input };
    var i = 0;
    if (input < 20) {
        //Handle directly
        for (i = 0; i < 20; i++) {
            if (input == numerals[i]) {
                var retDat = { str: strings[i], num: numerals[i] };
                //return numbers[i];
                return retDat;
            }
        }
    }
    else if (input < 100) {
        var tens = Math.floor(input / 10) * 10;
        var ones = Math.floor(input % 10);
        for (i = 0; i < 10; i++) {
            if (numerals[i] == ones && ones != 0) {
                retVal.str = strings[i];
            }
        }
        for (i = 19; i < numerals.length; i++) {
            if (numerals[i] == tens) {
                if (ones == 0) {
                    retVal.str += strings[i];
                }
                else {
                    retVal.str += and + strings[i];
                }
            }
        }
    }
    else {
        //Error condition
        return fail;
    }
    return retVal;
}
function HandleHundreds(input) {
    var retVal = { str: "", num: input };
    var i = 0;
    if (input < 1000) {
        var hundreds = Math.floor(input / 100);
        for (i = 0; i < 10; i++) {
            if (numerals[i] == hundreds) {
                retVal.str = strings[i] + strings[hundredspos] + " ";
            }
        }
        var tens = input - hundreds * 100;
        if (tens != 0) {
            retVal.str += HandleTens(tens).str;
        }
    }
    else {
        //Error condition
        return fail;
    }
    return retVal;
}
function HandleThousands(input) {
    var retVal = { str: "", num: input };
    var thousands = Math.floor(input / 1000);
    if (input < 100000) {
        retVal.str = HandleTens(thousands).str + strings[thousandspos] + " ";
    }
    else {
        //Error
        return fail;
    }
    var hundreds = input - thousands * 1000;
    if (hundreds != 0) {
        retVal.str += HandleHundreds(hundreds).str;
    }
    return retVal;
}
function HandleNumber(input) {
    var isNegative = false;
    var retVal = { str: "invalid", num: input };
    if (input < 0) {
        isNegative = true;
        input = Math.abs(input);
    }
    if (input < 100) {
        retVal = HandleTens(input);
    }
    else if (input < 1000) {
        retVal = HandleHundreds(input);
    }
    else {
        retVal = HandleThousands(input);
    }
    if (isNegative == true) {
        retVal.str = negative + " " + retVal.str;
    }
    return retVal;
}
function performMath(num1, num2, operand) {
    var numericResult = 0;
    if (operand == "•") {
        numericResult = num1 * num2;
        console.log(num1 + "•" + num2);
    }
    else if (operand == "+") {
        numericResult = num1 + num2;
        console.log(num1 + "+" + num2);
    }
    else if (operand == "-") {
        numericResult = num1 - num2;
        console.log(num1 + "-" + num2);
    }
    else {
        //Assumes division
        if (num2 == 0) {
            numericResult = 0;
        }
        else {
            numericResult = Math.floor(num1 / num2);
            console.log(num1 + "/" + num2);
        }
    }
    console.log("Handling:" + numericResult);
    return HandleNumber(numericResult);
}
function genNumber() {
    var checkbox_easy = document.getElementById('easy');
    var checkbox_medium = document.getElementById('med');
    var checkbox_hard = document.getElementById('hard');
    var multiplier = 0;
    if (checkbox_easy === null || checkbox_easy === void 0 ? void 0 : checkbox_easy.checked) {
        multiplier = 15;
    }
    else if (checkbox_medium === null || checkbox_medium === void 0 ? void 0 : checkbox_medium.checked) {
        multiplier = 50;
    }
    else {
        multiplier = 200;
    }
    return Math.abs(Math.floor(Math.random() * multiplier));
}
function getOperandString(operand) {
    var rnd = Math.random() > 0.49 ? 1 : 0;
    if (operand == "•") {
        return multiply[rnd];
    }
    else if (operand == "+") {
        return add[rnd];
    }
    else if (operand == "-") {
        return subtract[rnd];
    }
    else {
        //Assumes division
        return divide;
    }
}
function setText(num1, num2, operand) {
    var genbox = document.getElementById("generatedstring");
    if (genbox != null) {
        genbox.style.animation = 'none';
        genbox.offsetHeight;
        //genbox.style.animation = "fadeInOpacity"; 
        genbox.innerHTML = HandleNumber(num1).str + " " + getOperandString(operand) + " " + HandleNumber(num2).str + " sind ?";
    }
}
function checkMath(e) {
    var genbox = document.getElementById("generatedstring");
    var enterbox = document.getElementById("guess");
    if (enterbox != null) {
        if (enterbox.value != res.str) {
            if (genbox != null) {
                genbox.innerHTML = getNo();
                //genbox.innerHTML += " " + res.str;
            }
        }
        else {
            if (genbox != null) {
                genbox.innerHTML = "Stimmt";
            }
        }
    }
}
exports.checkMath = checkMath;
function generateMath(e) {
    var operand = getOperand();
    var firstOp = genNumber();
    var secondOp = genNumber();
    res.str = "";
    res.num = 0;
    setText(firstOp, secondOp, operand);
    res = performMath(firstOp, secondOp, operand);
    var enterbox = document.getElementById("guess");
    if (enterbox != null) {
        enterbox.value = "";
    }
}
exports.generateMath = generateMath;
