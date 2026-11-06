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


 //se Comprueba mediante condiciones lógicas si contiene al menos una mayúscula, un número y un símbolo.
 //validacion de seguridad
function cumpleRequisitosSeguridad(password) {
    let tieneMayuscula = false;
    let tieneNumero = false;
    let tieneSimbolo = false;

    // Ciclo para recorrer cada carácter de la contraseña generada
    for (let i = 0; i < password.length; i++) {
        const char = password[i];

        if (MAYUSCULAS.includes(char)) {
            tieneMayuscula = true;
        } else if (NUMEROS.includes(char)) {
            tieneNumero = true;
        } else if (SIMBOLOS.includes(char)) {
            tieneSimbolo = true;
        }
    }

    // Retorna verdadero solo si cumple estrictamente con todas las condiciones
    return tieneMayuscula && tieneNumero && tieneSimbolo;
}

//Función principal y la lógica con reintento automático si falla la validación
function generarContrasenaSegura(longitud) {
    let passwordValida = '';
    let intentos = 0;
    const maxIntentos = 5; // Seguridad para evitar bucles infinitos

    // Ciclo para reintentar automáticamente la generación si no pasa la validación
    while (intentos < maxIntentos) {
        intentos++;
        const candidato = generarCadenaAleatoria(longitud);

        if (cumpleRequisitosSeguridad(candidato)) {
            passwordValida = candidato;
            break;
        }
    }

    return { password: passwordValida, intentos };
}

// Interfaz CLI _ Solicitud de parámetros al usuario
console.log('=== GENERADOR DE CONTRASEÑAS SEGURAS ===\n');

rl.question('Ingrese la longitud deseada para la contraseña (mínimo 8 caracteres): ', (respuesta) => {
    const longitud = parseInt(respuesta);

    // Validación de entrada y del mínimo de caracteres
    if (isNaN(longitud) || longitud < 8) {
        console.log('\n[ERROR CLI]: La longitud ingresada no es válida. Debe ser un número entero y un mínimo de 8 caracteres.');
        rl.close();
        return;
    }

    console.log(`\nProcesando solicitud para una contraseña de ${longitud} caracteres...`);

    // Generación y validación automática
    const resultado = generarContrasenaSegura(longitud);

    if (resultado.password) {
        console.log('\n----------------------------------------');
        console.log('¡Contraseña generada con éxito!');
        console.log(`Contraseña: ${resultado.password}`);
        console.log(`Intentos automáticos realizados: ${resultado.intentos}`);
        console.log('----------------------------------------');
    } else {
        console.log('\n[ERROR CLI]: No se pudo generar una contraseña que cumpliera los requisitos de seguridad.');
    }

    rl.close();
});