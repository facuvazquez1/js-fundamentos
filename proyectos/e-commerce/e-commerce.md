# Proyecto Integrador — Simulador de E-commerce (async)

## Objetivo

Combinar todo lo que practicaste en `03-async/` (callbacks, Promises, async/await,
Promise.all, manejo de errores) en un solo problema más grande: un simulador de
compra online con stock, carrito y checkout. No es un ejercicio aislado — cada
función depende de las anteriores, como en un flujo real.

## Temas que practicás

Promises con `setTimeout` · encadenamiento (`.then()` y `await`) · `Promise.all`
para operaciones en paralelo · `async/await` con `try/catch` · `reject(new Error(...))`
· validaciones con múltiples ramas de rechazo · diseño de funciones que se
componen entre sí.

## Modelo de datos

Un catálogo fijo de productos, por ejemplo:

```js
const catalogo = [
    { id: 1, nombre: "Mouse", precio: 8000, stock: 15 },
    { id: 2, nombre: "Teclado", precio: 22000, stock: 8 },
    { id: 3, nombre: "Monitor", precio: 150000, stock: 3 },
    { id: 4, nombre: "Auriculares", precio: 18000, stock: 0 },
]
```

Un carrito, simplemente un array de objetos `{ productoId, cantidad }` que
vas armando vos a mano en las pruebas manuales.

## Funciones mínimas

Todas devuelven Promises (salvo que se indique lo contrario) y simulan demora
con `setTimeout` — nada de esto pega a una API real todavía, eso viene en
`04-apis/`.

1. **`consultarStock(productoId)`** → Promise. Espera un tiempo corto (elegí
   vos, por ejemplo 500ms–1s). Resuelve con el número de unidades disponibles
   de ese producto según el catálogo. Si el `productoId` no existe en el
   catálogo, rechaza con `"Producto no encontrado"`.

2. **`verificarStockCarrito(carrito)`** → función `async`. Recibe el array del
   carrito y, usando `Promise.all` + `consultarStock`, consulta el stock de
   **todos los productos del carrito al mismo tiempo** (en paralelo, no en
   serie). Devuelve un array con el resultado de cada producto: si hay
   stock suficiente para la cantidad pedida o no.

3. **`calcularTotal(carrito)`** → función `async` (o `Promise`, a elección).
   Recibe el carrito, busca el precio de cada producto en el catálogo, y
   devuelve el total a pagar (precio × cantidad, sumado). No necesita
   `setTimeout`, es un cálculo local — pero mantenela como función `async`
   para practicar la sintaxis igual.

4. **`procesarPago(monto, metodoPago)`** → Promise. Espera 1 segundo. Si
   `monto <= 0`, rechaza con `reject(new Error("El monto debe ser mayor a 0"))`.
   Si `metodoPago` no es uno de `"tarjeta"`, `"transferencia"` o `"efectivo"`,
   rechaza con `reject(new Error("Método de pago inválido"))`. Si todo es
   válido, resuelve con un objeto `{ estado: "aprobado", monto, metodoPago }`.

5. **`realizarCheckout(carrito, metodoPago)`** → función `async` con
   `try/catch`. Esta es la función que **orquesta todo el flujo**:
   - Verifica el stock del carrito completo (función 2).
   - Si algún producto no tiene stock suficiente, corta el proceso y
     muestra qué producto falló — no debería intentar cobrar nada.
   - Si todo el stock está OK, calcula el total (función 3).
   - Procesa el pago con ese total (función 4).
   - Si todo salió bien, muestra un resumen: productos comprados, total,
     método de pago, estado del pago.
   - Cualquier error de cualquiera de los pasos anteriores se captura en
     un solo `catch` y se muestra de forma clara (usando `error.message`
     cuando corresponda).

## Orden sugerido para encarar el proyecto

No intentes escribir `realizarCheckout` primero. Andá de abajo hacia arriba:

1. `consultarStock` sola, probada con un par de `productoId` válidos y uno
   inválido.
2. `verificarStockCarrito` sola, con un carrito de prueba, confirmando que
   usa `Promise.all` (medí el tiempo con `console.time` si querés confirmar
   que corre en paralelo).
3. `calcularTotal` sola, con el mismo carrito de prueba.
4. `procesarPago` sola, probada con casos válidos e inválidos por separado.
5. Recién al final, `realizarCheckout`, combinando las cuatro anteriores.

## Casos de prueba mínimos para `realizarCheckout`

- Un carrito con stock suficiente y un método de pago válido → debería
  completar el checkout con éxito.
- Un carrito que incluye el producto `Auriculares` (stock 0) → debería
  cortar el proceso por falta de stock, sin llegar a `procesarPago`.
- Un carrito válido pero con un método de pago inválido (por ejemplo,
  `"criptomoneda"`) → debería fallar en `procesarPago`, mostrando el
  mensaje de error correspondiente.

## Terminado cuando

- Las 5 funciones existen, están probadas por separado, y `node` las corre
  sin errores.
- `realizarCheckout` maneja los 3 casos de prueba de la sección anterior,
  y en cada uno el mensaje que se ve por consola deja claro qué pasó y por qué.
- Ningún paso usa `throw` suelto dentro de un `setTimeout` — todo error
  viaja mediante `reject`.
- Podés explicar, sin mirar el código, por qué `verificarStockCarrito` usa
  `Promise.all` y no una serie de `await` uno atrás del otro.
