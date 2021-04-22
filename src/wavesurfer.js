import WaveSurfer from '../src/wavesurfer.js' ;

//mostrar los 3 botones en algún objeto
const buttons={
    play: document.getElementById('btn-play'),
    pause:document.getElementById('btn-pause'),
    stop:document.getElementById('btn-stop'),
}

//creación de waverfer
var Spectrum = WaveSurfer.create({
    container: '#audio-spectrum',
    // Agrega algo de color al especto de audio
    progressColor: "#03a9f4"
});

console.log(Spectrum,"hola");

//reproducir botones
  // Manipular boton de reproducir
  buttons.play.addEventListener("click", function(){
    Spectrum.play();

    // Activar/Desactivar respectivamente botones
    buttons.stop.disabled = false;
    buttons.pause.disabled = false;
    buttons.play.disabled = true;
}, false);

// Manipular boton de pausa
buttons.pause.addEventListener("click", function(){
    Spectrum.pause();

    // Activar/Desactivar respectivamente botones
    buttons.pause.disabled = true;
    buttons.play.disabled = false;
}, false);


// Manipular boton de detener
buttons.stop.addEventListener("click", function(){
    Spectrum.stop();

    // Activar/Desactivar respectivamente botones
    buttons.pause.disabled = true;
    buttons.play.disabled = false;
    buttons.stop.disabled = true;
}, false);


// Agregar un event listener para activar el boton de reproducir una vez que el audio este cargado
Spectrum.on('ready', function () {
    buttons.play.disabled = false;
});

// Si quieres un modo responsivo (cuando el usuario redimensiona la ventana)
// las ondas serán igualmente reproducibles
window.addEventListener("resize", function(){
    // Obten el progreso de acuerdo a la posición del cursor
    var currentProgress = Spectrum.getCurrentTime() / Spectrum.getDuration();

    // Resetear gráfica
    Spectrum.empty();
    Spectrum.drawBuffer();
    // Colocar posición original
    Spectrum.seekTo(currentProgress);

    // Activar/Desactivar respectivamente botones
    buttons.pause.disabled = true;
    buttons.play.disabled = false;
    buttons.stop.disabled = false;
}, false);

// Carga el audio desde tu propio dominio
Spectrum.load('audio-file.mp3');