# Proyecto: Control de Gastos por Categoría

## Objetivo

Combinar closures y callbacks en un problema más grande: un sistema que registra gastos, los agrupa por categoría, mantiene un presupuesto oculto por categoría, y notifica mediante callbacks cuando pasa algo relevante (gasto agregado, presupuesto superado).

## Temas que combina

- Closures (estado protegido, no accesible directamente desde afuera)
- Callbacks (funciones que se ejecutan cuando ocurre un evento)
- Métodos funcionales de arrays (`reduce`, `filter`, `find`) del bloque anterior

## Consigna

Creá una función `crearControlDeGastos(presupuestos)` que reciba un objeto con el presupuesto máximo por categoría, por ejemplo:

```js
const presupuestos = {
    comida: 50000,
    transporte: 20000,
    ocio: 15000
}
```

Esa función debe devolver un objeto con las siguientes funciones:

### 1. `agregarGasto(categoria, monto, callbackExito, callbackPresupuestoSuperado)`

Registra un gasto dentro de la categoría indicada (guardado en un array interno, oculto por closure — no accesible directamente desde afuera del objeto devuelto).

- Si el gasto se agrega sin problema (no supera el presupuesto de esa categoría), ejecuta `callbackExito` con un mensaje indicando el gasto agregado y el total gastado hasta ahora en esa categoría.
- Si el gasto agregado hace que el total de esa categoría **supere** su presupuesto, ejecuta en cambio `callbackPresupuestoSuperado` con un mensaje de advertencia, indicando por cuánto se pasó.
- El gasto se agrega igual en ambos casos (no se "rechaza"), solo cambia qué callback se ejecuta para avisar.

### 2. `totalPorCategoria(categoria)`

Devuelve el total gastado en una categoría específica, sumando todos los gastos registrados ahí (usá `reduce`).

### 3. `totalGeneral()`

Devuelve el total gastado sumando todas las categorías juntas.

### 4. `gastosPorCategoria(categoria)`

Devuelve un array con todos los gastos individuales registrados en esa categoría (usá `filter` si guardás todo en un solo array interno, o accedé directo si separás por categoría — a tu criterio).

## Modelo de datos sugerido

Podés guardar los gastos como un array de objetos:

```js
{ categoria, monto }
```

O como un objeto donde cada clave es una categoría y el valor es un array de montos — cualquiera de los dos enfoques es válido, elegí el que te resulte más cómodo de manejar con `reduce`/`filter`.

## Cómo encarar el trabajo

1. Empezá por la estructura básica del closure: `crearControlDeGastos` con su array/objeto interno oculto, y las funciones `totalPorCategoria`/`totalGeneral` primero (son puro `reduce`, sin la parte de callbacks todavía).
2. Después sumá `gastosPorCategoria` con `filter`.
3. Recién al final agregá `agregarGasto` con la lógica de los dos callbacks — es la función más compleja, dejala para cuando lo demás ya funcione y puedas probarlo con datos ya cargados.
4. Probá con al menos 5-6 gastos distintos, algunos que superen el presupuesto y otros que no, para confirmar que se dispara el callback correcto en cada caso.

## Se considera terminado cuando

- Las 4 funciones devuelven/ejecutan lo esperado.
- El estado interno (gastos, presupuestos) no es accesible directamente desde afuera del objeto devuelto (por ejemplo, no hay forma de hacer `control.gastos.push(...)` a mano, todo pasa por `agregarGasto`).
- Probaste con datos que sí superan el presupuesto de alguna categoría y confirmaste que se ejecuta `callbackPresupuestoSuperado` en vez de `callbackExito`.
- Corriste todo con `node` sin errores.
