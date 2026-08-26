# Teoría — Unidad 03: Async

> Documento de consulta. No reemplaza la práctica: es para volver cuando te trabas en un ejercicio o querés repasar cómo se hace algo.

---

## 1. Por qué existe la asincronía

JavaScript es **single-threaded**: ejecuta una sola cosa a la vez, en orden, línea por línea (código síncrono).

El problema: hay operaciones que tardan (esperar una respuesta de red, un timer, leer un archivo). Si JS se quedara "trabado" esperando esas operaciones, toda la página se congelaría mientras tanto.

La solución: esas operaciones se delegan a otro lugar (el navegador o Node.js) mientras el resto del código sigue ejecutándose. Cuando la operación termina, su resultado "vuelve" a JS para ser procesado. Eso es asincronía.

```js
console.log("1")
setTimeout(() => console.log("2"), 1000)
console.log("3")

// Salida: 1, 3, 2  (no 1, 2, 3)
```

---

## 2. El Event Loop

Es el mecanismo que hace posible la asincronía en JS. Tiene 3 piezas clave:

1. **Call Stack** (pila de ejecución): donde corre el código síncrono, una función arriba de otra.
2. **Web APIs / Node APIs**: donde se delegan las tareas asíncronas (`setTimeout`, `fetch`, etc.) mientras se ejecutan "por fuera" de JS.
3. **Task Queue / Microtask Queue**: colas donde esperan los callbacks/resultados de esas tareas, listos para volver al Call Stack.

### Flujo

1. El código síncrono corre y llena el Call Stack.
2. Si aparece una operación asíncrona, se manda a las Web APIs / Node APIs y JS sigue con la siguiente línea.
3. Cuando esa operación termina, su callback (o resultado) se coloca en una cola (Task Queue o Microtask Queue).
4. El Event Loop revisa constantemente: **si el Call Stack está vacío**, toma lo primero de la cola y lo mete al Call Stack para ejecutarlo.
5. Se repite.

### Dos colas, no una

- **Microtask Queue**: Promises (`.then`, `.catch`, `.finally`), `async/await`.
- **Task Queue** (o "macrotask queue"): `setTimeout`, `setInterval`, eventos del DOM.

**Regla clave: la Microtask Queue se vacía completa antes de que el Event Loop toque la Task Queue**, incluso si un `setTimeout` tiene 0ms.

```js
console.log("Inicio")
setTimeout(() => console.log("setTimeout"), 0)
Promise.resolve().then(() => console.log("Promise"))
console.log("Fin")

// Salida: Inicio, Fin, Promise, setTimeout
```

---

## 3. Callbacks

Un callback es simplemente **una función que se pasa como argumento a otra función**, para que esta la ejecute en algún momento (generalmente cuando termina una tarea).

```js
function saludar(nombre, callback) {
    setTimeout(() => {
        callback(`Hola, ${nombre}`)
    }, 1000)
}

saludar("Facu", (mensaje) => console.log(mensaje))
```

### Patrón error-first (muy usado en Node)

Convención: el callback recibe primero el error (o `null` si no hubo) y después el dato.

```js
function obtenerUsuario(id, callback) {
    setTimeout(() => {
        if (id <= 0) {
            callback("ID inválido", null)
        } else {
            callback(null, { id, nombre: "Usuario " + id })
        }
    }, 1000)
}

obtenerUsuario(5, (error, data) => {
    if (error) {
        console.log("Error:", error)
        return
    }
    console.log(data)
})
```

### El problema: Callback Hell

Cuando una tarea asíncrona depende del resultado de otra, y esa de otra, los callbacks se anidan cada vez más:

```js
paso1(() => {
    paso2(() => {
        paso3(() => {
            console.log("Todo terminado")
        })
    })
})
```

Esto crece hacia la derecha ("pyramid of doom"), es difícil de leer, y manejar errores en cada nivel es tedioso. **Este problema es la razón por la que existen las Promises.**

---

## 4. Promises

Una Promise es un objeto que representa **el resultado futuro** de una operación asíncrona. Tiene 3 estados posibles:

- **pending**: todavía no se resolvió ni rechazó.
- **fulfilled**: se resolvió con éxito.
- **rejected**: falló.

Una vez que pasa a fulfilled o rejected, queda fija para siempre (no puede cambiar de estado de nuevo).

### Crear una Promise

```js
const promesa = new Promise((resolve, reject) => {
    setTimeout(() => {
        const ok = true
        if (ok) {
            resolve("Operación exitosa")
        } else {
            reject("Se produjo un error")
        }
    }, 1000)
})
```

- `resolve(valor)` → pasa la promesa a `fulfilled` con ese valor.
- `reject(motivo)` → pasa la promesa a `rejected` con ese motivo.

### Consumir una Promise

```js
promesa
    .then(resultado => {
        console.log(resultado) // se ejecuta si resolve()
    })
    .catch(error => {
        console.log(error) // se ejecuta si reject()
    })
    .finally(() => {
        console.log("Esto corre siempre, haya éxito o error")
    })
```

### Encadenamiento (chaining)

