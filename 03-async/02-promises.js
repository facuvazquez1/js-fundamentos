// 03-async — Promises 

// 1. Crea una función verificarSaldo(saldo) que devuelva una Promise.
//    Si saldo >= 0, resuelve con el mismo saldo.
//    Si saldo < 0, rechaza con el mensaje "Saldo negativo no permitido"

function verificarSaldo(saldo){
    return new Promise((resolve, reject) => {
            if(saldo >= 0){
                resolve(saldo)
            } else {
                reject("Saldo negativo no permitido")
            }  
    })
}
// then y catch
verificarSaldo(100).then(saldo => console.log(saldo)) // Resultado: 100
verificarSaldo(-20).catch(error => console.log(error)) // Resultado: Saldo negativo no permitido


// 2. Crea una función depositar(saldoActual, monto) que devuelva una Promise.
//    Espera 1 segundo. Si monto > 0, resuelve con (saldoActual + monto).
//    Si monto <= 0, rechaza con "El monto a depositar debe ser mayor a 0"


function depositar(saldoActual, monto){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
           if(monto > 0){
            resolve(saldoActual + monto)
           }  else {
            reject("El monto a depositar debe ser mayor a 0")
           }   
        }, 1000)
    })
}

depositar(100, 50).then(saldo => console.log(saldo)) // Resultado: 150
depositar(100, -20).catch(error => console.log(error)) // Resultado: El monto a depositar debe ser mayor a 0

// 3. Encadena ambas funciones: primero verificarSaldo(100), y si resuelve,
//    usa ese resultado para llamar a depositar() con un monto de tu elección.
//    Mostrá el saldo final con un solo .then() al final de la cadena, y
//    capturá cualquier error de cualquiera de los dos pasos con un solo .catch()

verificarSaldo(100)
    .then(saldoVerificado => {
        return depositar(saldoVerificado, 50) // acá retornás OTRA Promise
    })
    .then(saldoFinal => {
        console.log(saldoFinal) // esto ya es el número final, no una Promise
    })
    .catch((error) =>{
        console.log(error)
    })

 

// 4. Crea tres funciones que devuelvan Promises: obtenerPrecioDolar(),
//    obtenerPrecioEuro() y obtenerPrecioReal(). Cada una espera un tiempo
//    distinto (por ejemplo 1s, 2s y 1.5s) y resuelve con un número inventado.
//    Usa Promise.all() para esperar las tres al mismo tiempo y mostrar
//    un objeto { dolar, euro, real } con los tres valores juntos

function obtenerPrecioDolar(){
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(1500)
        }, 1000) // Tiempo: 1000 segundos
    })
}

function obtenerPrecioEuro(){
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(1430)
        }, 2000) // Tiempo: 2000 segundos
    })
}

function obtenerPrecioReal(){
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(1000)
        }, 1500) // Tiempo: 1500 segundos
    })
}


Promise.all([obtenerPrecioDolar(), obtenerPrecioEuro(), obtenerPrecioReal()])
    .then(([dolar, euro, real]) => {
        console.log({dolar, euro, real})
    }) // Resultado: { dolar: 1500, euro: 1430, real: 1000 }

// Tiempo total: 4.5 segundos
// Tiempo real de ejecucion: 2.1 segundos

// Explicacion: Promise.all corre las tres Promises en paralelo, y el tiempo total es el de la más lenta (el euro, con sus 2 segundos), no la suma de todas. Esa es la ventaja real de usarlo en vez de encadenar .then() uno atrás de otro cuando las tareas son independientes entre sí.


// 5. Crea una función validarMonto(monto) que devuelva una Promise.
//    Si monto es un number y es mayor a 0, resuelve con el monto.
//    Si no cumple alguna de esas dos condiciones, rechaza con un mensaje
//    que explique cuál validación falló. Probala con al menos 3 casos
//    distintos (válido, no-number, negativo) encadenando .then()/.catch()

function validarMonto(monto){
    return new Promise((resolve, reject) => {
        if(typeof monto !== "number"){
            reject("Usted ingresó un dato no numérico, vuelva a intentarlo.")
        } else if (monto <= 0) {
            reject("Usted ha ingresado un número negativo")
        } else {
            resolve(monto)
        }
    })
}

validarMonto(100) // Resultado: 100
    .then(monto => console.log(monto))
    .catch(error => console.log(error))

validarMonto("100") // Resultado: Usted ingresó un dato no numérico, vuelva a intentarlo.
    .then(monto => console.log(monto))
    .catch(error => console.log(error))

validarMonto(-100) // Resultado: Usted ha ingresado un número negativo
    .then(monto => console.log(monto))
    .catch(error => console.log(error))


// 03-async — Repaso de Promises 
// Cada ejercicio agrega UN concepto nuevo sobre el anterior.

// 1. Crea una Promise llamada mensajePromise que resuelva DIRECTO (sin
//    setTimeout, sin condiciones) con el string "Primera promesa".
//    Consumila con .then() para mostrar el mensaje.
//    Objetivo: la sintaxis mínima de Promise + then, sin nada más.

