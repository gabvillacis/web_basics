/* Función con notación tradicional
   Incluye bloque de control de flujo: if/else
*/
function saludar(nombre) {
    if (nombre) {
        console.log("Hello world, " + capitalizar(nombre));
    }else {
        console.log("Hello world!");
    }
}

/* Función con notación de flecha (arrow function) */
const capitalizar = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

/* Función con notación de flecha (arrow function)
   Incluye bucle for
*/

const multiplicar = (n1, n2) => {
    let acumulador = 0;
    for (let i = 0; i < n2; i++) {
        acumulador = acumulador + n1;
    }

    return acumulador;
}

saludar("gabriel");
saludar("luis");
saludar();

console.log(multiplicar(5, 10));