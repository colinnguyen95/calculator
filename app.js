const display = document.querySelector('.display');
const print = document.querySelector('.print');
const numButtons = document.querySelectorAll('.num');
const operateButtons = document.querySelectorAll('.operator');
const mainScreen = document.createElement('div');
const equals = document.querySelector('.equals');
const clear = document.querySelector('.clear');
const deleteBtn = document.querySelector('.delete');
const decimalBtn = document.querySelector('#decimal');
mainScreen.textContent = '';
mainScreen.classList.add('main-screen');
display.appendChild(mainScreen);
print.textContent = '';

let num1;
let num2;
let operator;
let clearForNextNum = false;
let operatorClicked = false;
let operatorClickCount = 0;
let result;
let moveNextNum = false; 
let equalClicked = false;
let deleteClicked = false;

const validkeys=[ "0","1","2","3","4","5","6","7","8","9","." ];
const validOperations = ["+","-","x","%"];
const validEnterKeys = ["=","Enter"];

const add = (num1, num2) => {
    console.log(num1 + num2);
    let answer = ((num1 + num2) * 10) / 10;
    return answer;
}

const subtract = (num1, num2) => {
    console.log(num1 - num2);
    return num1 - num2;
}

const multiply = (num1, num2) => {
    console.log(num1 * num2);
    return num1 * num2;
}

const divide = (num1, num2) => {
    console.log(num1 / num2);
    return num1 / num2;
}

const operate = (operator, num1, num2) => {
    let result;
    switch(operator){
        case 'add':
            result = add(num1,num2);
            break;
        case 'subtract':
            result = subtract(num1,num2);
            break;
        case 'multiply':
            result = multiply(num1,num2);
            break;
        case 'divide':
            result = divide(num1,num2);
            break;
    }
    return result;
}

const operatorFunc = (e) => {
    const action = e.key ? e.key : e.target.textContent;
    print.textContent += action;
    operatorClicked = true;
    operatorClickCount++;
    decimalBtn.disabled = false;
    if(operatorClickCount > 1){
        result = operate(operator, parseInt(num1), parseInt(num2));
        num1 = result;
        mainScreen.textContent = num1;
    }
    console.log('operatorClickCount: ', operatorClickCount)

    switch(action){
        case '+':
            operator = 'add';
            break;
        case '-':
            operator = 'subtract';
            break;
        case 'x':
            operator = 'multiply';
            break;
        case '%':
            operator = 'divide';
            break;
    }
    moveNextNum = true;
    clearForNextNum = true;

    if(equalClicked === true){
        print.textContent = result + action;
        equalClicked = false;
    }
    console.log('operator: ', operator);
    console.log('num1 after operator delete', num1);
}

const numInput = (e) => {
    const input = e.key? e.key : e.target.textContent;
    print.textContent += input;

    if(!moveNextNum){
        mainScreen.textContent += input;
        if(mainScreen.textContent.includes('.')){
            decimalBtn.disabled = true;
        }
        num1 = mainScreen.textContent
    }
    if(clearForNextNum){
        mainScreen.textContent = '';
        clearForNextNum = false;
    }
    if(moveNextNum) {
        mainScreen.textContent += input;
        if(mainScreen.textContent.includes('.')){
            decimalBtn.disabled = true;
        }
        num2 = mainScreen.textContent;
    }
    console.log(input);
    console.log('num1: ', num1);
    console.log('num2: ', num2);
}

const clearFunc = () => {
    mainScreen.textContent = '';
    print.textContent = '';
    equalClicked = false;
    moveNextNum = false;
    operatorClickCount = 0;
    num1 = undefined;
    num2 = undefined;
    result = undefined;
    decimalBtn.disabled = false;
}

const deleteFunc = () => {
    //If operatorClicked === true, delete only operator value from variable
    // delete operator string from print
    // avoid deleting from mainScreen
    // if operator === true, then operator = undefined
    if(operatorClicked && deleteClicked === false){
        deleteClicked = true;
        operatorClickCount--;
        operator = undefined;
        operatorClicked = false;
        
        let printScreenDelete = print.textContent;
        let c = printScreenDelete.slice(0, printScreenDelete.length - 1);
        print.textContent = c;
    } else {
        let mainScreenDelete = mainScreen.textContent;
        let printScreenDelete = print.textContent;
        let b = mainScreenDelete.slice(0, mainScreenDelete.length - 1);
        let c = printScreenDelete.slice(0, printScreenDelete.length - 1);
        mainScreen.textContent = b;
        print.textContent = c;
        operatorClickCount--;
    }
    
    if(!moveNextNum){
        num1 = mainScreen.textContent
    }
    if(moveNextNum) {
        num2 = mainScreen.textContent;
    }
    console.log('num 1 after delete: ', num1)
}

numButtons.forEach(button => {
    button.addEventListener('click', numInput)
})

operateButtons.forEach(button => {
    button.addEventListener('click', operatorFunc);
})

equals.addEventListener('click', (e) => {
    if(equalClicked === true){
        print.textContent = print.textContent;
        mainScreen.textContent = mainScreen.textContent;
        return;
    }

    if(!num1 || !num2){
        clearFunc;
    } else {
        print.textContent += e.target.textContent;
        console.log('num1: ', num1);
        console.log('num2: ', num2);
        console.log('operator: ', operator);
        result = operate(operator, parseFloat(num1), parseFloat(num2));
    
        if(result % 1 === 0){
            mainScreen.textContent = result;
        } else {
            mainScreen.textContent = result.toFixed(10);
        }
        
        num1 = result;
        equalClicked = true;
        moveNextNum = false;
        operatorClickCount = 0;
    }
    console.log('equalClicked: ', equalClicked);
})

clear.addEventListener('click', clearFunc)

deleteBtn.addEventListener('click', deleteFunc)

document.addEventListener('keydown', (e) => {
    let key = e.key;
    
    if(validkeys.indexOf(key) >= 0){
        numInput(e);
    }

    if(validOperations.indexOf(key) >= 0){
        operatorFunc(e);
    }
    if(validEnterKeys.indexOf(key) >= 0){
        equals.click();
    }
    if(key === 'Backspace'){
        deleteBtn.click();
    }
})

// document.addEventListener('keydown', e => {
//     console.log('test e: ', e);
// })