Cada `.then()` devuelve una nueva Promise, por eso se pueden encadenar en lugar de anidar — esto es lo que resuelve el Callback Hell:

```js
function paso1Promise() {
    return new Promise(resolve => {
        setTimeout(() => {
            console.log("Paso 1 completado")
            resolve()
        }, 1000)
    })
}

paso1Promise()
    .then(paso2Promise)
    .then(paso3Promise)
    .then(() => console.log("Todo terminado"))
    .catch(error => console.log("Error en algún paso:", error))
```

Con `.catch()` al final alcanza para capturar el error de **cualquier** paso anterior en la cadena — no hace falta un catch por paso.

### Combinadores de Promises

- **`Promise.all([p1, p2, p3])`**: espera a que todas terminen. Si **una** falla, todo el `Promise.all` rechaza inmediatamente. Devuelve un array con los resultados en el mismo orden.
- **`Promise.allSettled([p1, p2, p3])`**: espera a que todas terminen (con éxito o error) y devuelve el resultado de cada una, sin rechazar nunca.
- **`Promise.race([p1, p2, p3])`**: se resuelve/rechaza apenas la **primera** promesa termina, ignora el resto.

```js
Promise.all([tarea1(), tarea2(), tarea3()])
    .then(resultados => console.log("Todas terminaron", resultados))
    .catch(error => console.log("Alguna falló", error))
```

---

## 5. Async/Await

Es **azúcar sintáctica sobre Promises**: mismo mecanismo por debajo, pero se escribe pareciendo código síncrono. No es una tecnología distinta, es otra forma de consumir Promises.

### Reglas base

- `await` solo se puede usar **dentro de una función `async`**.
- `await` pausa la ejecución de esa función (no de todo el programa) hasta que la Promise se resuelva o rechace.
- Una función `async` **siempre devuelve una Promise**, aunque el `return` sea un valor normal.

```js
function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

async function proceso() {
    console.log("Inicio")
    await wait(1000)
    console.log("Pasaron 1000ms")
    await wait(500)
    console.log("Pasaron 500ms más")
}

proceso()
```

### Manejo de errores con try/catch

Con `async/await`, el manejo de errores vuelve a ser el clásico `try/catch` en vez de `.catch()`:

```js
async function obtenerUsuario(id) {
    try {
        const data = await llamadaQueDevuelvePromise(id)
        console.log(data)
    } catch (error) {
        console.log("Error:", error)
    } finally {
        console.log("Se ejecuta siempre")
    }
}
```

### Comparación directa: mismo problema, 3 formas

```js
// --- Callback ---
function getUser(id, callback) {
    setTimeout(() => callback(null, { id }), 1000)
}
getUser(1, (error, data) => console.log(data))

// --- Promise ---
function getUserPromise(id) {
    return new Promise(resolve => {
        setTimeout(() => resolve({ id }), 1000)
    })
}
getUserPromise(1).then(data => console.log(data))

// --- Async/Await ---
async function getUserAsync(id) {
    const data = await getUserPromise(id)
    console.log(data)
}
getUserAsync(1)
```

### Error común: olvidar el `await`

Si te olvidás el `await`, no obtenés el resultado sino la Promise sin resolver:

```js
async function mal() {
    const data = getUserPromise(1) // ❌ falta await
    console.log(data) // Promise { <pending> }
}

async function bien() {
    const data = await getUserPromise(1) // ✅
    console.log(data) // { id: 1 }
}
```

### Ejecutar en paralelo con async/await

Si dos `await` no dependen entre sí, poner uno atrás del otro los ejecuta **en serie** (más lento de lo necesario). Para paralelizarlos, se combina con `Promise.all`:

```js
// Serie (más lento): espera tarea1, RECIÉN AHÍ arranca tarea2
const r1 = await tarea1()
const r2 = await tarea2()

// Paralelo (más rápido): ambas arrancan al mismo tiempo
const [r1, r2] = await Promise.all([tarea1(), tarea2()])
```

---

## 6. Errores comunes / puntos de confusión

- **`setTimeout(fn, 0)` no ejecuta `fn` inmediatamente.** Igual espera a que el Call Stack esté vacío y a que se vacíe la Microtask Queue.
- **Una función `async` sin `await` adentro no tiene sentido** — sigue devolviendo una Promise, pero no está esperando nada async realmente.
- **`.then()` después de un `.catch()`** sigue ejecutándose (el catch "recupera" la cadena, no la corta).
- **Un `throw` dentro de una función `async` es equivalente a un `reject`** — lo captura el `catch` de quien la llama (o el `.catch()` si la consumís con `.then`).
- **No confundir el error de sintaxis con el de lógica**: si te olvidás `await`, no da error — el código corre igual, pero con el valor incorrecto (una Promise en vez del dato).

---

## 7. Orden de este documento vs. orden de los ejercicios

Esta guía sigue el mismo orden que los archivos de `03-async/`:

1. `01-callbacks.js` → Sección 3
2. `02-promises.js` → Sección 4
3. `03-async-await.js` → Sección 5
4. Ejercicios integradores que combinan las 3 formas → todo lo anterior + Sección 6
