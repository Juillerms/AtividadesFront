document.getElementById('calculate').addEventListener('click', function() {
    const num1 = parseFloat(document.getElementById('num1').value);
    const num2 = parseFloat(document.getElementById('num2').value);
    const operation = document.querySelector('input[name="operation"]:checked');
    const resultDiv = document.getElementById('result');
    let result;

    if (!operation) {
        alert("Por favor, selecione uma operação.");
        return;
    }

    const selectedOperation = operation.value;

    if (selectedOperation === 'factorial') {
        if (!Number.isInteger(num1) || num1 < 0) {
            alert("Para a operação de fatorial, o primeiro número deve ser um inteiro não negativo.");
            return;
        }
        result = factorial(num1);
    } else if (selectedOperation === 'divide' && num2 === 0) {
        alert("A divisão por zero não é permitida.");
        return;
    } else {
        if (isNaN(num1) || isNaN(num2)) {
            alert("Por favor, insira números válidos em ambos os campos.");
            return;
        }
        switch (selectedOperation) {
            case 'sum':
                result = num1 + num2;
                break;
            case 'subtract':
                result = num1 - num2;
                break;
            case 'multiply':
                result = num1 * num2;
                break;
            case 'divide':
                result = num1 / num2;
                break;
        }
    }

    if (result !== undefined) {
        resultDiv.textContent = 'Resultado: ' + result;
    }
});

function factorial(n) {
    if (n === 0 || n === 1) {
        return 1;
    }
    let result = 1;
    for (let i = 2; i <= n; i++) {
        result *= i;
    }
    return result;
}