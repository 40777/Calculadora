const result = document.querySelector('.result')
const buttons = document.querySelectorAll('.buttons button')

let currentNumber = "";
let fistOperand = null;
let operator = null;
let restart = false;


function updateResult(originClear = false) {
    result.innerText = originClear ? 0 : currentNumber.replace('.', ',');
}


function addDigit(digit) {
    if (digit == "," && (currentNumber.includes(",") || !currentNumber))
        return;

    if (restart) {
        currentNumber = digit; 
        restart = false;
    } else {
        currentNumber += digit; 
    }

    updateResult();
}

function setOperator(newOperator) {
    if (currentNumber) {
        calculate();

        fistOperand = parseFloat (currentNumber.replace(",", "."));
        currentNumber = "";
    }
    operator = newOperator;
}

function calculate() {
    if (operator == null || fistOperand == null) return;
    let secondOperand = parseFloat(currentNumber.replace(",", "."));
    let resultValue;

    switch (operator) {
        case "+":
        resultValue = fistOperand + secondOperand;
            break;
        case "-":
        resultValue = fistOperand - secondOperand;
            break;
        case "x":
        resultValue = fistOperand * secondOperand;
            break;
        case "÷":
            resultValue = fistOperand / secondOperand;
            break;
        default:
        return;
    }

    if (resultValue.toString().split(".")[1]?.length > 5) {
        currentNumber = parseFloat(resultValue.toFixed(5)).toString();
    } else {
        currentNumber = resultValue.toString();
    }

operator = null;
fistOperand = null;
restart = true;
updateResult();
}

// function button AC
function clearCalculate() {
    currentNumber = "";
    fistOperand = null;
    operator = null;
    updateResult(true);
}

function setPercentage() {
    let result = parseFloat(currentNumber) / 100;

    if (["+", "-"].includes(operator)) {
        result = result * (fistOperand || 1);
    }
    
    if (result.toString().split(".")[1]?.length > 5) {
        result = result.toFixed(5).toString();
    }

    currentNumber = result.toString();
    updateResult();
}


// numbers concatenation 
buttons.forEach((button) => {
    button.addEventListener("click", () => {
        const buttonText = button.innerText;
        if (/^[0-9,]+$/.test(buttonText)) {
            addDigit(buttonText);
        } else if (["+", "-", "x", "÷"].includes(buttonText)) {
            setOperator(buttonText);
        } else if (buttonText == "=") {
            calculate();
        } else if (buttonText == "AC") {
            clearCalculate();
    } else if (buttonText == "+/-") {
        currentNumber = (
            parseFloat(currentNumber || fistOperand) * -1
        ).toString();
        updateResult();
    } else if (buttonText == "%") {
        setPercentage();
    }
    });
}); 