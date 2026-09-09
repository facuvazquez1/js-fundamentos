/**
 * 04-apis / 01-fetch-get.js
 *
 * Requiere Node 18+ (fetch nativo, sin instalar nada).
 * API de práctica: https://jsonplaceholder.typicode.com
 */

// Ejercicio 1 — Hacé fetch a /posts/1 y logueá el response directamente
// (todavía NO llames a .json()).
async function verResponseCruda() {
  await fetch("https://jsonplaceholder.typicode.com/posts/1")
    .then(resp => response.json())
    .then(data)
}

verResponseCruda()

// Ejercicio 2 — Fetch a /posts/1 y a /posts/9999. Logueá response.status
// y response.ok de cada uno por separado.
async function compararStatusYOk() {
  // TODO
}

// Ejercicio 3 — obtenerDatosDePost(id): fetch a /posts/{id}, devolver el
// objeto ya parseado con .json(). Asumí que el id siempre existe.
async function obtenerDatosDePost(id) {
  // TODO
}

// Ejercicio 4 — obtenerTodosLosPosts(): fetch a /posts, devolver el array
// completo. Loguear cuántos posts trajo.
async function obtenerTodosLosPosts() {
  // TODO
}

// Ejercicio 5 — detectarSiHuboError(id): fetch a /posts/{id}. Usando
// response.ok, loguear "Todo bien" o "Hubo un error: status X" según
// corresponda. Sin throw ni try/catch todavía. Probá con id=1 y id=9999.
async function detectarSiHuboError(id) {
  // TODO
}

// Ejercicio 6 — obtenerPostSeguro(id): mismo chequeo que el ejercicio 5,
// pero si no está ok hacé throw new Error(...) en vez de solo loguear.
// Si está ok, devolvé los datos parseados.
async function obtenerPostSeguro(id) {
  // TODO
}

// Ejercicio 7 — obtenerPostConManejoDeError(id): igual al ejercicio 6
// pero envuelto en try/catch, distinguiendo si el error vino de tu throw
// (status no-ok) o de una falla de red real.
async function obtenerPostConManejoDeError(id) {
  // TODO
}

// Ejercicio 8 — obtenerPostsDeUsuario(userId): GET a /posts?userId={userId}.
// Devolver el array. Sin manejo de error todavía.
async function obtenerPostsDeUsuario(userId) {
  // TODO
}

// Ejercicio 9 — obtenerPostsDeUsuarioSeguro(userId): igual al ejercicio 8
// pero con el mismo patrón de manejo de error de los ejercicios 6 y 7.
async function obtenerPostsDeUsuarioSeguro(userId) {
  // TODO
}

// Ejercicio 10 — resumenDeAutor(id): traer el post con obtenerPostSeguro(id),
// con su userId llamar a obtenerPostsDeUsuarioSeguro(userId), y loguear
// cuántos posts en total tiene ese usuario. Con try/catch general.
async function resumenDeAutor(id) {
  // TODO
}

// Llamados de prueba — anda descomentando a medida que completás
// verResponseCruda();
// compararStatusYOk();
// obtenerDatosDePost(1);
// obtenerTodosLosPosts();
// detectarSiHuboError(1);
// detectarSiHuboError(9999);
// obtenerPostSeguro(1);
// obtenerPostConManejoDeError(9999);
// obtenerPostsDeUsuario(2);
// obtenerPostsDeUsuarioSeguro(2);
// resumenDeAutor(1);