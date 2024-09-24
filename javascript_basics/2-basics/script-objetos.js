/*-------------------- OBJETOS --------------------*/
console.log("\n-- Definiendo objetos --")

let persona = {
    nombres: 'Gabriel',
    apellidos: 'Villacis',
    ciudad: 'Guayaquil',
    celular: '0956565651',
    edad: 32,
    sueldo: 20000.99,
    esBarcelonista: true
}

console.log(typeof(persona)); //object
console.log(persona); //object

// Notación de punto
persona.nombres = 'Juan Carlos';
persona.ciudad = 'Quito'
persona.edad = 35;
persona.email = 'gvillacis@hotmail.com'

console.log(persona);
console.log(persona.nombres);

// Notación de corchetes
console.log('Edad', persona['edad'])
persona['ciudad'] = 'Riobamba';
console.log(persona['ciudad']);

console.log(persona['pais']);
persona['pais'] = 'Ecuador';
console.log(persona['pais']);

console.log(persona);

persona['nombres_completos'] = persona['nombres'] + ' ' + persona['apellidos'];
console.log(persona['nombres_completos']);

/*-------------------------------------------------*/