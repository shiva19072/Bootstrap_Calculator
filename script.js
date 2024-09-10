let expressionDisplay = document.getElementById('expression');
let resultDisplay = document.getElementById('result');
let historyDisplay = document.getElementById('history');
let currentExpression = '';
let isFuncOpen = ''; // To track if a function is open (log, sqrt, sin, etc.)

// Clear the display
function clearDisplay() {
    currentExpression = '';
    expressionDisplay.innerText = '0';
    resultDisplay.innerText = '0';
    isFuncOpen = ''; // Reset function state
}

// Delete one character
function deleteOne() {
    currentExpression = currentExpression.slice(0, -1);
    expressionDisplay.innerText = currentExpression || '0';
}

// Append value to the expression
function appendToDisplay(value) {
    currentExpression += value;
    expressionDisplay.innerText = currentExpression;
}

// Logarithm function with auto-enclosed parentheses
function log() {
    if (!isFuncOpen) {
        currentExpression += 'log(';
        expressionDisplay.innerText = currentExpression;
        isFuncOpen = 'log';
    }
}

// Square function: shows (input)^2 and calculates correctly
function square() {
    if (!isFuncOpen) {
        currentExpression = `(${currentExpression})**2`;
        expressionDisplay.innerText = currentExpression;
        isFuncOpen = ''; // Square doesn't need an open state after appending
    }
}

// Square root function with auto-enclosed parentheses
function squareRoot() {
    if (!isFuncOpen) {
        currentExpression += 'sqrt(';
        expressionDisplay.innerText = currentExpression;
        isFuncOpen = 'sqrt';
    }
}

// Sine function with auto-enclosed parentheses
function calculateTrig(func) {
    if (!isFuncOpen) {
        currentExpression += `${func}(`;
        expressionDisplay.innerText = currentExpression;
        isFuncOpen = func; // Store which function is currently open (sin, cos, tan)
    }
}

// Calculate the result
function calculate() {
    try {
        // Ensure any open functions are closed manually by the user
        let result = eval(replaceMathFunctions(currentExpression));
        expressionDisplay.innerText = currentExpression + ' =';
        resultDisplay.innerText = result;

        // Save to history
        addToHistory(currentExpression, result);

        currentExpression = result.toString(); // Store result for continued calculation
    } catch {
        resultDisplay.innerText = 'Error';
    }
}

// Replace JavaScript functions with their user-friendly equivalents
function replaceMathFunctions(expression) {
    return expression
        .replace(/log/g, 'Math.log10')
        .replace(/sqrt/g, 'Math.sqrt')
        .replace(/sin/g, 'Math.sin')
        .replace(/cos/g, 'Math.cos')
        .replace(/tan/g, 'Math.tan')
        // Replace square with **2
        .replace(/square\((.*?)\)/g, '($1)**2');
}

// Store the expression and result in history
function addToHistory(expression, result) {
    let historyItem = document.createElement('div');
    historyItem.classList.add('history-item');
    historyItem.innerHTML = `<div class="records" style="border: 1px solid black; padding: 10px; margin-bottom: 10px; border-radius: 5px;align-items:center;display:flex;justify-content:space-between;">
        ${expression} = ${result} 
        <div class="btn btn-danger" onclick="deleteHistoryItem(this)">
            <i class="bi bi-trash-fill"></i>
        </div>
    </div>`;
    historyDisplay.prepend(historyItem);
}

// Delete a specific history item
function deleteHistoryItem(button) {
    button.parentElement.remove();
}

// Clear all history
function clearHistory() {
    let historyItems = document.querySelectorAll('.history-item');
    historyItems.forEach(item => item.remove());
}

// +/- sign
function toggleSign() {
    currentExpression = (eval(currentExpression) * -1).toString();
    expressionDisplay.innerText = currentExpression;
}
