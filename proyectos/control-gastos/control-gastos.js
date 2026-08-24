const presupuestos = {
    comida: 50000,
    transporte: 20000,
    ocio: 15000
}


function crearControldeGastos(presupuestos){

   
    let gastos = [
        // datos hardcodeados de prueba
        { categoria: "comida", monto: 8000 },
        { categoria: "comida", monto: 3000 },
        { categoria: "transporte", monto: 3000 }
    ]

    // 1. agregarGasto(categoria, monto, callbackExito, callbackPresupuestoSuperado)
    // tambien es posible escribir gastos.push(categoria: categoria, monto: monto)

    function agregarGasto(categoria, monto, callbackExito, callbackPresupuestoSuperado){
        gastos.push({categoria, monto})

        const nuevoTotal = totalPorCategoria(categoria)
        const limite = presupuestos[categoria]

        if(nuevoTotal > limite){
            callbackPresupuestoSuperado(`El presupuesto fue superado por: ${nuevoTotal - limite} `)
        } else{
            callbackExito(`Se agrego exitosamente un nuevo gasto por ${monto} de la categoria "${categoria}", el total gasatado hasta el momento es de ${nuevoTotal}. `)
        }

    }

    

    // 2. totalPorCategoria(categoria)
   function totalPorCategoria(categoria){
       return gastos.filter(gasto => gasto.categoria === categoria).reduce((acc, gasto) => acc + gasto.monto, 0)
        
   }
   
   // 3. totalGeneral()
   function totalGeneral(){
    return gastos.reduce((acc, gasto) => acc + gasto.monto, 0)
   }
   
   // 4. gastosPorCategoria(categoria)
   function gastosPorCategoria(categoria){
    return gastos.filter(gasto => gasto.categoria === categoria)
   }
   
   // retornamos todas las funciones en un solo bloque 
   return {
    agregarGasto,
    totalPorCategoria,
    totalGeneral,
    gastosPorCategoria
   }
  
}

const control = crearControldeGastos(presupuestos)
console.log(control.totalGeneral())
console.log(control.totalPorCategoria("comida"))
console.log(control.gastosPorCategoria("comida"))


function mostrarExito(mensaje) {
    console.log("OK:", mensaje)
}

function mostrarAlerta(mensaje){
    console.log("ALERTA:", mensaje)
}

control.agregarGasto("comida", 5000, mostrarExito, mostrarAlerta)
control.agregarGasto("comida", 500000, mostrarExito, mostrarAlerta)
