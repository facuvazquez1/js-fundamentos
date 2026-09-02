const catalogo = [
    { id: 1, nombre: "Mouse", precio: 8000, stock: 15 },
    { id: 2, nombre: "Teclado", precio: 22000, stock: 8 },
    { id: 3, nombre: "Monitor", precio: 150000, stock: 3 },
    { id: 4, nombre: "Auriculares", precio: 18000, stock: 0 },
]

function consultarStock(productoId){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const producto = catalogo.find(producto => producto.id == productoId)
            if (producto){
                resolve(producto.stock)
            } else {
                reject("Producto no encontrado")
            }

        },500)
    })
}

consultarStock(2).then()


