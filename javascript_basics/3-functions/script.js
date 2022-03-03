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


saludar("gabriel");


