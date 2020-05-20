let previo = null;
let enlaceURL = null;
function getStreamAndRecord () { 
      navigator.mediaDevices.getUserMedia({  
        audio: false,  
        video: {   
          height: { max: 480 }  
        }
      })
      .then(function(stream) { 
        console.log("comienza stream")
      const video = document.querySelector("#videoCaja");
      video.srcObject = stream;
      video.play();
      let recorder = RecordRTC(stream, { 
        type: 'gif',    
        frameRate: 1,     
        quality: 10,    
        width: 360,   
        hidden: 240, 
        onGifRecordingStarted: function() {    
              console.log('ha empezado la grabacion');
        },  
      }); 
      function comenzarGrabar(){
        recorder.startRecording();
      }
      function pararGrabacion() {
        recorder.stopRecording(function (grabacion) {
              console.log('ha parado la grabacion');
              document.querySelector("#resultado").src= grabacion;
              console.log("grabacion parada");
              previo = grabacion;
        });
      }
      function subirGif() {
              const form = new FormData();
              form.append("api_key", "B1O58NCR8UnhN6Z5ZbVEUM65mivJ76ER");
              form.append("file", recorder.getBlob());

              let blob = form.get("file");
              enlaceURL = URL.createObjectURL(blob);
              localStorage.setItem("url", enlaceURL);
              function convertirGif() {
                  const toDataURL = url => fetch(url)
                      .then(response => response.blob())
                      .then(blob => new Promise((resolve, reject) => {
                          const reader = new FileReader()
                          reader.onloadend = () => resolve(reader.result)
                          reader.onerror = reject
                          reader.readAsDataURL(blob)
                  }))
                  toDataURL(enlaceURL)
                  .then(datosGif => {
                  localStorage.setItem(enlaceURL, datosGif);
                  })
              }
              convertirGif();
              setTimeout(function upload() {
                  fetch("https://upload.giphy.com/v1/gifs", {
                    method: "POST",
                    body: form,
                    mode:"no-cors",
                  });
                }, 5000);
              }
        
      
      function empezarCaptura() {
        const botonCaptura = document.getElementById("botonCapturar");
        botonCaptura.style.display ="none";
        const botonListo = document.getElementById("botonListo");
        botonListo.style.display ="flex";
        const tituloCambio = document.querySelector("#tituloCambio");
        tituloCambio.innerHTML = "Capturando Tu Guifo";
      }
      let botonCapturar = document.querySelector("#botonCapturar");
      botonCapturar.addEventListener("click", comenzarGrabar);
      botonCapturar.addEventListener("click", empezarCaptura);

      function cabioDeCaptura() {
        const capturaVideo = document.querySelector("#capturaVideo");
        capturaVideo.style.display ="none";
        const previoVideo = document.getElementById("previoVideo");
        previoVideo.style.display ="flex";
      }
      let botonStop = document.querySelector("#botonListo");
      botonStop.addEventListener("click", pararGrabacion);
      botonStop.addEventListener("click", cabioDeCaptura);
      
      function cambioSubida() {
        const previoVideo = document.querySelector("#previoVideo");
        previoVideo.style.display ="none";
        const subirVideo = document.getElementById("subirVideo");
        subirVideo.style.display ="flex";
        setTimeout(function chageToEnd() {
            document.querySelector("#resultados").src = previo;
            const subirVideo = document.querySelector("#subirVideo");
            subirVideo.style.display ="none";
            const opcionVideo = document.getElementById("opcionVideo");
            opcionVideo.style.display ="flex";
            const contenedorGridMyGif = document.getElementById("contenedorGridMyGif");
            contenedorGridMyGif.style.display ="flex";
        }, 5000);
      }
      let botonSubir = document.querySelector("#botonSubir");
      botonSubir.addEventListener("click", subirGif);
      botonSubir.addEventListener("click", cambioSubida);
    });
}

function cambiarAlPrevio () {
  const grabarGif = document.querySelector("#grabarGif");
  grabarGif.style.display ="none";
  const capturaVideo = document.getElementById("capturaVideo");
  capturaVideo.style.display ="flex";
  const gridMyGif = document.querySelector("#contenedorGridMyGif");
  gridMyGif.style.display ="none";
}
function eventosGrabacion(){
    // buscar el boton grabar
    const boton = document.querySelector("#botonComenzar");
    // escuchar el evento clicK
    // cuando se pulse, grabar video
    boton.addEventListener("click", getStreamAndRecord); 
    boton.addEventListener("click", cambiarAlPrevio);
}
eventosGrabacion();
function irAtras() {
  location = "./upload.html";
}
function repetir() {
  const botonRepetir = document.querySelector("#botonRepetir");
  botonRepetir.addEventListener("click", irAtras);
}
repetir();
function salir() {
  const botonOk = document.querySelector("#botonOk");
  botonOk.addEventListener("click", irAtras);
  const cerrarCaptura = document.querySelector("#cerrarCaptura");
  cerrarCaptura.addEventListener("click", irAtras); 
  const cerrarPrevio = document.querySelector("#cerrarPrevio");
  cerrarPrevio.addEventListener("click", irAtras); 
  const cerrarSubida = document.querySelector("#cerrarSubida");
  cerrarSubida.addEventListener("click", irAtras); 
  const cerrarOpcion = document.querySelector("#cerrarOpcion");
  cerrarOpcion.addEventListener("click", irAtras); 
}
salir();
function salvar() {
  const link = window.document.createElement("a");
  const url = document.querySelector("#resultados").src;
  const filename = "miGifo.gif";
  link.setAttribute("href", url);
  link.setAttribute("download", filename);
  link.setAttribute("id", "lin");
  link.style.visibility = 'hidden';
  window.document.body.appendChild(link);
  link.click();
  window.document.body.removeChild(link);
}
function salvarGif() {
  const saveGif = document.querySelector("#salvarGif");
  saveGif.addEventListener("click", salvar);
}
salvarGif();
function portapapeles() {
  let aux = document.createElement("input");
  let valueURL = localStorage.getItem(enlaceURL);
  aux.setAttribute("value", valueURL);
  document.body.appendChild(aux);
  aux.select();
  document.execCommand("copy");
  document.body.removeChild(aux);
  alert("Enlace copiado al portapapeles");
}
function saveUrlButton() {
  const saveUrl = document.querySelector("#salvarUrl");
  saveUrl.addEventListener("click", portapapeles);
}
saveUrlButton();