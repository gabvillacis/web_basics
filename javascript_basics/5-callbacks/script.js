// Esta función simula una solicitud a un servidor para obtener datos.
function obtenerDatosDelServidor(callback) {
  console.log("Solicitando datos del servidor...");
  
  // Utilizamos setTimeout para simular el tiempo que tarda en llegar la respuesta del servidor.
  setTimeout(() => {
    // Simulamos los datos que llegarían desde el servidor
    const datos = { nombre: "Producto A", precio: 100 };
    
    // Llamamos a la función callback con los datos que obtuvimos después del retraso
    callback(datos);  
  }, 2000);  // Esperamos 2 segundos para simular la solicitud al servidor
}

// Esta función muestra los datos que obtenemos, simulando que ya se ha completado la solicitud.
function mostrarDatos(datos) {
  console.log(`Producto: ${datos.nombre}, Precio: ${datos.precio}`);
}

// Ahora llamamos a obtenerDatosDelServidor y le pasamos mostrarDatos como callback.
// Cuando obtenerDatosDelServidor termine de "obtener" los datos, llamará a mostrarDatos.
obtenerDatosDelServidor(mostrarDatos);

/*
Explicación:
1. obtenerDatosDelServidor simula una solicitud a un servidor que tarda 2 segundos.
2. Al final del proceso, llamamos a la función callback (mostrarDatos), pasando los datos simulados.
3. mostrarDatos se encarga de mostrar los datos en la consola.
*/
