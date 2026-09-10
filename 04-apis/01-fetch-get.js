/**
 * 04-apis / 01-fetch-get.js
 *
 * Requiere Node 18+ (fetch nativo, sin instalar nada).
 * API de práctica: https://jsonplaceholder.typicode.com
 */

// Ejercicio 1 — Hacé fetch a /posts/1 y logueá el response directamente
// (todavía NO llames a .json()).
async function verResponseCruda() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts/1") // guardamos la respuesta de la promesa de la peticion GET, en la constante response.
    
    console.log(response)
  } catch (error) {
    console.log("Error:", error)
  }
}

// verResponseCruda() // devuelve el objeto response completo 

// Ejercicio 2 — Fetch a /posts/1 y a /posts/9999. Logueá response.status
// y response.ok de cada uno por separado.
async function compararStatusYOk() {

    const responsePost1 = await fetch("https://jsonplaceholder.typicode.com/posts/1")
    console.log(responsePost1.status) // response: 200 (tipo de fallo)
    console.log(responsePost1.ok) // response: true (se usa para saber rapidamente si continuamos con la respuesta o capturamos el error)
    

    const responsePost9999 = await fetch("https://jsonplaceholder.typicode.com/posts/9999")
    console.log(responsePost9999.status) // response: 404
    console.log(responsePost9999.ok) // response: false
}

// compararStatusYOk()

// Ejercicio 3 — obtenerDatosDePost(id): fetch a /posts/{id}, devolver el
// objeto ya parseado con .json(). Asumí que el id siempre existe.
async function obtenerDatosDePost(id) {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
  const postDatos = await response.json()
  console.log(postDatos)
}

// obtenerDatosDePost(5)

// Ejercicio 4 — obtenerTodosLosPosts(): fetch a /posts, devolver el array
// completo. Loguear cuántos posts trajo.
async function obtenerTodosLosPosts() {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts")
  const data = await response.json()
  const long = data.length
  console.log(`El array tiene ${long} posts: `)
  return data
}

// obtenerTodosLosPosts()

// Ejercicio 5 — detectarSiHuboError(id): fetch a /posts/{id}. Usando
// response.ok, loguear "Todo bien" o "Hubo un error: status X" según
// corresponda. Sin throw ni try/catch todavía. Probá con id=1 y id=9999.
async function detectarSiHuboError(id) {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
  if(!response.ok) {
    console.log(`Hubo un error: status ${response.status}`)
  } else {
    console.log("Todo bien")
  } 
}

// detectarSiHuboError(1) // Todo bien
// detectarSiHuboError(9999) // Hubo un error: status 404


// Ejercicio 6 — obtenerPostSeguro(id): mismo chequeo que el ejercicio 5,
// pero si no está ok hacé throw new Error(...) en vez de solo loguear.
// Si está ok, devolvé los datos parseados.
async function obtenerPostSeguro(id) {
try {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
 
  if(!response.ok){
      throw new Error(`Hubo un error: status ${response.status}`)
    } else {
      const data = await response.json()
      return data
    }
  } catch (error){
    if(error.message.includes("status")){
      console.log("Error: ", error)
    } else {
      console.log("Fetch failed")
    }
  }
}

// console.log(await obtenerPostSeguro(1))
// console.log( await obtenerPostSeguro(9999))



// Ejercicio 7 — obtenerPostConManejoDeError(id): igual al ejercicio 6
// pero envuelto en try/catch, distinguiendo si el error vino de tu throw
// (status no-ok) o de una falla de red real.
async function obtenerPostConManejoDeError(id) {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
  try{

  } catch {

  }
}

// Ejercicio 8 — obtenerPostsDeUsuario(userId): GET a /posts?userId={userId}.
// Devolver el array. Sin manejo de error todavía.
async function obtenerPostsDeUsuario(userId) {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
  const postUserId = await response.json()

  return postUserId
}

console.log( await obtenerPostsDeUsuario(2))

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

