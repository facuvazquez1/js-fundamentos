/**
 * 04-apis / 03-fetch-avanzado.js
 *
 * Requiere Node 18+ (fetch nativo, sin instalar nada).
 * API de práctica: https://jsonplaceholder.typicode.com
 */

// Ejercicio 1 — medirSecuencial(): traé el post 1 y el post 2, uno
// después del otro (dos await seguidos, no en paralelo). Envolvé todo
// entre console.time("secuencial") y console.timeEnd("secuencial") para
// medir cuánto tarda.
async function medirSecuencial() {

    console.time("secuencial")

    const responseA = await fetch("https://jsonplaceholder.typicode.com/posts/1")
    const responseB = await fetch("https://jsonplaceholder.typicode.com/posts/2")

    console.log(responseA, responseB)

    console.timeEnd("secuencial")
}

// await medirSecuencial() // secuencial: 172.947ms

// Ejercicio 2 — medirParalelo(): los mismos post 1 y post 2, pero ahora
// usando Promise.all para que las dos requests salgan al mismo tiempo.
// Medí el tiempo igual que en el ejercicio 1, con console.time/timeEnd
// (usá otra etiqueta, por ejemplo "paralelo"). Compará los dos tiempos.
async function medirParalelo() {

    console.time("paralelo")

    
    const responseA = fetch("https://jsonplaceholder.typicode.com/posts/1")
    const responseB = fetch("https://jsonplaceholder.typicode.com/posts/2")

    // llamamos a todas las promesas en 1 solo llamado con await 
    const [resultA, resultB] = await Promise.all([responseA, responseB])
    console.log(resultA, resultB)

    console.timeEnd("paralelo")

}

// await medirParalelo() // paralelo: 165.808ms

// Ejercicio 3 — obtenerVariosPosts(ids): ids es un array de números
// (por ejemplo [1, 2, 3]). Armá un array de fetches con .map() y
// resolvelos todos juntos con Promise.all. Devolvé (return) el array
// con los datos ya parseados de cada post.
async function obtenerVariosPosts(ids) {

    const promesas = ids.map(id => fetch(`https://jsonplaceholder.typicode.com/posts/${id}`))

    const arrayDeResponse = await Promise.all(promesas) // [Response, Response, Response]
    
    const arrayDeDatos = await Promise.all(
        arrayDeResponse.map(response => response.json())
    );

    return arrayDeDatos
  
}

// console.log(await obtenerVariosPosts([1, 2, 3]))

// Ejercicio 4 — obtenerPostsYUsuarios(): traé /posts y /users EN
// PARALELO con Promise.all (son dos recursos independientes, no dependen
// uno del otro). Logueá cuántos posts y cuántos usuarios trajo cada uno.
async function obtenerPostsYUsuarios() {

    const responseA = fetch("https://jsonplaceholder.typicode.com/posts")
    const responseB = fetch("https://jsonplaceholder.typicode.com/users")

    // llamamos a todas las promesas en 1 solo llamado con await 
    const arrayDeResponse = await Promise.all([responseA, responseB])
    
    const arrayDeDatos = await Promise.all(
        arrayDeResponse.map(response => response.json())
    )

    const [posts, usuarios] = arrayDeDatos;

    return (`Post: ${posts.length}, Usuarios: ${usuarios.length}`)
  
}

console.log(await obtenerPostsYUsuarios())

// Ejercicio 5 — obtenerVariosPostsSeguro(ids): igual al ejercicio 3,
// pero usando Promise.allSettled en vez de Promise.all. Probalo con un
// array que incluya al menos un id inválido (por ejemplo [1, 2, 9999]).
// Recorré los resultados y logueá cuáles se cumplieron ("fulfilled") y
// cuáles fallaron ("rejected"), sin que un solo id malo tire abajo todo
// el resultado.
async function obtenerVariosPostsSeguro(ids) {
  // TODO
}

// Ejercicio 6 — Cierre: postsPorVariosUsuarios(userIds): userIds es un
// array de ids de usuario (por ejemplo [1, 2, 3]). Para cada uno, traé
// sus posts en paralelo (Promise.all + map sobre userIds, cada fetch a
// /posts?userId={id}), y logueá cuántos posts tiene cada usuario.
async function postsPorVariosUsuarios(userIds) {
  // TODO
}
