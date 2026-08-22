// Ejercicios de closures
// Un closure es una función que "recuerda" las variables del entorno donde fue creada,
// incluso después de que la función externa ya terminó de ejecutarse.
// Regla: cada uno se corre con node, se verifica el resultado en consola.

// 1. Creá una función crearContador() que, al llamarla, devuelva OTRA función.
// Cada vez que llamás a esa función devuelta, debe imprimir un número que empieza en 0
// y aumenta en 1 cada vez (0, luego 1, luego 2...).
// Pista: la variable que lleva la cuenta vive DENTRO de crearContador, no afuera.


function crearContador() {
    let contadorInterno = 0 

    function incremento(){
        console.log(contadorInterno)
        contadorInterno ++
        
    }
    return incremento 
}


const contador = crearContador()

contador() // 0
contador() // 1
contador() // 2


// 2. Creá una función crearSaludo(nombre) que devuelva una función. Al llamar a esa función
// devuelta (sin argumentos), debe imprimir "Hola, [nombre]!" usando el nombre que se le
// pasó a crearSaludo originalmente.

function crearSaludo(nombre) {
    function saludar(){
        console.log(`Hola, ${nombre}!`)
    }
    return saludar
}



const saludarAFacu = crearSaludo("Facundo")
const saludarASol = crearSaludo("Sol")

saludarAFacu() // "Hola, Facundo!"
saludarASol() // Hola, Sol!



// 3. Creá una función crearMultiplicador(factor) que devuelva una función que reciba
// un número y lo multiplique por "factor".

function crearMultiplicador(factor){
    function multiplicar(numero){
        return numero * factor
    }
    return multiplicar
}


const duplicar = crearMultiplicador(2)
const triplicar = crearMultiplicador(3)
console.log(duplicar(5))  // 10
console.log(triplicar(5)) // 15


// 4. Creá una función crearCuentaBancaria(saldoInicial) que devuelva un OBJETO con dos
// funciones: depositar(monto) y verSaldo(). El saldo debe mantenerse "oculto" dentro
// del closure, no como una propiedad pública del objeto.

function crearCuentaBancaria(saldoInicial){
    
    let contador = saldoInicial // el saldo oculto, no como propiedad pública

    let cuenta = {
        depositar: function(monto){
            contador = contador + monto // o contador += monto
            return contador
            
        },
        verSaldo: function(){
            return contador
        }
        
    };

    return cuenta

}

const cuenta = crearCuentaBancaria(1000)
cuenta.depositar(500)
console.log(cuenta.verSaldo()) // 1500


// 5. Creá una función crearListaDeTareas() que devuelva un objeto con dos funciones:
// agregar(tarea) (agrega una tarea a un array interno) y verTareas() (devuelve el array
// completo). El array de tareas debe vivir dentro del closure.


function crearListaDeTareas(){
    
    let arrayTareas = [] 

    let miLista = {
        agregar: function(tarea){
            return arrayTareas.push(tarea) // usamos push, que muta el arrayTareas debido a que vive dentro de la funcion y no es un array que pertenezca fuera de la misma.
        },

        verTareas: function(){
            return arrayTareas
        }
    }
    return miLista
}

const miLista = crearListaDeTareas()
miLista.agregar("Estudiar closures")
miLista.agregar("Hacer ejercicios")
console.log(miLista.verTareas()) // ["Estudiar closures", "Hacer ejercicios"]

// 6. Creá una función crearInterruptor() que devuelva una función. Cada vez que la
// llamás, debe alternar entre true y false (empezando en false) e imprimir el valor
// actual. Primera llamada: false. Segunda: true. Tercera: false. Y así.

// const interruptor = crearInterruptor()
// interruptor() // false
// interruptor() // true
// interruptor() // false


// 7. Creá una función crearDescuento(porcentaje) que devuelva una función que reciba
// un precio y devuelva ese precio con el descuento ya aplicado.

// const descuento10 = crearDescuento(10)
// const descuento25 = crearDescuento(25)
// console.log(descuento10(1000)) // 900
// console.log(descuento25(1000)) // 750


// 8. Creá una función crearAcumulador() que devuelva una función que reciba un número
// y lo vaya sumando a un total interno, devolviendo el total actualizado en cada llamada.

// const sumar = crearAcumulador()
// console.log(sumar(10)) // 10
// console.log(sumar(5))  // 15
// console.log(sumar(20)) // 35


// 9. Creá una función crearValidadorDeEdad(edadMinima) que devuelva una función que
// reciba una edad y devuelva true si es mayor o igual a edadMinima, false si no.

// const esMayorDeEdad = crearValidadorDeEdad(18)
// console.log(esMayorDeEdad(20)) // true
// console.log(esMayorDeEdad(15)) // false
