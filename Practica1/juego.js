document.addEventListener('DOMContentLoaded', function() {
    var numJugadores = document.getElementById('numJugadores');
    var jugarBtn = document.getElementById('jugar');
    var reiniciarBtn = document.getElementById('reiniciar'); 
    var jugador1 = document.getElementById('jugador1');
    var jugador2 = document.getElementById('jugador2');
    var jugada = document.getElementById('jugada'); // Agregado
    var resultado = document.getElementById('resultado');
    var contador = { jugador1: 0, jugador2: 0 };
    var imagenesGeneradas = false;

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

    function jugadaBot() {
        return Math.floor(Math.random() * 3);
    }

    function evaluarGanador(seleccion1, seleccion2) {
        var resultadoRonda = (3 + seleccion1 - seleccion2) % 3;

        if (resultadoRonda == 1) {
            return 'jugador1';
        } else if (resultadoRonda == 2) {
            return 'jugador2';
        } else {
            return 'empate';
        }
    }

    async function jugarRonda() {
        var seleccion1, seleccion2;

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

        var opciones = ['Piedra', 'Papel', 'Tijera'];
        jugada.innerHTML = `Jugador 1 eligió ${opciones[seleccion1]}. Jugador 2 eligió ${opciones[seleccion2]}.<br>`;

        var ganador = evaluarGanador(seleccion1, seleccion2);

        if (ganador == 'jugador1') {
            resultado.textContent = '¡Jugador 1 gana!';
            contador.jugador1++;
        } else if (ganador == 'jugador2') {
            resultado.textContent = '¡Jugador 2 gana!';
            contador.jugador2++;
        } else {
            resultado.textContent = '¡Empate!';
        }

        document.getElementById('contador').textContent = `Jugador 1: ${contador.jugador1} - Jugador 2: ${contador.jugador2}`;
    }

    jugarBtn.addEventListener('click', function() {
        if (!imagenesGeneradas) {
            numJugadores.disabled = true;
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
                    boton.appendChild(imagen);
                    col.appendChild(boton);
                    row.appendChild(col);
                }

                contenedor.appendChild(row);
            }

            crearBotones(contenedorImagenes1);
            crearBotones(contenedorImagenes2);

            jugador1.classList.remove('d-none');
            jugador2.classList.remove('d-none');
            imagenesGeneradas = true;
        }

        // Jugar una ronda
        jugarRonda();
    });

    function determinarGanador() {
        if (contador.jugador1 > contador.jugador2) {
            return 'jugador1';
        } else if (contador.jugador1 < contador.jugador2) {
            return 'jugador2';
        } else {
            return 'empate';
        }
    }

    reiniciarBtn.addEventListener('click', function() {
        var cuentaAtrasElement = document.getElementById('cuentaAtras');
        cuentaAtrasElement.textContent = 'Reiniciando en 10 segundos...';

        // Determinar el ganador y mostrarlo
        var ganador = determinarGanador();
        var ganadorElement = document.getElementById('ganador');
        if (ganador === 'jugador1') {
            ganadorElement.textContent = '¡Jugador 1 es el ganador final!';
        } else if (ganador === 'jugador2') {
            ganadorElement.textContent = '¡Jugador 2 es el ganador final!';
        } else {
            ganadorElement.textContent = '¡Empate final!';
        }

        var tiempoRestante = 10;
        var cuentaAtras = setInterval(function() {
            tiempoRestante--;
            cuentaAtrasElement.textContent = 'Reiniciando en ' + tiempoRestante + ' segundos...';
            
            if (tiempoRestante <= 0) {
                clearInterval(cuentaAtras);
                
                // Reinicia los contadores y el texto de resultado
                contador.jugador1 = 0;
                contador.jugador2 = 0;
                jugada.textContent = '';
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
                cuentaAtrasElement.textContent = ''; // Limpiar el texto de la cuenta atrás
                ganadorElement.textContent = '';
            }
        }, 1000);
    });

    
    
});
