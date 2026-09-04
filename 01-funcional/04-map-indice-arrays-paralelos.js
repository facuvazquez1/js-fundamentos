// Ejercicios aislados — map con índice y arrays paralelos
// Sin async, sin Promises. Solo el patrón puntual que se necesita
// para terminar verificarStockCarrito en el proyecto integrador.

// 1. Tenés dos arrays paralelos (misma longitud, mismo orden):
const frutas = ["Manzana", "Banana", "Naranja"]
const precios = [500, 300, 450]

// Usá map con índice sobre "frutas" para imprimir, por cada una,
// un mensaje tipo: "Manzana cuesta 500"
// (no hace falta return todavía, solo console.log adentro del map)


// 2. Mismos arrays de arriba. Esta vez SÍ con return: usá map con índice
// para armar un nuevo array de strings, uno por fruta, con el formato
// "Manzana: $500". Guardalo en una variable y mostralo con console.log.


// 3. Dos arrays nuevos:
const productos = ["Mouse", "Teclado", "Monitor"]
const disponibles = [10, 0, 3]

// Usá map con índice para armar un array de OBJETOS, uno por producto,
// con esta forma: { nombre, stock, hayStock }
// donde "hayStock" es true si el stock es mayor a 0, false si no.


// 4. Dos arrays nuevos:
const alumnos = ["Facu", "Sol", "Juan"]
const notas = [8, 5, 9]

// Usá map con índice para armar un array de objetos { alumno, nota, aprobado }
// donde "aprobado" es true si la nota es mayor o igual a 6.


// 5. Combina lo anterior con un array que YA tiene objetos (no dos arrays
// sueltos, para practicar el caso que se te complicó en el proyecto):
const pedidos = [
    { producto: "Mouse", cantidadPedida: 5 },
    { producto: "Teclado", cantidadPedida: 3 },
    { producto: "Monitor", cantidadPedida: 10 },
]
const stockReal = [10, 0, 3]

// Usá map con índice sobre "pedidos" (no sobre stockReal) para armar un
// array de objetos { producto, cantidadPedida, stockReal, alcanza },
// donde "alcanza" compara stockReal[index] contra pedidos[index].cantidadPedida.
// Este es EXACTAMENTE el patrón que necesitás para verificarStockCarrito.
