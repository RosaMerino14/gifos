function start () {
    //añadir un evento al elemento que tiene este ide #selectCambioTema
    // para que caundo cambie de valor, cambie el tema de  la pagina
    const selectCambioTema = document.querySelector("#selectCambioTema");
    selectCambioTema.addEventListener("input", event => {
        cambioTema(event.target.value);
    });
}
//vamos a ver si hay alguna preferencia guardada en localStorage
if(localStorage.getItem("theme")){
    cambioTema(localStorage.getItem("theme"));
}

function cambioTema(tema) {
    // necesito saber que option han elegido
    // si ha elegido "oscuro":
    if(tema === "oscuro") {
        // tengo que añadir el class oscuro al body
        // buscar el nodo del body
        //añadir el class "oscuro"
        document.body.classList.add("oscuro");
    } else if (tema === "claro") {
        //si ha elegido "claro":
        //quitar  el class "oscuro" del body
        document.body.classList.remove("oscuro");
    }
    //lo guardo en localStorage para que persista
    localStorage.setItem("theme", tema);
}