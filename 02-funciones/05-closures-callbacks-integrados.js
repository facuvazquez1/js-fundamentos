// Ejercicios combinados: closures + callbacks
// Regla: cada uno se corre con node, se verifica el resultado en consola.

// 1. crearContadorConLimite(limite)
// Devuelve una función incrementar(callback). Cada vez que se llama a
// incrementar(callback), el contador interno sube 1 y se ejecuta el callback
// pasándole el valor actual. Si el contador llega al límite, el callback recibe
// además un aviso de que se llegó al límite (en vez de solo el número).

function crearContadorConLimite(limite){

    let contador = 0

    function incrementar(callback){
        contador ++
        if (contador === limite){
            callback(`Has llegado al limite de ${contador}`)
        } else {
            callback(contador)
        }
    }

    return incrementar
}

const incrementar = crearContadorConLimite(3)
console.log(incrementar())
console.log(incrementar())
console.log(incrementar())
console.log(incrementar())




// 2. crearValidadorDeStock(stockInicial)
// Devuelve un objeto con una función vender(cantidad, callbackExito, callbackSinStock).
// Cada venta resta del stock interno (oculto). Si hay stock suficiente, ejecuta
// callbackExito con el stock restante. Si no alcanza, ejecuta callbackSinStock
// sin modificar el stock.



// 3. crearRegistroDeTemperaturas()
// Devuelve un objeto con dos funciones:
// - registrar(temperatura, callbackAlerta): guarda la temperatura en un array interno
//   y, si es mayor a 38, ejecuta callbackAlerta con un mensaje (si no supera 38, no
//   ejecuta nada).
// - promedio(): devuelve el promedio de todas las temperaturas registradas (usá reduce).