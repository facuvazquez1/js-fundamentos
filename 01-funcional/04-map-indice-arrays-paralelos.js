// Ejercicios aislados — map con índice y arrays paralelos
// Sin async, sin Promises. Solo el patrón puntual que se necesita
// para terminar verificarStockCarrito en el proyecto integrador.

// 1. Tenés dos arrays paralelos (misma longitud, mismo orden):
const frutas = ["Manzana", "Banana", "Naranja"]
const precios = [500, 300, 450]

const productos = frutas.map((nombre, index) => {
    
    const precio = precios[index]

    return {
        nombre: nombre,
        precio: precio, 
        
    }

    

})

console.log(productos)

// Usá map con índice sobre "frutas" para imprimir, por cada una,
// un mensaje tipo: "Manzana cuesta 500"
// (no hace falta return todavía, solo console.log adentro del map)

const productos2 = frutas.map((nombre, index) => {
    
    const precio = precios[index]
    
    return `${nombre} cuesta: $ ${precio}`

})

console.log(productos2)

// 2. Mismos arrays de arriba. Esta vez SÍ con return: usá map con índice
// para armar un nuevo array de strings, uno por fruta, con el formato
// "Manzana: $500". Guardalo en una variable y mostralo con console.log.


// 3. Dos arrays nuevos:
// Usá map con índice para armar un array de OBJETOS, uno por producto,
// con esta forma: { nombre, stock, hayStock }
// donde "hayStock" es true si el stock es mayor a 0, false si no.
const productos3 = ["Mouse", "Teclado", "Monitor"]
const disponibles = [10, 0, 3]


const verificarStock = productos3.map((nombre, index) => {
    const stock = disponibles[index]
    let hayStock
    if (stock > 0){
        hayStock = true
    } else{
        hayStock = false
    }

    return {
        nombre: nombre,
        stock: stock,
        hayStock: hayStock,
    }


})

console.log(verificarStock)



// 4. Dos arrays nuevos:
// Usá map con índice para armar un array de objetos { alumno, nota, aprobado }
// donde "aprobado" es true si la nota es mayor o igual a 6.

const alumnos = ["Facu", "Sol", "Juan"]
const notas = [8, 5, 9]

const notasAlumnos = alumnos.map((nombre, index) => {
    const nota = notas[index]
    let aprobado 
    if (nota >= 6){
        aprobado = true 
    } else {
        aprobado = false
    }

    return {
        alumno: nombre,
        nota: nota,
        aprobado: aprobado,
    }
})

console.log(notasAlumnos)



// 5. Combina lo anterior con un array que YA tiene objetos (no dos arrays
// sueltos, para practicar el caso que se te complicó en el proyecto):

// Usá map con índice sobre "pedidos" (no sobre stockReal) para armar un
// array de objetos { producto, cantidadPedida, stockReal, alcanza },
// donde "alcanza" compara stockReal[index] contra pedidos[index].cantidadPedida.
// Este es EXACTAMENTE el patrón que necesitás para verificarStockCarrito.

const pedidos = [
    { producto: "Mouse", cantidadPedida: 5 },
    { producto: "Teclado", cantidadPedida: 3 },
    { producto: "Monitor", cantidadPedida: 10 },
]
const stockReal = [10, 0, 3]

const resultadoStock = pedidos.map((pedido, index) => {
    
    const disponible = stockReal[index]
    let alcanza 

    if (pedido.cantidadPedida <= disponible) {
        alcanza = true
    } else {
        alcanza = false
    }

    return {
        nombre: pedido.producto,
        cantidadPedida: pedido.cantidadPedida,
        stockReal: disponible,
        alcanza: alcanza

    }
})

console.log(resultadoStock)

