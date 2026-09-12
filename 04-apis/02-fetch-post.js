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
      body: "Este es el cuerpo de mi post",
    };

    const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPost), // transforma el objeto de js en JSON.
    });

    console.log(response);
  } catch (error) {
    console.log("Error:", error);
  }
}

// verResponseCrudaDePost()

// Ejercicio 2 — Mismo POST que el ejercicio 1, pero ahora sí llamá a
// .json() y logueá qué te devolvió la API sobre el recurso "creado".
async function verRecursoCreado() {
  try {
    // Creamos un post de prueba
    const newPost = {
      userId: 1,
      title: "Este es el titulo de mi post",
      body: "Este es el cuerpo de mi post",
    };

    const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPost), // transforma el objeto de js en JSON.
    });

    const data = await response.json();

    console.log(data);
  } catch (error) {
    console.log("Error:", error);
  }
}

// verRecursoCreado()

// Ejercicio 3 — crearPost(titulo, contenido, userId): igual al anterior
// pero como función reutilizable, armando el body con esos tres parámetros.
// Devolvé (return) los datos parseados.
async function crearPost(titulo, contenido, userId) {
  const newPost = {
    userId: userId,
    title: titulo,
    body: contenido,
  };

  const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newPost),
  });

  const data = await response.json();
  return data;
}

// console.log(await crearPost("titulo 1", "comentario", 1))

// Ejercicio 4 — actualizarPostCompleto(id, postNuevo): PUT a /posts/{id}.
// postNuevo es un objeto completo ({ title, body, userId }) que reemplaza
// el recurso entero. Devolvé los datos parseados.

const postNuevo = {
  userId: 4,
  title: "Titulo 4",
  body: "Comentario 4",
};

async function actualizarPostCompleto(id, postNuevo) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${id}`,
    {
      method: "PUT", // PUT reemplaza el recurso completo
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postNuevo),
    },
  );

  const data = await response.json();
  return data;
}

// console.log(await actualizarPostCompleto(1, postNuevo))

// Ejercicio 5 — actualizarPostParcial(id, camposActualizados): PATCH a
// /posts/{id}. camposActualizados es un objeto con solo los campos que
// cambian (por ejemplo, { title: "nuevo título" }). Devolvé los datos
// parseados.

const camposActualizados = {
  title: "titulo actualizado",
};

async function actualizarPostParcial(id, camposActualizados) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${id}`,
    {
      method: "PATCH", // PATCH: modifica solo lo que le mandás.
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(camposActualizados),
    },
  );

  const data = await response.json();
  return data;
}

// console.log(await actualizarPostParcial(2, camposActualizados))

// Ejercicio 6 — eliminarPost(id): DELETE a /posts/{id}. No lleva body.
// Logueá response.status (JSONPlaceholder devuelve 200 con un objeto vacío).

async function eliminarPost(id) {

  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${id}`,
    {
      method: "DELETE", // DELETE: le pide al servidor que elimine el recurso completo
      
    },
  );

  return response.status // chequeamos que status nos de vuelva un 200, esto confirma que la peticion DELETE se concreto con exito
}

// console.log(await eliminarPost(6))

// Ejercicio 7 — crearPostSeguro(titulo, contenido, userId): mismo POST del
// ejercicio 3, pero con el mismo patrón de manejo de error que usaste en
// 01-fetch-get.js (if response.ok / throw / try-catch distinguiendo el
// tipo de error).
async function crearPostSeguro(titulo, contenido, userId) {
  try{

    const postSeguro = {
      title: titulo,
      body: contenido,
      userId: userId   
    }


    const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(postSeguro)
    })

    if(!response.ok){
      throw new Error(`ERROR STATUS: ${response.status}`)
    }

    const data = await response.json()
    return {data, status: response.status}

  } catch(error){
    if(error.message.includes("ERROR STATUS")){
      return error.message
    } else {
      return ("ERROR DE CONEXION EN LA RED LOCAL")
    }
  }
}

// console.log(await crearPostSeguro("titulo 2", "comentario 2", 1))

// Ejercicio 8 — Encadenar: creá un post con crearPostSeguro(...), logueá
// el id que te devolvió la API, y con ese id llamá a eliminarPost(id).
// Logueá el status de cada paso.
async function crearYEliminarPost() {

    const crear = await crearPostSeguro("titulo 2", "comentario 2", 1)
    const data = crear
    console.log(data.data.id) // Resultado: 101
    console.log(data.status) // Resultado: 201

    const eliminar = await eliminarPost(data.data.id)
    console.log(eliminar) // Resultado: 200

}

crearYEliminarPost()
