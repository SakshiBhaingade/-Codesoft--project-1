const resultDisplay = document.getElementById('result');
const buttons = document.querySelectorAll('.button');
let input = ''; // Store user input

buttons.forEach((button) => {
    button.addEventListener('click', () => {
        const buttonValue = button.textContent;

        if (buttonValue === 'AC') {
            input = '';
            resultDisplay.value = '0';
        } else if (buttonValue === 'DEL') {
            input = input.slice(0, -1);
            resultDisplay.value = input || '0';
        } else if (buttonValue === '=') {
            // Calculate result
            try {
                if (input.includes('/0')) {
                    throw new Error('Division by zero'); // Handle division by zero
                }
                const result = eval(input);
                input = result.toString();
                resultDisplay.value = input;
            } catch (error) {
                resultDisplay.value = 'Error';
                input = '';
            }
        } else {
            const lastChar = input.slice(-1);

            // Prevent invalid starting operators
            if (input === '' && ['+', '*', '/'].includes(buttonValue)) {
                return;
            }

            // Prevent consecutive operators
            if (
                ['+', '-', '*', '/'].includes(buttonValue) &&
                ['+', '-', '*', '/'].includes(lastChar)
            ) {
                return;
            }

            // Prevent consecutive decimals
            if (buttonValue === '.' && lastChar === '.') {
                return;
            }

            input += buttonValue;
            resultDisplay.value = input;
        }
    });
});
