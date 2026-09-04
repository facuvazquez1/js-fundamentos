const catalogo = [
    { id: 1, nombre: "Mouse", precio: 8000, stock: 15 },
    { id: 2, nombre: "Teclado", precio: 22000, stock: 8 },
    { id: 3, nombre: "Monitor", precio: 150000, stock: 3 },
    { id: 4, nombre: "Auriculares", precio: 18000, stock: 0 },
]

// --- ejercicio 1 ---
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
consultarStock(2)
    .then(stock => console.log(stock))
    .catch(error => console.log(error))

// --- ejercicio 2 ---

// Armamos un carrito de compras de prueba para simular una compra
// y verificar el stock disponible de los mismos.
const carritoPrueba = [
    {productoId: 1, cantidad: 5},
    {productoId: 2, cantidad: 3},
    {productoId: 4, cantidad: 1} // este id no tiene stock
]



async function verificarStockCarrito(carrito){

    const promesas = carrito.map(item => consultarStock(item.productoId))
    const stocks = await Promise.all(promesas)
}


