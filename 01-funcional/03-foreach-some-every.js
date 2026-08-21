// Ejercicios de forEach, some, every
// Regla: se corre cada uno con node, se verifica el resultado en consola.

// -------------------- FOREACH --------------------
// forEach recorre el array para EJECUTAR UNA ACCIÓN por cada elemento (ej: imprimir),
// no para transformar datos. Por eso no tiene sentido guardar su resultado en una
// variable: siempre devuelve undefined, a diferencia de map que sí devuelve un array nuevo.

// 1. Dado un array de productos { nombre, precio }, imprimí en consola cada uno
// con el formato: "Mouse cuesta $5000"
const productos3 = [
    { nombre: "Mouse", precio: 5000 },
    { nombre: "Teclado", precio: 12000 },
    { nombre: "Monitor", precio: 80000 }
]

productos3.forEach(producto => {
    console.log(`${producto.nombre} cuesta $${producto.precio}`)
})


// -------------------- SOME --------------------
// some devuelve true si AL MENOS UN elemento cumple la condición. 

// 2. Dado un array de juegos { titulo, completado }, verificá si HAY AL MENOS
// UNO completado (debería dar true)
const juegos1 = [
    { titulo: "Hollow Knight", completado: true },
    { titulo: "Elden Ring", completado: false },
    { titulo: "GTA 5", completado: false }
]

const hayJuegosCompletados = juegos1.some(juego => juego.completado === true)
console.log(hayJuegosCompletados) // true



// 3. Dado un array de números, verificá si hay al menos uno negativo
const numeros6 = [5, 3, -2, 8, 10]

const hayNumerosNegativos = numeros6.some(n => n < 0)
console.log(hayNumerosNegativos) // true


// -------------------- EVERY --------------------
// every devuelve true solo si TODOS los elementos cumplen la condición.

// 4. Dado un array de edades, verificá si TODAS son mayores o iguales a 18
const edades2 = [22, 30, 19, 45]

const todosMayores = edades2.every(n => n >= 18)
console.log(todosMayores) // true


// 5. Dado un array de productos { nombre, stock }, verificá si TODOS tienen stock
// disponible (stock > 0)
const productos4 = [
    { nombre: "Mouse", stock: 10 },
    { nombre: "Teclado", stock: 0 },
    { nombre: "Monitor", stock: 3 }
]

const stockDisponible = productos4.every(productos => productos.stock > 0)
console.log(stockDisponible) // false