const display = document.querySelector('.display');
const print = document.querySelector('.print');
const numButtons = document.querySelectorAll('.num');
const operateButtons = document.querySelectorAll('.operator');
const mainScreen = document.createElement('div');
const equals = document.querySelector('.equals');
const clear = document.querySelector('.clear');
mainScreen.textContent = '';
mainScreen.classList.add('main-screen');
display.appendChild(mainScreen);

let num1;
let num2;
let operator;
let clearForNextNum = false;
let operatorClickCount = 0;
let result;
let moveNextNum = false; 
let equalClicked = false;

print.textContent = '';

const add = (num1, num2) => {
    console.log(num1 + num2);
    return num1 + num2;
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

let resultAdd = operate('add', num1, num2);
// let resultSub = operate('subtract', 10, 5);
// let resultMul = operate('multiply', 10, 5);
// let resultDiv = operate('divide', 10, 5);

numButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        print.textContent += e.target.textContent;
        // mainScreen.textContent += e.target.textContent;

        if(!moveNextNum){
            mainScreen.textContent += e.target.textContent;
            num1 = mainScreen.textContent
        }
        if(clearForNextNum){
            mainScreen.textContent = '';
            clearForNextNum = false;
        }
        if(moveNextNum) {
            // mainScreen.textContent = '';
            mainScreen.textContent += e.target.textContent;
            num2 = mainScreen.textContent;
            // moveNextNum = false;
        }
        // if(!num1 && !num2){num1 = mainScreen.textContent}
        // if(num1 && !num2){num2 = mainScreen.textContent}
        console.log(e.target.textContent);
        console.log('num1: ', num1);
        console.log('num2: ', num2);
    })
})

operateButtons.forEach(button => {
    button.addEventListener('click', e => {
        //logic for when user clicks operator more than once
        //call operate function to calculate num1 and num2 behind scenes
        //store result somewhere to use later
        //use that result + num2;

        print.textContent += e.target.textContent;
        switch(e.target.textContent){
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
        // num1 = mainScreen.textContent;
        moveNextNum = true;
        clearForNextNum = true;

        if(equalClicked === true){
            print.textContent = result + e.target.textContent
            equalClicked = false;
        }
    })
})

equals.addEventListener('click', (e) => {
    // num2 = mainScreen.textContent;
    print.textContent += e.target.textContent;
    console.log('num1: ', num1);
    console.log('num2: ', num2);
    console.log('operator: ', operator);
    result = operate(operator, parseInt(num1), parseInt(num2))
    mainScreen.textContent = result;
    num1 = result;
    equalClicked = true;
    moveNextNum = false;
})

clear.addEventListener('click', () => {
    mainScreen.textContent = '';
    print.textContent = '';
    equalClicked = false;
})