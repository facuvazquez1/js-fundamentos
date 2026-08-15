# Proyecto: Backlog de Videojuegos

## Objetivo

Practicar métodos funcionales de arrays (`map`, `filter`, `find`, `reduce`, `sort`) resolviendo problemas reales sobre una lista de datos, sin usar `for` en ningún momento.

## Modelo de datos

Cada juego es un objeto con esta forma:

```js
{
  id,          // number, único
  titulo,      // string
  plataforma,  // string ("PC", "PS5", "Switch", etc.)
  genero,      // string
  horas,       // number (horas jugadas)
  completado,  // boolean
  puntaje      // number del 1 al 10 (0 si todavía no lo puntuaste)
}
```

## Semilla

Armá un array de 5-6 juegos cargados a mano para tener con qué probar cada función.

## Funciones a implementar

Todas reciben la lista como parámetro y **devuelven** un resultado nuevo (no imprimen adentro, salvo que quieras loguear para debuggear). Ninguna modifica el array ni los objetos originales.

1. **`agregarJuego(lista, juego)`** → nuevo array con el juego agregado al final.
2. **`marcarCompletado(lista, id)`** → nuevo array donde el juego con ese `id` pasa a `completado: true`, sin mutar el objeto original.
3. **`filtrarPorPlataforma(lista, plataforma)`** → solo los juegos de esa plataforma.
4. **`filtrarCompletados(lista, completado)`** → los juegos según su estado (`true` o `false`).
5. **`buscarPorTitulo(lista, texto)`** → juegos cuyo título contenga ese texto, ignorando mayúsculas/minúsculas (búsqueda parcial).
6. **`ordenarPorPuntaje(lista)`** → lista ordenada de mayor a menor puntaje, sin alterar el orden del array original.
7. **`top3(lista)`** → los 3 juegos con mejor puntaje.
8. **`horasTotales(lista)`** → total de horas jugadas sumando todos los juegos.

## Regla dura

Cero `for`, cero `push`/`splice` sobre el array o los objetos originales. Solo `map`, `filter`, `find`, `reduce`, `sort` y spread (`...`).

## Cómo encarar el trabajo

1. Empezá por `horasTotales` — es la más chica, sirve para agarrar la mano con `reduce`.
2. Seguí con `filtrarPorPlataforma` y `buscarPorTitulo` — son puro `filter`.
3. Recién después metete con `agregarJuego` y `marcarCompletado`, que exigen no mutar nada (usan spread).
4. `ordenarPorPuntaje` y `top3` al final — `top3` puede reutilizar `ordenarPorPuntaje`.
5. Después de cada función: corrés el archivo con `node backlog.js` y confirmás el resultado a mano antes de pasar a la siguiente.

## Pista clave para `reduce`

`reduce` recibe una función `(acumulador, elementoActual) => ...` y un valor inicial. En cada vuelta devolvés el nuevo acumulador. Pensá qué tipo de dato querés acumular (¿un número? ¿un array?) antes de escribir la función.

## Se considera terminado cuando

- Las 8 funciones devuelven lo esperado.
- Podés mostrar con dos `console.log` del array original antes y después que ninguna función lo modificó.
- Corriste todo con `node` y no hay errores en consola.
