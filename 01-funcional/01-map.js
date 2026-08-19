// Ejercicios de map 
// Regla: cada ejercicio se resuelve con map, se corre con node, se verifica el resultado en consola.
// map SIEMPRE devuelve un array del mismo largo que el original.

// 1. Dado un array de números, devolvé un nuevo array con cada uno multiplicado por 2
const numeros1 = [1, 2, 3, 4, 5]

const numDoble = numeros1.map(numero => numero * 2)
console.log(numDoble)



// 2. Dado un array de strings, devolvé un nuevo array con cada palabra en mayúsculas
const palabras = ["hola", "mundo", "javascript"]

const pMayus = palabras.map(palabra => palabra.toUpperCase())
console.log(pMayus)


// 3. Dado un array de números, devolvé un nuevo array donde cada número se convierte en true si es par, false si es impar
const numeros2 = [1, 2, 3, 4, 5, 6]

const trueOrFalse = numeros2.map(numero => numero % 2 === 0)
console.log(trueOrFalse)


// 4. Dado un array de objetos { nombre, edad }, devolvé un nuevo array SOLO con los nombres (un array de strings)
const personas1 = [
    { nombre: "Ana", edad: 25 },
    { nombre: "Luis", edad: 30 },
    { nombre: "Sol", edad: 22 }
]

const nombres = personas1.map(persona => persona.nombre)
console.log(nombres)

// 5. Dado el mismo array de personas, devolvé un nuevo array de objetos donde cada persona tiene un año más de edad
// (ojo: no debe mutar el array original, cada objeto debe ser una copia con spread)

const unAnioMas = personas1.map(persona => {
    return {...persona, edad: persona.edad + 1}
})
console.log(unAnioMas)

// 6. Dado un array de precios (números), devolvé un nuevo array con cada precio con el 21% de IVA aplicado

const preciosSuperemercado = [2000, 3000, 391, 980, 2890, 1000]
const precioConIva = preciosSuperemercado.map(precio => precio * 1,21)
console.log(precioConIva)


// 7. Dado un array de objetos { id, titulo, precio }, devolvé un nuevo array de objetos donde
// SOLO el producto con id === 2 tiene un descuento del 10% aplicado, los demás quedan igual
// (este es el patrón clave: if adentro del map, con spread para el que cambia)
const productos = [
    { id: 1, titulo: "Mouse", precio: 5000 },
    { id: 2, titulo: "Teclado", precio: 12000 },
    { id: 3, titulo: "Monitor", precio: 80000 }
]


const precioDesc = productos.map(producto => {
    if(producto.id === 2){
        return {...producto, precio: producto.precio - (producto.precio * 0.10)}
    } return producto
})

console.log(precioDesc)


// 8. Dado un array de objetos { id, nombre, activo }, devolvé un nuevo array donde
// el objeto con id === 3 cambia su propiedad "activo" a false, los demás quedan iguales

const clientes = [
    { id: 1, nombre: "Lautaro", activo: true },
    { id: 2, nombre: "Ramiro", activo: false },
    { id: 3, nombre: "Leandro", activo: true }
]

const clienteInactivo = clientes.map(cliente => {
    if(cliente.id === 3){
        return {...cliente, activo: false}
    }  return cliente
}
)

console.log(clienteInactivo)


// 9. Dado un array de strings con espacios de más, devolvé un nuevo array con cada string
// sin espacios al principio/final (usá .trim())
const textos = ["  hola  ", "chau  ", "  javascript"]
const textoSinEspacio = textos.map(texto => texto.trim())
console.log(textoSinEspacio)



// 10. Combiná filter + map: dado un array de números, quedate solo con los pares (filter)
// y después devolvé cada uno elevado al cuadrado (map). Podés encadenarlos: array.filter(...).map(...)
const numeros3 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

const paresAlCuadrado = numeros3.filter(n => n % 2 === 0).map(n => n * n)

console.log(paresAlCuadrado)