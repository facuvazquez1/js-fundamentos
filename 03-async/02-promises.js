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

// 5. Crea una función validarMonto(monto) que devuelva una Promise.
//    Si monto es un number y es mayor a 0, resuelve con el monto.
//    Si no cumple alguna de esas dos condiciones, rechaza con un mensaje
//    que explique cuál validación falló. Probala con al menos 3 casos
//    distintos (válido, no-number, negativo) encadenando .then()/.catch()