/**
 * 04-apis / 02-fetch-post.js
 *
 * Requiere Node 18+ (fetch nativo, sin instalar nada).
 * API de práctica: https://jsonplaceholder.typicode.com
 *
 * Nota sobre esta API: es falsa/de prueba. Acepta POST/PUT/PATCH/DELETE
 * y responde como si los aplicara, pero no persiste nada de verdad
 * (si volvés a pedir el recurso con GET, va a seguir como estaba).
 */

// Ejercicio 1 — Hacé un POST a /posts con headers Content-Type: application/json
// y body: JSON.stringify({ title: "prueba", body: "contenido", userId: 1 }).
// Logueá el response directamente (sin .json() todavía). Fijate qué status
// devuelve (no es 200).
async function verResponseCrudaDePost() {
  try {

  // Creamos un post de prueba
  const newPost = {
    userId: 1,
    title: "Este es el titulo de mi post",
    body: "Este es el cuerpo de mi post"

  }

  const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(newPost) // transforma el objeto de js en JSON.
  })

  
  console.log(response)

  } catch(error) {
    console.log("Error:", error)
  }
}

verResponseCrudaDePost()

// Ejercicio 2 — Mismo POST que el ejercicio 1, pero ahora sí llamá a
// .json() y logueá qué te devolvió la API sobre el recurso "creado".
async function verRecursoCreado() {
  // TODO
}

// Ejercicio 3 — crearPost(titulo, contenido, userId): igual al anterior
// pero como función reutilizable, armando el body con esos tres parámetros.
// Devolvé (return) los datos parseados.
async function crearPost(titulo, contenido, userId) {
  
  
}

// Ejercicio 4 — actualizarPostCompleto(id, postNuevo): PUT a /posts/{id}.
// postNuevo es un objeto completo ({ title, body, userId }) que reemplaza
// el recurso entero. Devolvé los datos parseados.
async function actualizarPostCompleto(id, postNuevo) {
  // TODO
}

// Ejercicio 5 — actualizarPostParcial(id, camposActualizados): PATCH a
// /posts/{id}. camposActualizados es un objeto con solo los campos que
// cambian (por ejemplo, { title: "nuevo título" }). Devolvé los datos
// parseados.
async function actualizarPostParcial(id, camposActualizados) {
  // TODO
}

// Ejercicio 6 — eliminarPost(id): DELETE a /posts/{id}. No lleva body.
// Logueá response.status (JSONPlaceholder devuelve 200 con un objeto vacío).
async function eliminarPost(id) {
  // TODO
}

// Ejercicio 7 — crearPostSeguro(titulo, contenido, userId): mismo POST del
// ejercicio 3, pero con el mismo patrón de manejo de error que usaste en
// 01-fetch-get.js (if response.ok / throw / try-catch distinguiendo el
// tipo de error).
async function crearPostSeguro(titulo, contenido, userId) {
  // TODO
}

// Ejercicio 8 — Encadenar: creá un post con crearPostSeguro(...), logueá
// el id que te devolvió la API, y con ese id llamá a eliminarPost(id).
// Logueá el status de cada paso.
async function crearYEliminarPost() {
  // TODO
}

