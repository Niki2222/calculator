function add(num1, num2) {
    return num1 + num2
}
function subtract(num1, num2) {
    return num1 - num2
}

function multiply(num1, num2) {
    return num1 * num2
}

function divide(num1, num2) {
    return num1 / num2
}

function operate(op, num1, num2) {
    switch (op) {
        case '+':
            return add(num1, num2)
        case '-':
            return subtract(num1, num2)
        case '*':
            return multiply(num1, num2)
        case '/':
            if (num2 === 0) {
                buttons.forEach(button => button.setAttribute('disabled', 'true'));
                zero.setAttribute('disabled', 'true');
                return 'Infinity';
            } else {
                return divide(num1, num2)
            }
    }
}

const buttons = document.querySelectorAll('.btn');
const clear = document.querySelector('#clear')

clear.addEventListener('click', () => {
    clearDisplay();
})

buttons.forEach((button) => {
    button.addEventListener('click', (e) => {
        populateNumber(e.target.textContent);
    })
})

const display = document.getElementById('displayContent');
let number = '';       
let operator = null;
let memory = [];
function populateNumber(e) {
    if (parseFloat(e) || e === '0') {
        number += e;
        display.textContent = +number;
    }
    if (isNaN(parseFloat(e))) {
        if (number != '' && number !== undefined && number !== null) {
            switch (e) {
                case '.':
                    if (number.includes('.')) {
                        break;
                    } else {
                        number += e
                        display.textContent = number
                    }
                    break;
                case 'Delete':
                    number = number.slice(0, -1);
                    if (number === '') {
                        number = 0;
                    }
                    display.textContent = number;
                    break;
                default:
                    memory.push(number);
            }
        }
        if (memory.length > 2) {
            memory.splice(0, 1);
        }
        switch (e) {
            case '=':
                if (memory.length >= 2 && operator != null) {
                    number = operate(operator, parseFloat(memory[0]), parseFloat(memory[1]));
                    if (typeof number === 'string') {
                        display.textContent = number;
                    } else {
                        display.textContent = +number.toFixed(4);
                    }
                    operator = null;
                    memory = [];
                    memory.push(number);
                    number = '';
                } else if (operator == null) {
                    break;
                } else {
                    number = '';
                }
                break;
            case '.':
                break;
            case 'Delete':
                break;
            default:
                if (memory.length >= 2) {
                    if (operator == null) {
                        operator = e;
                    }
                    number = operate(operator, parseFloat(memory[0]), parseFloat(memory[1]))
                    if (typeof number === 'string') {
                        display.textContent = number;
                    } else {
                        display.textContent = +number.toFixed(4);
                    }
                    memory = [];
                    memory.push(number);
                    number = '';
                } else {
                    number = '';
                }
                operator = e;
        }
    }

}

function clearDisplay() {
    number = '';
    memory = [];
    operator = null;
    display.textContent = '0';
    buttons.forEach(button => button.removeAttribute('disabled'));
    zero.removeAttribute('disabled');
}
