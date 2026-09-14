// obtenerUsuario: recibe un id, hace GET a /users/:id.
// Si la respuesta no es ok, tira un error con el status.
// Devuelve el objeto usuario.
async function obtenerUsuario(id) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/users/${id}`,
  );

  if (!response.ok) {
    throw new Error(`ERROR STATUS: ${response.status}`);
  }

  const data = await response.json();
  return data;
}

// // console.log(await obtenerUsuario(1)) // Resultado: objeto completo del id 1
// try {
//   console.log(await obtenerUsuario(11)); // ERROR STATUS: 404
// } catch (error) {
//   console.log(error.message);
// }

// obtenerPostsDeUsuario: recibe un userId, hace GET a /posts?userId=X.
// Devuelve el array de posts.

async function obtenerPostsDeUsuario(userId) {

    const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)

    if (!response.ok) {
        throw new Error(`ERROR STATUS: ${response.status}`);
    }

    const data = await response.json()
    return data

}
// console.log(await obtenerPostsDeUsuario(1))

// generarReporteUsuario: recibe un id, combina obtenerUsuario y
// obtenerPostsDeUsuario en secuencia. Devuelve { usuario, cantidadPosts, titulos }.
async function generarReporteUsuario(id) {

    const responseA = await obtenerUsuario(id)
    const responseB = await obtenerPostsDeUsuario(id)

    

    return ({
        usuario: {id: responseA.id, name: responseA.name, email: responseA.email},
        cantidadPosts: responseB.length,
        titulos: responseB.map(post => post.title) 
    })

}

// console.log(await generarReporteUsuario(1))

// generarReportesDeUsuarios: recibe un array de ids, arma los reportes
// en paralelo con Promise.all.
async function generarReportesDeUsuarios(ids) {

    const reportes = ids.map(id => generarReporteUsuario(id))

    const datos = await Promise.all(reportes)

    return datos
    

}

// console.log( await generarReportesDeUsuarios([1, 2, 3]))

// generarReportesConTolerancia: igual que la anterior pero con
// Promise.allSettled. Devuelve { exitosos, fallidos }.
async function generarReportesConTolerancia(ids) {

    const reportes = ids.map(id => generarReporteUsuario(id))

    const datos = await Promise.allSettled(reportes)
    
    const exitosos = datos.filter(reporte => reporte.status === "fulfilled").map(report => report.value)

    const fallidos = datos.filter(reporte => reporte.status === "rejected").map(report => report.reason)

    return {exitosos, fallidos}

}

// console.log(await generarReportesConTolerancia([1, 2, 9999])) 


// crearPost: recibe userId, titulo y body. Hace POST a /posts.
// Devuelve el objeto creado.
async function crearPost(userId, titulo, body) {
    
    const newPost = {
        userId: userId,
        title: titulo,
        body: body
    }

    const response = await fetch(`https://jsonplaceholder.typicode.com/posts`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newPost)
    })

    if(!response.ok){
        throw new Error(`STATUS ERROR ${response.status}`)
    }

    const data = await response.json()

    return data

}

// console.log(await crearPost(1, "titulo", "body"))

// agregarPostYReporte: crea un post con crearPost y devuelve el
// reporte actualizado del usuario.
async function agregarPostYReporte(id, titulo, body) {

    const newPost = await crearPost(id, titulo, body)
    const newReport = await generarReporteUsuario(id)

    return newReport
}

console.log(await agregarPostYReporte(2, "titulo22", "body22"))

