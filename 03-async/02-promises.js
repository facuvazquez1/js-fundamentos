// 03-async — Promises

// 1. Reescribe saludarConDelay como una función saludarConDelayPromise(nombre)
//    que devuelva una Promise. Se resuelve después de 1 segundo con "Hola, [nombre]"


// 2. Reescribe procesarNumero como procesarNumeroPromise(numero) que devuelva
//    una Promise. Se resuelve después de 1 segundo con el numero multiplicado por 2


// 3. Reescribe paso1, paso2 y paso3 como funciones que devuelvan Promises
//    (paso1Promise, paso2Promise, paso3Promise). Cada una espera 1 segundo,
//    muestra "Paso X completado" y resuelve. Encadenalas con .then() para que
//    se ejecuten en orden (sin anidar, como en el ejercicio 3 de callbacks)


// 4. Reescribe validarEdad como validarEdadPromise(edad) que devuelva una
//    Promise. Resuelve con true si edad >= 18, o con false si no
//    (no hace falta reject acá, ambos casos son "éxito")


// 5. Reescribe obtenerUsuario como obtenerUsuarioPromise(id) que devuelva una
//    Promise. Si id > 0, resuelve con { id, nombre: "Usuario " + id }.
//    Si id <= 0, rechaza (reject) con el mensaje "ID inválido"
