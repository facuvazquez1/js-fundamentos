# Teoría — Módulo 04: APIs

Documento de referencia para todo el tramo de `04-apis/`. Pensado para consultar rápido mientras resolvés los ejercicios, no para leer de corrido.

## Índice

1. [Conceptos base](#1-conceptos-base)
2. [HTTP en resumen](#2-http-en-resumen)
3. [fetch() — la herramienta base](#3-fetch--la-herramienta-base)
4. [JSON: mandar y recibir](#4-json-mandar-y-recibir)
5. [async/await + fetch](#5-asyncawait--fetch)
6. [Requests múltiples](#6-requests-múltiples)
7. [Query params vs path params](#7-query-params-vs-path-params)
8. [Glosario](#8-glosario)
9. [Errores comunes (checklist)](#9-errores-comunes-checklist)
10. [Roadmap del módulo](#10-roadmap-del-módulo)

---

## 1. Conceptos base

Una **API** (Application Programming Interface) es un punto de contacto expuesto por un servidor para que otros programas le pidan o le manden datos, sin acceso directo a su base de datos ni su código interno.

Una **API REST** es un estilo de API que organiza esos datos como **recursos** (posts, users, productos) y usa URLs + métodos HTTP para operar sobre ellos.

Modelo mental:

```
Cliente (tu código con fetch)  --- request --->  Servidor (la API)
Cliente                        <--- response ---  Servidor
```

- **Request**: lo que vos mandás (método, URL, headers, a veces body)
- **Response**: lo que el servidor te devuelve (status, headers, body — normalmente JSON)
- **Endpoint**: una URL específica que expone una operación (`/posts`, `/posts/1`, `/users/3/posts`)

---

## 2. HTTP en resumen

### Métodos

| Método | Para qué se usa | ¿Lleva body? |
|---|---|---|
| `GET` | Leer/obtener datos | No |
| `POST` | Crear un recurso nuevo | Sí |
| `PUT` | Reemplazar un recurso completo | Sí |
| `PATCH` | Modificar parcialmente un recurso | Sí |
| `DELETE` | Eliminar un recurso | No (normalmente) |

### Códigos de estado

| Rango | Significado | Ejemplos que vas a ver seguido |
|---|---|---|
| 2xx | Éxito | `200` OK, `201` Created |
| 4xx | Error del cliente (vos mandaste algo mal) | `400` Bad Request, `401` Unauthorized, `404` Not Found |
| 5xx | Error del servidor | `500` Internal Server Error |

### Headers que vas a usar ahora

- `Content-Type: application/json` — le decís al servidor que el body que mandás es JSON. Obligatorio en POST/PUT/PATCH con body JSON.
- `Authorization` — para APIs que requieren autenticación (lo vas a ver más adelante, no hace falta en JSONPlaceholder).

---

## 3. fetch() — la herramienta base

`fetch(url, opciones)` devuelve una **Promise** que resuelve con un objeto `Response`.

**GET (caso simple, sin segundo argumento):**

```js
const response = await fetch("https://api.ejemplo.com/recurso");
```

**POST / PUT / PATCH / DELETE (con opciones):**

```js
const response = await fetch("https://api.ejemplo.com/recurso", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ clave: "valor" }),
});
```

### El objeto `Response`

| Propiedad/método | Qué es |
|---|---|
| `response.ok` | `true` si el status es 2xx, `false` en cualquier otro caso |
| `response.status` | El código numérico (200, 404, etc.) |
| `response.json()` | Devuelve una Promise que resuelve al body parseado como objeto/array JS |
| `response.text()` | Igual pero como string plano (para APIs que no devuelven JSON) |

### ⚠️ El gotcha más importante del módulo

`fetch` **solo rechaza la Promise si falla la red** (sin conexión, DNS caído, timeout). Un 404 o un 500 **no** hacen que la Promise se rechace — la Promise resuelve normalmente, con `response.ok === false`.

```js
// MAL — esto nunca detecta un 404
try {
  const response = await fetch(url);
  const data = await response.json(); // puede fallar acá con un error confuso
} catch (error) {
  console.log("nunca voy a entrar acá por un 404");
}

// BIEN
const response = await fetch(url);
if (!response.ok) {
  throw new Error(`Error ${response.status}: no se pudo obtener el recurso`);
}
const data = await response.json();
```

---

## 4. JSON: mandar y recibir

Ya usaste esto en objetos sueltos; ahora se conecta directo con fetch:

- **Mandar datos** (POST/PUT): tu objeto JS → `JSON.stringify(objeto)` → va como `body`
- **Recibir datos**: el body de la response (texto) → `response.json()` → objeto/array JS

```js
// Mandar
body: JSON.stringify({ titulo: "Hola", userId: 1 })

// Recibir
const data = await response.json(); // ya es un objeto JS, no necesitás parsear nada más
```

---

## 5. async/await + fetch

El patrón estándar que vas a repetir en casi todos los ejercicios:

```js
async function obtenerRecurso(id) {
  try {
    const response = await fetch(`https://api.ejemplo.com/recurso/${id}`);
    if (!response.ok) {
      throw new Error(`Error ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Falló la request:", error.message);
    throw error; // o devolver algo, según el ejercicio
  }
}
```

Dos categorías de error distintas, y las dos importan:

- **Error de red** → cae en el `catch` automáticamente (fetch rechazó la Promise)
- **Error HTTP** (404, 500) → **vos** lo detectás con `if (!response.ok)` y lo convertís en excepción con `throw`

---

## 6. Requests múltiples

### Secuencial (una request depende de la anterior o simplemente las hacés una tras otra)

```js
const post = await obtenerPost(1);
const usuario = await obtenerUsuario(post.userId); // espera a que termine la anterior
```

### Paralelo (las requests son independientes entre sí)

```js
const [posts, usuarios] = await Promise.all([
  obtenerTodosLosPosts(),
  obtenerTodosLosUsuarios(),
]);
```

Usá paralelo cuando el resultado de una request **no** depende de otra — es más rápido porque no esperás en fila.

### Promise.allSettled (mención breve)

Si alguna request puede fallar y no querés que tire abajo todo el `Promise.all`, existe `Promise.allSettled`, que devuelve el resultado de cada una (éxito o error) sin cortar las demás. Lo vas a necesitar si algún ejercicio pide "traer lo que se pueda, ignorar lo que falle".

---

## 7. Query params vs path params

- **Path param**: forma parte de la URL, identifica un recurso puntual → `/posts/1` (el post con id 1)
- **Query param**: va después del `?`, filtra o modifica el pedido → `/posts?userId=1` (todos los posts del usuario 1)

```js
// Path param
fetch(`https://api.ejemplo.com/posts/${id}`);

// Query param
fetch(`https://api.ejemplo.com/posts?userId=${userId}`);

// Varios query params
fetch(`https://api.ejemplo.com/posts?userId=${userId}&_limit=5`);
```

---

## 8. Glosario

| Término | Significado |
|---|---|
| Endpoint | URL específica que expone una operación de la API |
| Payload / body | Los datos que viajan en la request (POST/PUT) o en la response |
| Header | Metadato de la request/response (tipo de contenido, auth, etc.) |
| Query string | La parte de la URL después del `?` (`?userId=1&_limit=5`) |
| Status code | Número que indica el resultado de la request (200, 404, 500...) |
| JSON | Formato de texto para intercambiar datos estructurados |
| CORS | Restricción de seguridad del **navegador**. No aplica corriendo con `node`, solo importa cuando hagas fetch desde el browser (fase DOM) |

---

## 9. Errores comunes (checklist)

Cuando algo no ande, revisá en este orden:

1. ¿Te olvidaste el `await` antes de `fetch(...)` o antes de `.json()`?
2. ¿Estás chequeando `response.ok` antes de asumir que la respuesta es válida?
3. Si es POST/PUT: ¿pusiste `headers: { "Content-Type": "application/json" }`?
4. Si es POST/PUT: ¿el `body` pasó por `JSON.stringify()` (no mandaste el objeto crudo)?
5. ¿Confundiste un query param con un path param en la URL?
6. ¿La función es `async` pero te olvidaste de ponerle `async` al declararla?

---

## 10. Roadmap del módulo

| Archivo | Qué cubre | Secciones de este doc |
|---|---|---|
| `01-fetch-get.js` | GET, `response.ok`, `.json()`, manejo de error básico | 2, 3, 5 |
| `02-fetch-post.js` | POST/PUT, headers, body, `JSON.stringify` | 3, 4, 7 |
| `03-fetch-avanzado.js` | Requests en paralelo, manejo de error por request, reintentos | 6 |
| Integrador (`proyectos/`) | Todo lo anterior combinado | 1–9 |

**API de práctica:** [JSONPlaceholder](https://jsonplaceholder.typicode.com) — gratis, sin auth. Recursos principales: `/posts`, `/users`, `/comments`.

---

Si algo de acá no queda claro en el momento de resolver un ejercicio, avisame y lo bajamos a un archivo de práctica aislado antes de seguir — no hace falta que te trabes.
