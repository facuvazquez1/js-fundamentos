// Ejercicios de funciones que devuelven funciones + currying
// Currying: en vez de funcion(a, b, c), armás una cadena funcion(a)(b)(c),
// donde cada función recibe UN parámetro y devuelve la siguiente función.
// Regla: cada uno se corre con node, se verifica el resultado en consola.

// 1. Creá una función sumarCurry(a) que devuelva una función que reciba "b" y devuelva
// la suma de a + b. Se usa como sumarCurry(5)(3).

function sumarCurry(a){
    function sumarB(b){
        return a + b
    }
    return sumarB
}
console.log(sumarCurry(5)(3)) // 8


// 2. Creá una función potenciaCurry(base) que devuelva una función que reciba
// "exponente" y devuelva base elevado a exponente. Se usa como potenciaCurry(2)(3).

function potenciaCurry(base){
    function exponente(numero){
        return base ** numero
    }
    return exponente
}


console.log(potenciaCurry(2)(3)) // 8 (2 elevado a la 3)
console.log(potenciaCurry(7)(5)) // 16807 (7 elevado a la 5)

// 3. Creá una función saludoCurry(saludo) que devuelva una función que reciba "nombre"
// y devuelva el string "[saludo], [nombre]!". Se usa como saludoCurry("Hola")("Facu").

function saludoCurry(saludo){
    function saludar(nombre){
        return(`${saludo}, ${nombre}!`)
    }
    return saludar
}

console.log(saludoCurry("Hola")("Facu"))   // "Hola, Facu!"
console.log(saludoCurry("Buenas")("Sol"))  // "Buenas, Sol!"


// 4. Creá una función multiplicarCurry(a) que devuelva una función que reciba "b" y
// devuelva otra función más que reciba "c", devolviendo a * b * c.
// Se usa como multiplicarCurry(2)(3)(4).

function multiplicarCurry(a){
    function numeroB(b){
        function numeroC(c){
            return a * b * c
        }
        return numeroC
    }
    return numeroB
}

console.log(multiplicarCurry(2)(3)(4)) // 24


// 5. Creá una función crearValidador(minimo) que devuelva una función que reciba
// "maximo", y esa función devuelva OTRA función que reciba un "valor" y verifique
// si ese valor está entre minimo y maximo (inclusive).
// Se usa como crearValidador(10)(20)(15).

function crearValidador(minimo){
    function max(maximo){
        function verificador(valor){
            return valor >= minimo && valor <= maximo
        }
        return verificador
    }
    return max
}



console.log(crearValidador(10)(20)(15)) // true
console.log(crearValidador(10)(20)(25)) // false
