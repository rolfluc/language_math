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
var operand = getOperand();
var firstOp = genNumber();
var secondOp = genNumber();
var res = { str: "", num: 0 };
var negative = "negativ";
var and = "und";
var fail = { num: 0, str: "null" };
var numbers = [{ num: 0, str: "null" }, { num: 1, str: "ein" }, { num: 2, str: "zwei" }, { num: 3, str: "drei" }, { num: 4, str: "vier" }, { num: 5, str: "fünf" }, { num: 6, str: "sechs" }, { num: 7, str: "sieben" }, { num: 8, str: "acht" }, { num: 9, str: "nuen" }, { num: 10, str: "zehn" }, { num: 11, str: "elf" }, { num: 12, str: "zwölf" }, { num: 13, str: "dreizehn" }, { num: 14, str: "vierzehn" }, { num: 15, str: "fünfzehn" }, { num: 16, str: "sechzehn" }, { num: 17, str: "siebzehn" }, { num: 18, str: "achtzehn" }, { num: 19, str: "nuenzehn" }, { num: 20, str: "zwanzig" }, { num: 30, str: "dreißig" }, { num: 40, str: "vierzig" }, { num: 50, str: "fünfzig" }, { num: 60, str: "sechzig" }, { num: 70, str: "siebzig" }, { num: 80, str: "achtzig" }, { num: 90, str: "neunzig" }, { num: 100, str: "hundert" }, { num: 1000, str: "tausend" }];
var hundredspos = 28;
var thousandspos = 29;
function getOperand() {
    var operands = ["•", "+", "-", "/"];
    var index = Math.floor(Math.random() * operands.length);
    return operands[index];
}
function HandleTens(input) {
    var retVal = { str: "", num: input };
    if (input < 20) {
        //Handle directly
        for (var i = 0; i < numbers.length; i++) {
            if (input == numbers[i].num) {
                return numbers[i];
            }
        }
    }
    else if (input < 100) {
        var tens = Math.floor(input / 10) * 10;
        var ones = Math.floor(input % 10);
        for (var i = 0; i < 10; i++) {
            if (numbers[i].num == ones) {
                retVal.str = numbers[i].str;
            }
        }
        for (var i = 19; i < numbers.length; i++) {
            if (numbers[i].num == tens) {
                retVal.str += and + numbers[i].str;
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
    if (input < 1000) {
        var hundreds = Math.floor(input / 100);
        for (var i = 0; i < 10; i++) {
            if (numbers[i].num == hundreds) {
                retVal.str = numbers[i].str + numbers[hundredspos].str + " ";
            }
        }
        var tens = input - hundreds * 100;
        retVal.str += HandleTens(tens).str;
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
        retVal.str = HandleTens(thousands).str + numbers[thousandspos].str + " ";
    }
    else {
        //Error
        return fail;
    }
    var hundreds = input - thousands * 1000;
    retVal.str += HandleHundreds(hundreds).str;
    return retVal;
}
function HandleNumber(input) {
    var isNegative = false;
    var retVal = { str: "", num: input };
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
    if (isNegative) {
        console.log(input);
        retVal.str = negative + " " + retVal.str;
    }
    return retVal;
}
function performMath(num1, num2, operand) {
    var numericResult = 0;
    if (operand == "•") {
        numericResult = num1 * num2;
    }
    else if (operand == "+") {
        numericResult = num1 + num2;
    }
    else if (operand == "-") {
        numericResult = num1 - num2;
    }
    else {
        //Assumes division
        numericResult = Math.floor(num1 / num2);
    }
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
    return Math.floor(Math.random() * multiplier);
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
        genbox.innerHTML = HandleNumber(num1).str + " " + getOperandString(operand) + " " + HandleNumber(num2).str + " sind ?";
    }
}
function checkMath(e) {
    var genbox = document.getElementById("generatedstring");
    var enterbox = document.getElementById("guess");
    if (enterbox != null) {
        if (enterbox.value != res.str) {
            if (genbox != null) {
                genbox.innerHTML += " " + res.str;
            }
        }
        else {
            if (genbox != null) {
                genbox.innerHTML = "Schon gut";
            }
        }
    }
}
exports.checkMath = checkMath;
function generateMath(e) {
    operand = getOperand();
    firstOp = genNumber();
    secondOp = genNumber();
    res = performMath(firstOp, secondOp, operand);
    setText(firstOp, secondOp, operand);
    var enterbox = document.getElementById("guess");
    if (enterbox != null) {
        enterbox.value = "";
    }
}
exports.generateMath = generateMath;
