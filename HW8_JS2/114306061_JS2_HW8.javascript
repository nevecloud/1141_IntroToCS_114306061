document.addEventListener("DOMContentLoaded", function() {
    const num1Input = document.getElementById("number1");
    const num2Input = document.getElementById("number2");
    const operatorSelect = document.getElementById("operator");
    const calculateBtn = document.getElementById("calculateBtn");
    const resultDisplay = document.getElementById("resultDisplay");

    function add(a, b) {
        return a + b;
    }

    function subtract(a, b) {
        return a - b;
    }

    function multiply(a, b) {
        return a * b;
    }

    function divide(a, b) {
        if (b === 0) {
            return "Error: Division by zero";
        }
        return a / b;
    }

    function calculate() {
        const num1 = parseFloat(num1Input.value);
        const num2 = parseFloat(num2Input.value);
        const operator = operatorSelect.value;
        let result;

        if (isNaN(num1) || isNaN(num2)) {
            resultDisplay.textContent = "Result = Invalid Input";
            return;
        }

        switch (operator) {
            case "+":
                result = add(num1, num2);
                break;
            case "-":
                result = subtract(num1, num2);
                break;
            case "*":
                result = multiply(num1, num2);
                break;
            case "/":
                result = divide(num1, num2);
                break;
            default:
                result = "Error: Invalid operator";
        }

        if (typeof result === "string") {
            resultDisplay.textContent = `Result = ${result}`;
        } else {
            resultDisplay.textContent = `Result = ${result.toFixed(2)}`;
        }
        
        // Update button text to reflect the current operator
        calculateBtn.textContent = operator === "+" ? "Add" : 
                                   operator === "-" ? "Subtract" :
                                   operator === "*" ? "Multiply" :
                                   operator === "/" ? "Divide" : "Calculate";
    }

    calculateBtn.addEventListener("click", calculate);
    operatorSelect.addEventListener("change", calculate);
    num1Input.addEventListener("input", calculate);
    num2Input.addEventListener("input", calculate);

    calculate(); 
});