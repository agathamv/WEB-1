document.addEventListener('DOMContentLoaded', function() {
    var numJugadores = document.getElementById('numJugadores');
    var jugarBtn = document.getElementById('jugar');
    var jugador1 = document.getElementById('jugador1');
    var jugador2 = document.getElementById('jugador2');
    var imagenesGeneradas = false;

    jugarBtn.addEventListener('click', function() {
        if (!imagenesGeneradas) {
            numJugadores.disabled = true;
            var contenedorImagenes1 = document.getElementById('contenedorImagenes1');
            var contenedorImagenes2 = document.getElementById('contenedorImagenes2');
            
            var imagenes = ['piedra.png', 'papel.png', 'tijeras.png'];

            function crearBotones(contenedor) {
                for (var i = 0; i < imagenes.length; i++) {
                    var boton = document.createElement('button');
                    boton.classList.add('imagen-button');
                    var imagen = document.createElement('img');
                    imagen.src = imagenes[i];
                    imagen.alt = 'Opción ' + (i + 1);
                    boton.appendChild(imagen);
                    contenedor.appendChild(boton);
                }
            }
            
            
            

            crearBotones(contenedorImagenes1);
            crearBotones(contenedorImagenes2);

            jugador1.classList.remove('d-none');
            jugador2.classList.remove('d-none');
            imagenesGeneradas = true;
        }
    });
});
