/*-------------------- VARIABLES --------------------*/
console.log("\n-- Definiendo variables --")
let nombre = "Gabriel";
console.log(nombre);

let edad = 10;
console.log(edad)

/* Reglas para nombres de variables:
    - No puede ser una palabra reservada (if, for, let, var, const) u otra.
    - Debe ser significativo
    - No puede iniciar con un número (1nombre)
    - No puede contener un spacio o guión
    - Son case-sensitive
*/

let primerNombre = "Gabriel", primerApellido = "Villacis";
let primernombre = "Juan";
console.log(primerNombre, primerApellido);
console.log(primernombre);

/*---------------------------------------------------*/

/*-------------------- CONSTANTES --------------------*/
console.log("\n-- Definiendo constantes --")
const PI = 3.1416;
//PI = 4.1416;
console.log(PI);
/*----------------------------------------------------*/

/*-------------------- TIPADO DINÁMICO --------------------*/
console.log("\n-- Tipos de datos primitivos / Tipado dinámico --")
let nombreCompleto = "Gabriel Villacis"; // String
let sueldo = 20000; // Number
let esProfesor = true; // Boolean
let mascota = undefined;
let comidaFavorita = null;

console.log(nombreCompleto, ' -> ', typeof(nombreCompleto));
console.log(sueldo, ' -> ', typeof(sueldo));
console.log(esProfesor, ' -> ', typeof(esProfesor));
console.log(mascota, ' -> ', typeof(mascota));
console.log(comidaFavorita, ' -> ', typeof(comidaFavorita));

/*---------------------------------------------------------*/