function saludar(nombre) {
    if (nombre) {
        console.log("Hello world, " + capitalizar(nombre));
    }else {
        console.log("Hello world!");
    }
}

const capitalizar = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

const multiplicar = (n1, n2) => {
    let acumulador = 0;
    for (let i = 0; i < n2; i++) {
        acumulador = acumulador + n1;
    }

    return acumulador;
}

saludar("gabriel");

console.log(multiplicar(5, 10));

