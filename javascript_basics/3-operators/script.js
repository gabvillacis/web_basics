/* --------------- OPERADORES ARITMETICOS --------------- */
console.log("\n-- Implementando operadores aritméticos --")

let x = 10;
let y = 3;

console.log(x + y); // suma
console.log(x - y); // resta
console.log(x * y); // multiplicación
console.log(x / y); // división
console.log(x % y); // residuo
console.log(x ** y); // potencia


// Incremento (++)
console.log(++x)

// Decremento (--)
console.log(--x)

/* ------------------------------------------------------ */

/* --------------- OPERADORES DE COMPARACIÓN --------------- */
console.log("\n-- Implementando operadores de comparación --")

let z = 1;

// Operadores relacionales
console.log(z > 0);
console.log(z >= 0);
console.log(z < 0);
console.log(z <= 0);

// Operadores de igualdad (nivel estricto)
console.log(z === 1);
console.log(z !== 1);

/* --------------------------------------------------------- */

/* --------------- OPERADORES LÓGICOS --------------- */
console.log("\n-- Implementando operadores lógicos --")

let tieneIngresosAltos = false;
let tieneHistorialCrediticio = true;

// Operador AND (&&)
let aprobacionDeCredito = tieneIngresosAltos && tieneHistorialCrediticio;
console.log(aprobacionDeCredito);

// Operador OR (||)
aprobacionDeCredito = tieneIngresosAltos || tieneHistorialCrediticio;
console.log(aprobacionDeCredito);

// Operador NOT (!)
console.log(!aprobacionDeCredito);
/* --------------------------------------------------------- */