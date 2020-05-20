function myGifo() {
    let arrayBlob = [];
    for(let index = 0; index < localStorage.length; index++) {              
        const localStorageItem = localStorage.getItem(localStorage.key(index));
        if(localStorageItem.indexOf("data:image/gif") === 0) {     
            arrayBlob.push(localStorageItem);
        }
    }
    let model = '<div id="contenedor" class="videoContainer"><img id="video" src="" class="video" alt="gif buscado"></div>';
    arrayBlob.forEach(function(blob) {
        const divCreation = document.createElement("div");
        divCreation.innerHTML = model;
        divCreation.querySelector("#video").src = blob;
        let gridIdTrend = document.querySelector("#regillaMisGif");
        gridIdTrend.appendChild(divCreation);
    });
}
myGifo();