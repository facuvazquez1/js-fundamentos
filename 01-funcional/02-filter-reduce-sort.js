// Ejercicios de refuerzo — filter, reduce, sort + métodos de string
// Regla: se corre cada uno con node, se verifica el resultado en consola.
// Fijate en cada ejercicio si la herramienta pedida es la correcta antes de escribir código.

// -------------------- FILTER --------------------

// 1. Dado un array de edades, quedate solo con las mayores o iguales a 18
const edades = [15, 22, 8, 19, 45, 12, 30]


// 2. Dado un array de strings, quedate solo con los que tienen más de 5 caracteres
const palabras1 = ["sol", "javascript", "hola", "programacion", "mar"]


// -------------------- REDUCE --------------------

// 3. Dado un array de números, encontrá el número más grande usando reduce
// (pista: en cada vuelta comparás el acumulador contra el elemento actual y te quedás con el mayor)
const numeros4 = [4, 19, 2, 87, 34, 11]


// 4. Dado un array de objetos { producto, cantidad, precioUnitario }, calculá el total de la compra
// (cantidad * precioUnitario de cada uno, sumado)
const carrito = [
    { producto: "Mouse", cantidad: 2, precioUnitario: 5000 },
    { producto: "Teclado", cantidad: 1, precioUnitario: 12000 },
    { producto: "Monitor", cantidad: 1, precioUnitario: 80000 }
]


// 5. Dado un array de strings con nombres repetidos, contá cuántas veces aparece cada nombre
// y devolvé un objeto tipo { "Ana": 2, "Luis": 1 }
// (pista: el valor inicial de reduce puede ser un objeto {} en vez de un número)
const nombres2 = ["Ana", "Luis", "Ana", "Sol", "Luis", "Ana"]


// -------------------- SORT --------------------

// 6. Dado un array de números, ordenalo de menor a mayor SIN mutar el original
const numeros5 = [8, 3, 19, 1, 45, 6]


// 7. Dado un array de objetos { nombre, edad }, ordenalos por edad de menor a mayor sin mutar el original
const personas2 = [
    { nombre: "Gaston", edad: 40 },
    { nombre: "Sol", edad: 22 },
    { nombre: "Facu", edad: 30 }
]


// 8. Dado el mismo array de personas, ordenalos alfabéticamente por nombre sin mutar el original
// (pista: para strings, sort() ya sabe ordenar alfabéticamente solo con .localeCompare(),
// probá: (a, b) => a.nombre.localeCompare(b.nombre))


// -------------------- COMBINADOS --------------------

// 9. Dado un array de productos { nombre, precio, stock }, quedate solo con los que tienen stock > 0 (filter),
// y de esos devolvé el precio total sumado (reduce)
const productos2 = [
    { nombre: "Mouse", precio: 5000, stock: 10 },
    { nombre: "Teclado", precio: 12000, stock: 0 },
    { nombre: "Monitor", precio: 80000, stock: 3 },
    { nombre: "Webcam", precio: 15000, stock: 0 }
]


// 10. Dado un array de strings con nombres de usuarios con espacios de más y distinto casing,
// devolvé un array limpio (sin espacios, todo en minúsculas) y ordenado alfabéticamente
// (combiná trim + toLowerCase con map, y sort con localeCompare)
const usuarios = ["  Facundo  ", "ana", "  SOL", "Gaston  ", "luis  "]
