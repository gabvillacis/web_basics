// Esta función simula una solicitud a un servidor usando una promesa.
function obtenerDatosDelServidor() {
  console.log("Solicitando datos del servidor...");
  
  // Retornamos una nueva promesa
  return new Promise((resolver, rechazar) => {
    // Simulamos el tiempo de espera del servidor con setTimeout.
    setTimeout(() => {
        const exito = true;  // Simulamos si la solicitud es exitosa o no
        
        if (exito) {
            // Si la solicitud es exitosa, resolvemos la promesa con los datos simulados.
            const datos = { nombre: "Producto B", precio: 150 };
            resolver(datos);  // Resolvemos la promesa
        } else {
            // Si la solicitud falla, rechazamos la promesa con un mensaje de error.
            rechazar("Error al obtener datos del servidor");
        }
    }, 2000);  // Simulamos que la solicitud tarda 2 segundos
  });
}

// Llamamos a obtenerDatosDelServidor. Como esta función retorna una promesa, usamos .then() para manejar el éxito.
obtenerDatosDelServidor()
  .then((datos) => {
    // Si la promesa se resuelve con éxito, mostramos los datos del producto.
    console.log(`Producto: ${datos.nombre}, Precio: ${datos.precio}`);
  })
  .catch((error) => {
    // Si la promesa se rechaza (falla), mostramos el error en la consola.
    console.error(error);
  });

/*
Explicación:
1. obtenerDatosDelServidor simula una solicitud a un servidor que tarda 2 segundos.
2. En lugar de usar un callback, retornamos una promesa.
3. Si la solicitud es exitosa, resolvemos la promesa con los datos simulados.
4. Usamos .then() para manejar el éxito de la solicitud y .catch() para manejar errores.
*/
