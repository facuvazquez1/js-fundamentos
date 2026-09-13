# Consigna — `proyectos/reportes-usuarios-api/`

> Integrador del módulo `04-apis/`. Combina GET, POST, manejo de errores y requests en paralelo. Todo contra JSONPlaceholder real, sin promises sintéticas.

---

## 1. Objetivo

Construir un set de funciones que arman "reportes" de usuarios combinando datos de dos endpoints, aplicando:

- GET con path param y con query param
- Manejo de error (`if (!response.ok) throw`) para recursos inexistentes
- Encadenado secuencial (una request depende de la anterior)
- Requests en paralelo con `Promise.all`
- Tolerancia a fallos con `Promise.allSettled`
- POST para crear un recurso

---

## 2. API y modelo de datos

**Base URL:** `https://jsonplaceholder.typicode.com`

| Endpoint | Método | Devuelve |
|---|---|---|
| `/users/:id` | GET | `{ id, name, username, email, ... }` |
| `/posts?userId=X` | GET | Array de `{ id, userId, title, body }` |
| `/posts` | POST | El objeto creado, con `id` nuevo (status `201`) |

IDs válidos en JSONPlaceholder: `1` a `10`. Cualquier otro id devuelve `404`.

---

## 3. Funciones (orden sugerido)

### 3.1 `obtenerUsuario(id)`
GET `/users/:id`. Si `!response.ok`, `throw new Error` con el status. Devuelve el objeto usuario.

### 3.2 `obtenerPostsDeUsuario(userId)`
GET `/posts?userId=X`. Devuelve el array de posts (puede ser `[]`, no es error).

### 3.3 `generarReporteUsuario(id)`
Encadena 3.1 y 3.2 **secuencial** (necesitás el usuario resuelto antes de pedir sus posts). Devuelve:

```js
{
  usuario: { id, name, email },
  cantidadPosts: number,
  titulos: string[] // sale de transformar el array de posts con map
}
```

### 3.4 `generarReportesDeUsuarios(ids)`
Mismo reporte que 3.3 pero para un array de ids, todos en **paralelo** con `Promise.all` sobre el array de promesas de `generarReporteUsuario`.

### 3.5 `generarReportesConTolerancia(ids)`
Igual que 3.4 pero con `Promise.allSettled`. Probar con algún id inválido a propósito (ej. `id: 999`). Separar el resultado en dos arrays: `exitosos` y `fallidos`.

### 3.6 `crearPost(userId, titulo, body)`
POST `/posts` con `headers: { "Content-Type": "application/json" }` y el `body` con `JSON.stringify`. Verificar `status === 201`.

### 3.7 `agregarPostYReporte(id, titulo, body)`
Llama a 3.6 y después vuelve a llamar a `generarReporteUsuario(id)` para mostrar el reporte "actualizado" (JSONPlaceholder no persiste de verdad, pero el flujo encadenado POST → GET es el punto del ejercicio).

---

## 4. Scaffold

```js
// obtenerUsuario: recibe un id, hace GET a /users/:id.
// Si la respuesta no es ok, tira un error con el status.
// Devuelve el objeto usuario.
async function obtenerUsuario(id) {

}

// obtenerPostsDeUsuario: recibe un userId, hace GET a /posts?userId=X.
// Devuelve el array de posts.
async function obtenerPostsDeUsuario(userId) {

}

// generarReporteUsuario: recibe un id, combina obtenerUsuario y
// obtenerPostsDeUsuario en secuencia. Devuelve { usuario, cantidadPosts, titulos }.
async function generarReporteUsuario(id) {

}

// generarReportesDeUsuarios: recibe un array de ids, arma los reportes
// en paralelo con Promise.all.
async function generarReportesDeUsuarios(ids) {

}

// generarReportesConTolerancia: igual que la anterior pero con
// Promise.allSettled. Devuelve { exitosos, fallidos }.
async function generarReportesConTolerancia(ids) {

}

// crearPost: recibe userId, titulo y body. Hace POST a /posts.
// Devuelve el objeto creado.
async function crearPost(userId, titulo, body) {

}

// agregarPostYReporte: crea un post con crearPost y devuelve el
// reporte actualizado del usuario.
async function agregarPostYReporte(id, titulo, body) {

}
```

---

