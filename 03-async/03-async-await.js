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

function obtenerNumero(){
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(10)
        }, 1000)
    })
}

async function mostrarNumero() {
    const numero = await obtenerNumero() // el await indica que espere a que se resulta obtenerNumero dado que la misma retorna una promesa, sin el await, la funcion se ejecutaria y no imprimiria el resultado, porque faltaria 1 segundo para tenerlo.
    console.log(numero)
    
}

mostrarNumero()

// 3. Crea una función puedeFallar() que devuelva una Promise. Espera 1
//    segundo. Usa una variable fija adentro, por ejemplo
//    const exito = false, y si exito es true resuelve con "Todo bien",
//    si es false rechaza con "Algo salió mal".
//    Crea una función async intentar() que use await DENTRO de un
//    try/catch para manejar ambos casos. Cambiá el valor de exito a true
//    y a false y corré las dos veces para ver ambos caminos.
//    Objetivo: primera vez usando try/catch con await.

function puedeFallar(){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const exito = true
            if (exito == false) {
                reject("Algo salió mal")
            } else {
                resolve("Todo bien")
            }
        }, 1000)
    })
}

async function intentar() {
    try{
        const response = await puedeFallar()
        console.log(response)
    } catch (error) {
        console.log("ERROR: ", error)
    }
}

intentar()



// 4. Crea dos funciones simples que devuelvan Promises con setTimeout:
//    obtenerNombre() (resuelve con "Facundo" después de 1 segundo) y
//    obtenerApellido() (resuelve con "Vazquez" después de 1 segundo).
//    Crea una función async mostrarNombreCompleto() que haga AWAIT DE
//    UNA, guarde el resultado en una variable, después haga AWAIT DE LA
//    OTRA, guarde ese resultado en otra variable, y al final muestre
//    ambos juntos. Objetivo: dos await seguidos, cada uno en su propia
//    variable, sin mezclarlos con try/catch todavía.

function obtenerNombre(){
    return new Promise(resolve => {
        setTimeout(() => {
            resolve("Facundo")
        }, 1000)
    })
}

function obtenerApellido(){
    return new Promise(resolve => {
        setTimeout(() => {
            resolve("Vazquez")
        }, 1000)
    })
}

async function mostrarNombreCompleto() {
    const name = await obtenerNombre()
    const lastname = await obtenerApellido()
    console.log(`${name} ${lastname}`)
}

mostrarNombreCompleto()



// 5. Crea una función duplicar(numero) que devuelva una Promise. Espera 1
//    segundo y resuelve con (numero * 2). Fijate que esta función SÍ
//    recibe un parámetro (a diferencia de los ejercicios 1 a 4).
//    Crea una función async mostrarDuplicado(numero) que reciba ese mismo
//    parámetro, use await con try/catch para llamar a duplicar(numero),
//    y muestre el resultado. Probala con mostrarDuplicado(5) y
//    mostrarDuplicado(10). Objetivo: combinar todo lo anterior (await +
//    try/catch) pero ahora con una función que recibe un dato de afuera,
//    como preparación para 03-async-await.js.

function duplicar(numero){
    return new Promise((resolve) => {
        setTimeout(() => {
            const resultado = numero * 2
            resolve(resultado)
        }, 1000)
    })
}

async function mostrarDuplicado(numero) {
    try{
        const multiplicacionPor2 = await duplicar(numero)
        console.log(multiplicacionPor2)
    } catch (error){
        console.log(error)
    }
    
}

mostrarDuplicado(5)

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

function calcularDescuento(precio, porcentaje){
    return new Promise((resolve, reject) => {
        setTimeout(()=> {
            if (porcentaje >= 0 && porcentaje <= 100) {
                const precioFinal = (precio - (precio * porcentaje / 100))
                resolve(precioFinal)
            } else {
                reject("Porcentaje inválido, debe estar entre 0 y 100")
            }           
        }, 1000)
    })
}

async function aplicarDescuento(precio, porcentaje) {
    try{
        const resultado = await calcularDescuento(precio, porcentaje)
        console.log(resultado)
    } catch(error) {
        console.log("Error: ", error)
    }
    
}

aplicarDescuento(100, 150)


// 3. Crea una función consultarStock(producto) que devuelva una Promise.
//    Espera un tiempo distinto según el producto (elegí vos los tiempos).
//    Resuelve siempre con un número inventado de unidades disponibles.
//    Crea una función async consultarStockTotal() que consulte el stock de
//    3 productos distintos EN SERIE (un await atrás del otro) y muestre la
//    suma total. Medí cuánto tarda con console.time/console.timeEnd

function consultarStock(producto){
    return new Promise((resolve) => {
        let tiempo
        let unidades 

        if(producto === "mouse"){
            tiempo = 1000
            unidades = 10
        } else if (producto === "teclado"){
            tiempo = 2000
            unidades = 20
        } else {
            tiempo = 1500
            unidades =5
        }

        setTimeout(() => {
            resolve(unidades)
        }, tiempo)
    })
}

async function consultarStockTotal() {
    console.time("stockSerie")

    const mouse = await consultarStock("mouse")
    const teclado = await consultarStock("teclado")
    const gabinete = await consultarStock("gabinete")

    const total = mouse + teclado + gabinete
    console.log(total)

    console.timeEnd("stockSerie")
    
}

consultarStockTotal() 
// Resultado: 35
// stockSerie: 4.545s


// 4. Con las mismas 3 llamadas a consultarStock del ejercicio anterior, crea
//    una función async consultarStockParalelo() que las consulte todas AL
//    MISMO TIEMPO usando Promise.all junto con await, y muestre la suma
//    total. Medí el tiempo igual que en el ejercicio 3 y compará ambos

async function consultarStockParalelo() {
    console.time("stockParalelo")

    const [mouse, teclado, gabinete] = await Promise.all([
        consultarStock("mouse"),
        consultarStock("teclado"),
        consultarStock("gabinete")
    ])

    const total = mouse + teclado + gabinete
    console.log(total)

    console.timeEnd("stockParalelo")

}

consultarStockParalelo()
// stockParalelo: 2.014s



// 5. Crea una función procesarPago(monto) que devuelva una Promise. Espera 1
//    segundo. Si monto <= 0, la función debe hacer throw de un Error (no
//    reject) con el mensaje "El monto del pago debe ser mayor a 0". Si es
//    válido, resuelve con "Pago de $" + monto + " procesado con éxito".
//    Crea una función async realizarPago(monto) que llame a procesarPago
//    con await dentro de un try/catch, y en el catch muestre error.message
//    (no el error completo)


function procesarPago(monto){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if(monto <= 0) {
                reject(new Error("El monto del pago debe ser mayor a 0"))
            } else {
                
                resolve("Pago de $" + monto + " procesado con éxito")
            }

        }, 1000)
    })
}

async function realizarPago(monto) {
    try{
        const pago = await procesarPago(monto)
        console.log(pago)
    } catch(error) {
        console.log(error.message)
    }
}

realizarPago(-1)



