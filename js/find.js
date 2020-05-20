
function getSearchResults() {
    const search = document.querySelector("#inputBusqueda").value;
    fetch("https://api.giphy.com/v1/gifs/search?api_key=B1O58NCR8UnhN6Z5ZbVEUM65mivJ76ER&q=" + search +"&limit=24&offset=0&rating=R&lang=es")
    .then(function(respuesta){
        // detalle de la peticion
    return respuesta.json();
     })
    .then(function(respuestaJSON){
        // datos de la respuesta
        pintaBusqueda(respuestaJSON.data);
     })
    .catch(function(error){
        // datos del erros
    });
}

function pintaBusqueda(datosGIFs){
        const maqueta = '<div class="cajaGifs"><div class="barra-titulo con-boton"></div><img class="preview-gif" src=""/></div>';
        // recorrer datosGIFs
        const busqueda = document.querySelector("#busqueda");
        busqueda.innerHTML="";
        datosGIFs.forEach(function(gif){
            // para cada uno de ellos "montar" o crear una caja
            const div = document.createElement("div");
             div.innerHTML= maqueta;
            // rellenar el titulo
            div.querySelector(".barra-titulo").innerText = gif.title;
             // rellenar la imagen
             div.querySelector(".preview-gif").src= gif.images.original.url;
            // y añadir  a la seccion de tendencias 
            const busqueda = document.querySelector("#busqueda");
            busqueda.appendChild(div);
        });
    }
function cambioBusqueda() {
    
    const hoyTeSugerimos = document.querySelector("#sugerencias");
    hoyTeSugerimos.style.display ="none";
    const sectionTendencias = document.querySelector("#sectionTendencias");
    sectionTendencias.style.display ="none"; 
    const buscar = document.querySelector("#buscar");
    buscar.style.display ="block";
    document.getElementById("busquedas").innerText = "Busqueda: " + (document.querySelector("#inputBusqueda").value);
}
function busqueda() {
    const buttonBusqueda = document.querySelector("#buttonBusqueda");
    buttonBusqueda.addEventListener("click", getSearchResults);
    buttonBusqueda.addEventListener("click", cambioBusqueda);
    let inputBusqueda = document.querySelector("#inputBusqueda");
    inputBusqueda.addEventListener("keyup", function(event) {
        if (event.keyCode === 13) {
        event.preventDefault();
        buttonBusqueda.click();
        }
    });
}
busqueda();