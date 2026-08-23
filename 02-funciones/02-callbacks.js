// Ejercicios de callbacks
// Un callback es una función que le pasás a otra función como argumento,
// para que esa otra función la ejecute en el momento que le corresponda.
// Regla: cada uno se corre con node, se verifica el resultado en consola.

// 1. Creá una función saludarConCallback(nombre, callback) que reciba un nombre y una
// función callback. Adentro, arma el mensaje "Hola, [nombre]!" y en vez de imprimirlo
// ella misma, se lo pasa como argumento al callback para que sea EL CALLBACK el que
// decida qué hacer con ese mensaje.


function saludarConCallback(nombre, callback){
    callback(`Hola, ${nombre}!`)
}

function imprimirEnConsola(mensaje) {
    console.log(mensaje)
}

saludarConCallback("Facundo", imprimirEnConsola) // "Hola, Facundo!"


// 2. Creá una función operar(a, b, callback) que reciba dos números y una función
// callback, y devuelva el resultado de aplicarle esa función callback a los dos números.
// (la función no sabe si va a sumar, restar o multiplicar - eso lo decide el callback)

function operar (a, b, callback){
    return callback(a, b)
}


function sumar(x, y) { return x + y }
function multiplicar(x, y) { return x * y }

console.log(operar(5, 3, sumar))       // 8
console.log(operar(5, 3, multiplicar)) // 15


// 3. Creá una función procesarArray(array, callback) que recorra el array (podés usar
// forEach) y por cada elemento, lo pase como argumento al callback.
function procesarArray(array, callback){
    array.forEach(element => {
        callback(element)
    });
}


function imprimirElemento(elemento) {
    console.log(`Elemento: ${elemento}`)
}

procesarArray([1, 2, 3], imprimirElemento)

// "Elemento: 1"
// "Elemento: 2"
// "Elemento: 3"


// 4. Creá una función validarEdad(edad, callbackExito, callbackError) que reciba una
// edad y DOS callbacks: si la edad es mayor o igual a 18, ejecuta callbackExito con
// un mensaje de éxito. Si no, ejecuta callbackError con un mensaje de error.

function validarEdad(edad, callbackExito, callbackError){
    if(edad >= 18){
        callbackExito("Edad válida")
    } else {
        callbackError("Edad insuficiente")
    }
}

function mostrarExito(mensaje) { console.log(`OK: ${mensaje}`) }
function mostrarError(mensaje) { console.log(`ERROR: ${mensaje}`) }

validarEdad(20, mostrarExito, mostrarError) // "OK: Edad válida"
validarEdad(15, mostrarExito, mostrarError) // "ERROR: Edad insuficiente"


// 5. Creá una función procesarCompra(producto, precio, callback) que calcule el precio
// con un 21% de IVA aplicado, y se lo pase al callback junto con el nombre del producto
// (el callback recibe DOS argumentos: producto y precioConIva).

function procesarCompra(producto, precio, callback){
    let precioConIva = precio * 1.21
    callback(producto, precioConIva)
}



function mostrarTicket(producto, precioConIva) {
    console.log(`${producto}: $${precioConIva}`)
}

procesarCompra("Mouse", 5000, mostrarTicket) // "Mouse: $6050"
