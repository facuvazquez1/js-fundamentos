// 03-async — Async/Await

// -- Practica Inicial --
// 03-async — Async/Await (calentamiento, antes de 03-async-await.js)
// Cada ejercicio agrega UNA sola cosa nueva sobre el anterior.

// 1. Crea una Promise llamada saludoPromise que resuelva directo (sin
//    setTimeout) con el string "Hola desde una Promise". Después, crea una
//    función async mostrarSaludo() que use await para obtener ese valor y
//    lo muestre con console.log. Objetivo: ver la sintaxis mínima de
//    async/await, sin setTimeout, sin condiciones, sin try/catch todavía.

const saludoPromise = new Promise((resolve) => {
    resolve("Hola desde una Promise")
})

function wait(ms){
    return new Promise((resolve) => setTimeout(resolve, ms))
}

async function mostrarSaludo() {

    await wait(2000)
    return saludoPromise

    
}

mostrarSaludo()
    .then((mensaje) => {
        console.log(mensaje)
    })


// 2. Crea una función obtenerNumero() que devuelva una Promise. Esta vez SÍ
//    con setTimeout (1 segundo), y resuelve con el número 10.
//    Crea una función async mostrarNumero() que use await para obtenerlo y
//    lo muestre. Objetivo: agregar el setTimeout, para confirmar que
//    await espera de verdad a que pase el tiempo.


// 3. Crea una función puedeFallar() que devuelva una Promise. Espera 1
//    segundo. Usa una variable fija adentro, por ejemplo
//    const exito = false, y si exito es true resuelve con "Todo bien",
//    si es false rechaza con "Algo salió mal".
//    Crea una función async intentar() que use await DENTRO de un
//    try/catch para manejar ambos casos. Cambiá el valor de exito a true
//    y a false y corré las dos veces para ver ambos caminos.
//    Objetivo: primera vez usando try/catch con await.


// 4. Crea dos funciones simples que devuelvan Promises con setTimeout:
//    obtenerNombre() (resuelve con "Facundo" después de 1 segundo) y
//    obtenerApellido() (resuelve con "Vazquez" después de 1 segundo).
//    Crea una función async mostrarNombreCompleto() que haga AWAIT DE
//    UNA, guarde el resultado en una variable, después haga AWAIT DE LA
//    OTRA, guarde ese resultado en otra variable, y al final muestre
//    ambos juntos. Objetivo: dos await seguidos, cada uno en su propia
//    variable, sin mezclarlos con try/catch todavía.


// 5. Crea una función duplicar(numero) que devuelva una Promise. Espera 1
//    segundo y resuelve con (numero * 2). Fijate que esta función SÍ
//    recibe un parámetro (a diferencia de los ejercicios 1 a 4).
//    Crea una función async mostrarDuplicado(numero) que reciba ese mismo
//    parámetro, use await con try/catch para llamar a duplicar(numero),
//    y muestre el resultado. Probala con mostrarDuplicado(5) y
//    mostrarDuplicado(10). Objetivo: combinar todo lo anterior (await +
//    try/catch) pero ahora con una función que recibe un dato de afuera,
//    como preparación para 03-async-await.js.

// -- Segundo segmento de ejercicios.

// 1. Crea una función buscarProducto(id) que devuelva una Promise. Espera 1
//    segundo. Si id > 0, resuelve con { id, nombre: "Producto " + id, precio: id * 100 }.
//    Si id <= 0, rechaza con "ID de producto inválido".
//    Después, crea una función async mostrarProducto(id) que use await para
//    llamar a buscarProducto(id) y muestre el resultado con console.log,
//    manejando el error con try/catch


function buscarProducto(id){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (id > 0) {
                resolve({id, nombre: "Producto " + id, precio: id * 100 })
            } else {
                reject("ID de producto inválido")
            }
        }, 1000)
    })
}



async function mostrarProducto(id) {
    
}

// 2. Crea una función calcularDescuento(precio, porcentaje) que devuelva una
//    Promise. Espera 1 segundo. Si porcentaje está entre 0 y 100, resuelve con
//    el precio final (precio - (precio * porcentaje / 100)). Si no, rechaza
//    con "Porcentaje inválido, debe estar entre 0 y 100".
//    Crea una función async aplicarDescuento(precio, porcentaje) que use
//    await y try/catch para mostrar el precio final o el error

// 3. Crea una función consultarStock(producto) que devuelva una Promise.
//    Espera un tiempo distinto según el producto (elegí vos los tiempos).
//    Resuelve siempre con un número inventado de unidades disponibles.
//    Crea una función async consultarStockTotal() que consulte el stock de
//    3 productos distintos EN SERIE (un await atrás del otro) y muestre la
//    suma total. Medí cuánto tarda con console.time/console.timeEnd

// 4. Con las mismas 3 llamadas a consultarStock del ejercicio anterior, crea
//    una función async consultarStockParalelo() que las consulte todas AL
//    MISMO TIEMPO usando Promise.all junto con await, y muestre la suma
//    total. Medí el tiempo igual que en el ejercicio 3 y compará ambos

// 5. Crea una función procesarPago(monto) que devuelva una Promise. Espera 1
//    segundo. Si monto <= 0, la función debe hacer throw de un Error (no
//    reject) con el mensaje "El monto del pago debe ser mayor a 0". Si es
//    válido, resuelve con "Pago de $" + monto + " procesado con éxito".
//    Crea una función async realizarPago(monto) que llame a procesarPago
//    con await dentro de un try/catch, y en el catch muestre error.message
//    (no el error completo)


