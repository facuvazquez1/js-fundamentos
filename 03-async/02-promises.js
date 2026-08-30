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