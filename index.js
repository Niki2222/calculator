function add(a, b) {
    return a + b;
}
function subtract(a, b) {
    return a - b;
}
function amultiply(a, b) {
    return a * b;
}
function divide(a, b) {
    return a / b;
}
function operate() {

}

let display = document.getElementById('display');
let buttons = Array.from(document.getElementsByClassName('button'));
buttons.map( button => {
    button.addEventListener('click', (e) => {
        switch(e.target.innerText) {
            case 'Clear':
                display.innerText = '';
                break;
            case '←':
                display.innerText = display.innerText.slice(0, -1);
                break;
            case '=':
                try {
                    display.innerText = eval(display.innerText);
                } catch {
                    display.innerText = 'Error!'
                }
                break;
            default:
                display.innerText += e.target.innerText;
        }
    })
})