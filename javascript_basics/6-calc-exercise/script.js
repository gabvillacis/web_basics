console.log('Calculadora')

function sumar() {
    console.log('Ejecutando la suma')

    let num1 = document.getElementById('firstNumber').value;
    let num2 = document.getElementById('secondNumber').value;

    console.log('N1: ', num1)
    console.log('N2: ', num2)

    console.log(typeof(num1))
    console.log(typeof(num2))

    let resultado = parseFloat(num1) + parseFloat(num2);

    console.log('Resultado: ', resultado)

    document.getElementById('result').innerHTML = '<b>' + resultado + '</b>'
}

function restar() {
    console.log('Ejecutando la resta')
}

function multiplicar() {
    console.log('Ejecutando la multiplicación')
}

function dividir() {
    console.log('Ejecutando la división')
}