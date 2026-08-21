// Temas: métodos funcionales de arrays (`map`, `filter`, `find`, `reduce`, `sort`)

const listaJuegos = [

    {
    id: 1,         
    titulo: "World of Warcraft",     
    plataforma: "PC",  
    genero: "MMORPG",   
    horas: 1200,      
    completado: false, 
    puntaje: 10,      
    },

    {
    id: 2,         
    titulo: "League of Legends",     
    plataforma: "PC",  
    genero: "MOBA",   
    horas: 4000,      
    completado: false, 
    puntaje: 8,      
    },

    {
    id: 3,         
    titulo: "FIFA 2027",     
    plataforma: "PS5",  
    genero: "Deporte",   
    horas: 700,      
    completado: true, 
    puntaje: 6,      
    },

    {
    id: 4,         
    titulo: "Call of Duty 3",     
    plataforma: "XBOX 360",  
    genero: "Shooter",   
    horas: 400,      
    completado: true, 
    puntaje: 4,      
    },

    {
    id: 5,         
    titulo: "Pokemon Esmeralda",     
    plataforma: "GAMEBOY ADVANCE",  
    genero: "RPG",   
    horas: 120,      
    completado: false, 
    puntaje: 3,      
    },

]

// 01. funcion agregarJuego (spead operator)
function agregarJuego(lista, juego) {
    const nuevaListaArray = [...lista, juego] // usamos spread operator para no mutar el array original.
    return nuevaListaArray
}
console.log(agregarJuego(listaJuegos, 
    {
    id: 6,         
    titulo: "Gran Turismo 5",     
    plataforma: "PS5",  
    genero: "MMORPG",   
    horas: 90,      
    completado: false, 
    puntaje: 6,      
    }
))

// 02. funcion marcarCompletado (map + spread operator)
function marcarCompletado(lista, id){
   const arrayCompletado = lista.map(juego => {
    if (juego.id === id){
        return {...juego, completado: true}
    } else {
        return juego
    }
   })
   return arrayCompletado
}
console.log(marcarCompletado(listaJuegos, 5))

// 03. Funcion filtar por plataforma (filter)
function filtrarPorPlataforma(lista, plataforma){
    return lista.filter(juego => juego.plataforma === plataforma )
}
console.log(filtrarPorPlataforma(listaJuegos, "PC"))

// 04. Funcion filtrar juegos completados (filter)
function filtrarCompletados(lista, completado){
    return lista.filter(juego => juego.completado === completado)
}
console.log(filtrarCompletados(listaJuegos, true))

// 05. Funcion buscar por titulo (filter + toLoweCase + includes)
function buscarPorTitulo(lista, texto){
    return lista.filter(juego => juego.titulo.toLowerCase().includes(texto.toLowerCase()))
}
console.log(buscarPorTitulo(listaJuegos, "fi"))

// 06. Ordenar por puntaje (sort + spread operator)
function ordenarPorPuntaje(lista){
    const arrayOrdenadoPorPuntaje = [...lista] // creamos una copia para no mutar el original
    return arrayOrdenadoPorPuntaje.sort((a,b) => b.puntaje - a.puntaje)
}
console.log("###### Punto 6 ######")
console.log(ordenarPorPuntaje(listaJuegos))

// 07. Ranking top 3 mejor puntaje (sort + spread operator + slice)
function top3(lista){
    return ordenarPorPuntaje(lista).slice(0,3)
}

console.log("### Ejercicio 7 ###")
console.log(top3(listaJuegos))

// 08. Horas totales (reduce)
function horasTotales(lista){
    return lista.reduce((acc, juego) => acc + juego.horas, 0)
}

console.log("### Ejercicio 8 ###")
console.log(horasTotales(listaJuegos))

