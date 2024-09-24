/*
Supongamos que queremos simular la carga de datos desde un servidor
y luego realizar alguna acción una vez que los datos estén disponibles.
*/

/*Paso 1: Definición de la Función Callback*/

function mostrarDatos(datos) {
    console.log('Los datos son:', datos);
}

/*Paso 2: Función que Simula la Carga de Datos */
function cargarDatos(callback) {
    // Simulando la carga de datos desde un servidor después de un tiempo de espera
    setTimeout(function() {
      const datos = { nombre: 'Juan', edad: 30 };
      callback(datos);
    }, 2000); // Esperamos 2 segundos antes de devolver los datos
}

/*Paso 3: Utilizando la Función con el Callback*/
cargarDatos(mostrarDatos);