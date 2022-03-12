const display = document.querySelector('.display');
const print = document.querySelector('.print');
const numButtons = document.querySelectorAll('.num');
const operateButtons = document.querySelectorAll('.operator');
const mainScreen = document.createElement('div');
const equals = document.querySelector('.equals');
const clear = document.querySelector('.clear');
const deleteBtn = document.querySelector('.delete');
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

const clearFunc = () => {
    mainScreen.textContent = '';
    print.textContent = '';
    equalClicked = false;
    moveNextNum = false;
    operatorClickCount = 0;
    num1 = undefined;
    num2 = undefined;
    result = undefined;
}

const deleteFunc = () => {
    let mainScreenDelete = mainScreen.textContent;
    let printScreenDelete = print.textContent;
    let b = mainScreenDelete.slice(0, mainScreenDelete.length - 1);
    let c = printScreenDelete.slice(0, printScreenDelete.length - 1);
    mainScreen.textContent = b;
    print.textContent = c;
    if(!moveNextNum){
        num1 = mainScreen.textContent
    }
    if(moveNextNum) {
        num2 = mainScreen.textContent;
    }
    console.log('num 1 after delete: ', num1)
}

numButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        print.textContent += e.target.textContent;

        if(!moveNextNum){
            mainScreen.textContent += e.target.textContent;
            num1 = mainScreen.textContent
        }
        if(clearForNextNum){
            mainScreen.textContent = '';
            clearForNextNum = false;
        }
        if(moveNextNum) {
            mainScreen.textContent += e.target.textContent;
            num2 = mainScreen.textContent;
        }
        console.log(e.target.textContent);
        console.log('num1: ', num1);
        console.log('num2: ', num2);
    })
})

operateButtons.forEach(button => {
    button.addEventListener('click', e => {
        print.textContent += e.target.textContent;
        operatorClickCount++;
        if(operatorClickCount > 1){
            result = operate(operator, parseInt(num1), parseInt(num2));
            num1 = result;
            mainScreen.textContent = num1;
        }
        console.log('operatorClickCount: ', operatorClickCount)

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
        moveNextNum = true;
        clearForNextNum = true;

        if(equalClicked === true){
            print.textContent = result + e.target.textContent
            equalClicked = false;
        }
    })
})

equals.addEventListener('click', (e) => {
    if(!num1 || !num2){
        clearFunc;
    } else {
        print.textContent += e.target.textContent;
        console.log('num1: ', num1);
        console.log('num2: ', num2);
        console.log('operator: ', operator);
        result = operate(operator, parseInt(num1), parseInt(num2))
    
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
})

clear.addEventListener('click', clearFunc)

deleteBtn.addEventListener('click', deleteFunc)

