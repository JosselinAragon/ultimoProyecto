const readline = require('readline');

// Creamos la interfaz para escribir y recibir datos desde la terminal
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Unimos todos los caracteres para utilizarlos al generar la contraseña
const MAYUSCULAS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const MINUSCULAS = 'abcdefghijklmnopqrstuvwxyz';
const NUMEROS = '0123456789';
const SIMBOLOS = '!@#$%^&*()_+-=[]{}|;:,.<>?';

 
// Esta función genera una contraseña con la cantidad de caracteres indicada
const TODOS_LOS_CARACTERES = MAYUSCULAS + MINUSCULAS + NUMEROS + SIMBOLOS;


 //Repetimos el proceso hasta completar la longitud solicitada
function generarCadenaAleatoria(longitud) {
    let password = '';
    for (let i = 0; i < longitud; i++) {

        // Elegimos un carácter al azar de todos los disponibles
        const indiceAleatorio = Math.floor(Math.random() * TODOS_LOS_CARACTERES.length);
        password += TODOS_LOS_CARACTERES[indiceAleatorio];
    }
    return password;
}

