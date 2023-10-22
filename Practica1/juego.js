//Agatha Martin Villadoniga

document.addEventListener('DOMContentLoaded', function() {

    var numJugadores = document.getElementById('numJugadores');
    var jugarBtn = document.getElementById('jugar');
    var reiniciarBtn = document.getElementById('reiniciar'); 
    var jugador1 = document.getElementById('jugador1');
    var jugador2 = document.getElementById('jugador2');
    var jugada = document.getElementById('jugada'); 
    var resultado = document.getElementById('resultado');
    var contador = { jugador1: 0, jugador2: 0 };
    var imagenesGeneradas = false;
    var alertMostrado = false;

    //jugada si es un jugador. Dependiendo del boton en el que se haga click se devuelve su indice.
    function jugadaJugador(jugador) {
        return new Promise(function(resolve) {
            var botones = jugador.querySelectorAll('.imagen-button');
            botones.forEach(function(boton, index) {
                boton.addEventListener('click', function() {
                    resolve(index);
                });
            });
        });
    }

    //jugada si es un bot. Elige un numero random del 1-3
    function jugadaBot() {
        return Math.floor(Math.random() * 3);
    }

    //Evalua quien es el ganador.
    function evaluarGanador(seleccion1, seleccion2) {
        // Calcula el resultado de la ronda usando las selecciones de los jugadores
        var resultadoRonda = (3 + seleccion1 - seleccion2) % 3;
    
        // Comprueba el resultado de la ronda
        if (resultadoRonda == 1) {
            return 'jugador1';
        } else if (resultadoRonda == 2) {
            return 'jugador2';
        } else {
            return 'empate';
        }
    }
    
    //Jugar la ronda segun el numero de jugadores
    async function jugarRonda() {
        var seleccion1, seleccion2;

        //realiza las jugadas dependiendo del numero de jugadores
        if (numJugadores.value == '2') {
            seleccion1 = await jugadaJugador(jugador1);
            seleccion2 = await jugadaJugador(jugador2);
        } else if (numJugadores.value == '1') {
            seleccion1 = await jugadaJugador(jugador1);
            seleccion2 = jugadaBot();
        } else if (numJugadores.value == '0') {
            seleccion1 = jugadaBot();
            seleccion2 = jugadaBot();
        }

        //muestra que ha seleccionado cada jugador
        var opciones = ['Piedra', 'Papel', 'Tijera'];
        jugada.innerHTML = `Jugador 1 eligió ${opciones[seleccion1]}. Jugador 2 eligió ${opciones[seleccion2]}.<br>`;

        //calcula quien es el ganador
        var ganador = evaluarGanador(seleccion1, seleccion2);

        //Muestra quien ha ganado
        if (ganador == 'jugador1') {
            resultado.textContent = '¡Jugador 1 gana!';
            contador.jugador1++;
        } else if (ganador == 'jugador2') {
            resultado.textContent = '¡Jugador 2 gana!';
            contador.jugador2++;
        } else {
            resultado.textContent = '¡Empate!';
        }

        //contador de puntos que va sumando por cada ronda.
        document.getElementById('contador').textContent = `Jugador 1: ${contador.jugador1} - Jugador 2: ${contador.jugador2}`;
    }

    //al hacer click en jugar
    jugarBtn.addEventListener('click', async function() {

        //si es la primera vez que se pulsa(los botones/imagenes no estan visibles)
        if (!imagenesGeneradas) {

            //no permite cambiar el numero de jugadores
            numJugadores.disabled = true;

            //muestra los botones
            var contenedorImagenes1 = document.getElementById('contenedorImagenes1');
            var contenedorImagenes2 = document.getElementById('contenedorImagenes2');
    
            var imagenes = ['piedra.png', 'papel.png', 'tijeras.png'];
    
            function crearBotones(contenedor) {
                var row = document.createElement('div');
                row.classList.add('row');
            
                for (var i = 0; i < imagenes.length; i++) {
                    var col = document.createElement('div');
                    col.classList.add('col-md-4'); // Cada botón ocupará 4 columnas en pantallas medianas y grandes
                    var boton = document.createElement('button');
                    boton.classList.add('btn', 'btn-primary', 'imagen-button', 'w-100'); // Ajustamos el ancho del botón
                    boton.type = 'button'; // Agregamos el tipo de botón
                    var imagen = document.createElement('img');
                    imagen.src = imagenes[i];
                    imagen.alt = 'Opción ' + (i + 1);
            
                    // Establecemos estilos para la imagen
                    imagen.style.maxWidth = '100%';
                    imagen.style.maxHeight = '100%';
            
                    boton.appendChild(imagen);
                    col.appendChild(boton);
                    row.appendChild(col);
                }
            
                contenedor.appendChild(row);
            }
            
            
            
            
                    
            crearBotones(contenedorImagenes1);
            crearBotones(contenedorImagenes2);
            
            //muestra el texto de jugador 1 y jugador 2
            jugador1.classList.remove('d-none');
            jugador2.classList.remove('d-none');
            imagenesGeneradas = true;
    
            // Añade el alert dependiendo del número de jugadores
            if (numJugadores.value == '0') {
                alert("BOT VS BOT");
            } else if (numJugadores.value == '1') {
                alert("JUGADOR VS BOT \n Tu juegas como el Jugador 1.");
            } else if (numJugadores.value == '2') {
                alert("JUGADOR 1 VS JUGADOR 2");
            }
        }
    
        // Jugar una ronda
        jugarRonda();
    });
    
    //boton de reiniciar
    reiniciarBtn.addEventListener('click', async function() {
        // Deshabilitamos el botón mientras esperamos
        reiniciarBtn.disabled = true;
    
        var cuentaAtrasElement = document.getElementById('cuentaAtras');
        cuentaAtrasElement.textContent = 'Finalizando en 10...';
    
        // Iniciamos la cuenta atrás
        for (var i = 10; i > 0; i--) {
            cuentaAtrasElement.textContent = `Finalizando en ${i}...`;
            await new Promise(resolve => setTimeout(resolve, 1000)); // Esperar 1 segundo
        }
    
        // Reinicia los contadores y el texto de resultado
        contador.jugador1 = 0;
        contador.jugador2 = 0;
        jugada.textContent = ''; // Agregado para limpiar la jugada
        resultado.textContent = '';
    
        // Habilita el botón de jugar y deshabilita el número de jugadores
        jugarBtn.disabled = false;
        numJugadores.disabled = false;
    
        // Restablece el estado de las imágenes generadas
        imagenesGeneradas = false;
    
        // Oculta los elementos relacionados con el juego
        var contenedorImagenes1 = document.getElementById('contenedorImagenes1');
        var contenedorImagenes2 = document.getElementById('contenedorImagenes2');
        contenedorImagenes1.innerHTML = '';
        contenedorImagenes2.innerHTML = '';
        jugador1.classList.add('d-none');
        jugador2.classList.add('d-none');
        document.getElementById('contador').textContent = '';
    
        // Reiniciamos la cuenta atrás
        cuentaAtrasElement.textContent = '';
        // Habilitamos nuevamente el botón de reiniciar
        reiniciarBtn.disabled = false;
    });    
    
});
