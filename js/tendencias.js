
function obtenerTendencias(){
    fetch("https://api.giphy.com/v1/gifs/trending?api_key=B1O58NCR8UnhN6Z5ZbVEUM65mivJ76ER&limit=12&rating=G")
        .then(function(respuesta){
            // detalle de la peticion
        return respuesta.json();
         })
        .then(function(respuestaJSON){
            // datos de la respuesta
            pintaTendencias(respuestaJSON.data);
         })
        .catch(function(error){
            // datos del erros
        });
}

obtenerTendencias();

// Mostrar resultados en el seccion tendencias
function pintaTendencias(datosGIFs){
    const maqueta = '<div class="caja.gif"><div class="barra-titulo con-boton"></div><img class="preview-gif" src=""/></div>';

    // recorrer datosGIFs
    datosGIFs.forEach(function(gif){
        // para cada uno de ellos "montar" o crear una caja

       
        const div = document.createElement("div");
 
         div.innerHTML= maqueta;
 
        // rellenar el titulo
        div.querySelector(".barra-titulo").innerText = gif.title;
 
         // rellenar la imagen
         div.querySelector(".preview-gif").src= gif.images.original.url;

        // y añadir  a la seccion de tendencias 
        const tendencias = document.querySelector("#tendencias");
         tendencias.appendChild(div);
        
    });
 
}
