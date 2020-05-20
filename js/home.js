function eventosBuscador(){
    // Inicializa los escuchadores de eventos del buscador
    // Cuando el usuario introduzca texto en la caja, habilitar el boton
    const inputBusqueda = document.querySelector("#inputBusqueda");
    inputBusqueda.addEventListener("input", function(evento){
        // habililitar el boton
        const buttonBusqueda = document.querySelector("#buttonBusqueda");

        if(evento.target.value ==="") {
            // si la caja de texto esta vacia, deshabilitar el boton
            buttonBusqueda.setAttribute("disabled", true);
        } else {
            // si no habilitarlo
            buttonBusqueda.removeAttribute("disabled");
        }
            
    });
}
// Inicio
eventosBuscador();

// preguntar a la API de Giphy por las tendencias
let sugerenciaBoton = "banderas";
function obtenerSugerencias(){

    fetch("https://api.giphy.com/v1/gifs/search?api_key=B1O58NCR8UnhN6Z5ZbVEUM65mivJ76ER&q="+sugerenciaBoton+"&limit=4&lang=en")
        .then(function(respuesta){
            // detalle de la peticion
        return respuesta.json();
         })
        .then(function(respuestaJSON){
            // datos de la respuesta
            pintaSugerencias(respuestaJSON.data);
         })
        .catch(function(error){
            // datos del erros
        });
}

obtenerSugerencias();

// Mostrar resultados en el seccion tendencias
function pintaSugerencias(datosGIFs){
    const maqueta = '<div id="sugerenciaGif" class="caja.gif"><div class="contieneTitulo"><div class="barra-tituloCerrar"></div><img class="cerrarGif" src="./assets/button3.svg" alt="cerrar"/></div><img class="preview-gif" src=""/><button onclick="cambiaSugerencia()" class="botonVerMas">Ver más…</button></div>';

    // recorrer datosGIFs
    datosGIFs.forEach(function(gif){
        // para cada uno de ellos "montar" o crear una caja

       
        const div = document.createElement("div");
 
         div.innerHTML= maqueta;
 
        // rellenar el titulo
        div.querySelector(".barra-tituloCerrar").innerText = gif.title;
 
         // rellenar la imagen
         div.querySelector(".preview-gif").src= gif.images.original.url;

        // y añadir  a la seccion de tendencias 
        const tendencias = document.querySelector("#hoyTeSugerimos");
        tendencias.appendChild(div);
        
    });
 
}

function cambiaSugerencia () {
    let arraySugerencias = ["gif", "gatos", "perros", "estrellas", "gracioso"];
    let index = (Math.floor(Math.random() * 5 + 0));
    sugerenciaBoton = arraySugerencias[index];
    let borraRejilla= document.querySelector("#hoyTeSugerimos");
    borraRejilla.parentNode.removeChild(borraRejilla);
    const maqueta = '<div class="contiene-gifs" id="hoyTeSugerimos"></div>';
    const div = document.createElement("div");
    div.innerHTML= maqueta;
    const tendencias = document.querySelector("#sugerencias");
    tendencias.appendChild(div);
    obtenerSugerencias();
}