const mensajePromise = new Promise((resolve) => {
    resolve("Primera promesa")
})

mensajePromise
    .then((mensaje) => {
        console.log(mensaje)
    })


// 2. Crea una función obtenerColor() que devuelva una Promise. Esta vez
//    CON setTimeout (1 segundo), resuelve con el string "Azul".
//    Consumila con .then(). Objetivo: agregar el setTimeout.

function obtenerColor() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("Azul")
        }, 1000)
    })
}

obtenerColor()
    .then((mensaje) => {
        console.log(mensaje)
    })


// 3. Crea una función fallar() que devuelva una Promise. Espera 1 segundo
//    y siempre RECHAZA (reject) con el mensaje "Esto siempre falla".
//    Consumila con .catch(). Objetivo: primera vez usando reject/catch,
//    sin ningún if de por medio — la promesa rechaza siempre, a propósito.

function fallar(){
    return new Promise ((resolve, reject) => {
        setTimeout(() => {
            reject("Esto siempre falla")            
        }, 1000);
    })
}

fallar()
    .then((mensaje) => {
        console.log(`Este mensaje nunca deberia aparecer:`, mensaje)
    })
    .catch((error) => {
        console.log(error)
    })


// 4. Crea una función verificarStock(cantidad) que devuelva una Promise.
//    Espera 1 segundo. Si cantidad > 0, resuelve con "Hay stock".
//    Si cantidad es 0 o menos, rechaza con "Sin stock".
//    Probala dos veces: una con un número positivo (.then) y otra con 0
//    o negativo (.catch). Objetivo: primera vez con un if/else adentro
//    de la Promise, un solo parámetro, un solo criterio.




// 5. Crea una función obtenerPrecioBase() que devuelva una Promise. Espera
//    1 segundo y resuelve con el número 100.
//    Consumila con .then(), y DENTRO de ese mismo .then(), sin crear otra
//    Promise todavía, multiplicá el valor recibido por 2 y mostralo con
//    console.log. Objetivo: transformar el valor adentro de un .then(),
//    sin encadenar nada más por ahora.


// 6. Crea dos funciones: obtenerUsuario() (espera 1s, resuelve con el
//    string "Facundo") y obtenerRol() (espera 1s, resuelve con el string
//    "Administrador"). Encadená así: primero obtenerUsuario().then(), y
//    DENTRO de ese .then(), hacé return obtenerRol() para pasar a un
//    SEGUNDO .then() que reciba el rol y lo muestre junto con el usuario
//    (vas a necesitar guardar el usuario en una variable de afuera antes
//    de perder la referencia). Objetivo: primera vez encadenando dos
//    Promises reales, una después de la otra.


// 7. Crea una función sumar(a, b) que devuelva una Promise. Resuelve de
//    inmediato (sin setTimeout) con (a + b). Usa Promise.all() para sumar
//    tres pares distintos al mismo tiempo: sumar(1,2), sumar(3,4) y
//    sumar(5,6). Mostrá el array de los tres resultados juntos.
//    Objetivo: primer uso de Promise.all(), con algo bien simple.


// 8. Crea tres funciones que devuelvan Promises con tiempos DISTINTOS
//    (por ejemplo 1s, 2s, 3s), cada una resolviendo con un string fijo
//    distinto (por ejemplo "A", "B", "C"). Usa Promise.all() para
//    esperarlas y mostrar los tres strings unidos en un solo mensaje
//    (por ejemplo con .join(" - ")). Medí el tiempo con console.time /
//    console.timeEnd. Objetivo: confirmar que Promise.all corre en
//    paralelo, no en serie (ya lo viste antes, este es el repaso).


// 9. Crea una función validarUsuario(nombre) que devuelva una Promise.
//    Si nombre no es un string, rechaza con "El nombre debe ser texto".
//    Si nombre es un string vacío (""), rechaza con "El nombre no puede
//    estar vacío". Si pasa ambas validaciones, resuelve con nombre.
//    Probala con 3 casos: un nombre válido, un número, y un string
//    vacío. Objetivo: repasar múltiples ramas de rechazo (como
//    validarMonto que ya hiciste), pero con otro tipo de dato.


// 10. Combina todo: crea validarUsuario(nombre) (podés reusar el del
//     ejercicio 9) y crearPerfil(nombre) (una Promise nueva, espera 1s,
//     resuelve con un objeto { nombre, fechaCreacion: "hoy" }).
//     Encadená: primero validarUsuario(nombre), si resuelve usá ESE
//     resultado para llamar a crearPerfil(), mostrá el perfil final con
//     un solo .then() al final, y capturá cualquier error de cualquiera
//     de los dos pasos con un solo .catch(). Probalo con un nombre válido
//     y con uno inválido. Objetivo: el mismo patrón del ejercicio 3 de
//     02-promises.js (verificarSaldo -> depositar), para confirmar que
//     ya te sale solo.