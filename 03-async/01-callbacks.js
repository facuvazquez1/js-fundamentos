// 03-async — Callbacks

// 1. Crea una función saludarConDelay(nombre, callback) que use setTimeout
//    para esperar 1 segundo y luego invoque callback con el mensaje "Hola, [nombre]"

function saludarConDelay(nombre, callback){
    setTimeout(() => callback(`Hola, ${nombre}`), 1000)
}

const saludo = (mensaje) => console.log(mensaje)

saludarConDelay("facundo", saludo)


// 2. Crea una función procesarNumero(numero, callback) que espere 1 segundo
//    y luego invoque callback con el numero multiplicado por 2

function procesarNumero(numero, callback){
    setTimeout(() => callback(numero * 2), 1000)
}

const tareaCompletada = (mensaje) => console.log(mensaje)

procesarNumero(2, tareaCompletada)

// 3. Crea tres funciones paso1(callback), paso2(callback), paso3(callback).
//    Cada una espera 1 segundo y muestra en consola "Paso X completado"
//    antes de invocar su callback. Encadenalas para que se ejecuten en orden
//    (paso1 termina -> arranca paso2 -> termina -> arranca paso3)


function paso1(callback){

   setTimeout(() => {
    console.log("Paso 1 completado")
    callback()
   }, 1000)

}

function paso2(callback){

   setTimeout(() => {
    console.log("Paso 2 completado")
    callback()
   }, 1000)
   
}

function paso3(callback){

   setTimeout(() => {
    console.log("Paso 3 completado")
    callback()
   }, 1000)
   
}


// Definicion (callback hell) => cuando una llamada se anida dentro de la anterior de forma repetitiva, en un punto llega a ser imposible de seguir.

paso1(() => {
    paso2(() => {
        paso3(() => {
            console.log("Todos los pasos terminados")
        })
    })
})

// 4. Crea una función validarEdad(edad, callback) que espere 1 segundo y
//    luego invoque al callback con true si edad >= 18, o false si no

function validarEdad(edad, callback){
    setTimeout(() => {
        if(edad >= 18){
            callback(true)
        } else {
            callback(false)
        }
    }, 1000)
}



validarEdad(20, (esMayor) => console.log(esMayor))
validarEdad(14, (esMayor) => console.log(esMayor))

// 5. Crea una función obtenerUsuario(id, callbackExito, callbackError) que
//    espere 1 segundo. Si id > 0, invoca callbackExito con { id, nombre: "Usuario " + id }.
//    Si id <= 0, invoca callbackError con el mensaje "ID inválido"