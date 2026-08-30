// 03-async — Async/Await

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
