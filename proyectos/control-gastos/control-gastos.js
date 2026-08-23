const presupuestos = {
    comida: 50000,
    transporte: 20000,
    ocio: 15000
}


function crearControldeGastos(presupuestos){

    let gastos = []

   function totalPorCategoria(categoria){
       return gastos.filter(gasto => gasto.categoria === categoria).reduce((acc, gastos))
   }
   
   

}

