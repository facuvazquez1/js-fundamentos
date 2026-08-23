// Ejercicios de rest / spread en parámetros de funciones
// Rest (...) en los PARÁMETROS: junta una cantidad indefinida de argumentos en un array.
// Spread (...) al LLAMAR una función: desparrama un array ya existente como argumentos sueltos.
// Regla: cada uno se corre con node, se verifica el resultado en consola.

// 1. Creá una función sumarTodos(...numeros) que reciba una cantidad indefinida de
// números y devuelva la suma de todos ellos.

function sumarTodos(...numeros){
    return numeros.reduce((acc, numero) => acc + numero, 0)
}

console.log(sumarTodos(1, 2, 3))       // 6
console.log(sumarTodos(1, 2, 3, 4, 5)) // 15
console.log(sumarTodos())              // 0


// 2. Creá una función contarArgumentos(...args) que devuelva CUÁNTOS argumentos recibió
// (sin importar cuáles sean).

function contarArgumentos(...args){
    return args.length
}

console.log(contarArgumentos("a", "b", "c")) // 3
console.log(contarArgumentos(1, 2))          // 2


// 3. Creá una función primeroYResto(primero, ...resto) que reciba el primer argumento
// aparte, y el resto agrupado en un array. Debe imprimir ambos por separado.

function primeroYResto(primero, ...resto){
    console.log(`Primero: ${primero}`)
    console.log("Resto", resto)
    // console.log(`Resto: ${resto}`) // 
}

// cuando metés un array directo dentro de un template literal (`${resto}`), JS no te muestra [2, 3, 4] con los corchetes — convierte el array a string uniendo sus elementos con comas, sin corchetes: te va a dar "Resto: 2,3,4", no "Resto: [2, 3, 4]".

primeroYResto(1, 2, 3, 4)
// "Primero: 1"
// "Resto: [2, 3, 4]"


// 4. Dado un array ya existente, usá SPREAD (no rest) para pasárselo a Math.max()
// y encontrar el número más grande. (Math.max no acepta un array directo, solo
// números sueltos como argumentos - por eso hace falta desparramarlo)

const numerosArray = [4, 19, 2, 87, 34]

console.log(Math.max(...numerosArray))


// 5. Creá una función promedio(...numeros) que calcule el promedio de todos los
// números recibidos (usá reduce para sumar, y dividí por la cantidad).

function promedio(...numeros){
    let suma = numeros.reduce((acc, numero) => acc + numero, 0) 
    let prom = suma / numeros.length
    return prom
}

console.log(promedio(10, 20, 30)) // 20
console.log(promedio(5, 5, 5, 5)) // 5
