let numPartidas = 0;
let player1Score = 0;
let player2Score = 0;
let player3Score = 0;

function mostrarImagen(id, numero) {
    let imagen;
    if (numero === 1) {
        imagen = 'uno.png';
    } else if (numero === 2) {
        imagen = 'dos.png';
    } else if (numero === 'cero') {
        imagen = 'cero.png';
    }
    document.getElementById(id).src = imagen;
}

function actualizarContadores() {
    document.getElementById('player1Score').innerText = `Jugador 1: ${player1Score}`;
    document.getElementById('player2Score').innerText = `Jugador 2: ${player2Score}`;
    document.getElementById('player3Score').innerText = `Jugador 3: ${player3Score}`;
}

function jugarRonda(partida) {
    let elecciones = [];

    const numHumanos = parseInt(document.getElementById('humanos').value);

    if (numHumanos === 0) {
        for (let i = 1; i <= 3; i++) {
            let choice = Math.floor(Math.random() * 2) + 1;
            document.getElementById(`player${i}Choice`).innerText = choice;
            mostrarImagen(`player-${i}-image`, choice);
            elecciones.push(choice);
        }
    } else if (numHumanos === 1) {
        for (let i = 1; i <= 3; i++) {
            if (i === 1) {
                let choice = parseInt(prompt("Jugador 1, elige 1 o 2:"));
                document.getElementById(`player${i}Choice`).innerText = choice;
                mostrarImagen(`player-${i}-image`, choice);
                elecciones.push(choice);
            } else {
                let choice = Math.floor(Math.random() * 2) + 1;
                document.getElementById(`player${i}Choice`).innerText = choice;
                mostrarImagen(`player-${i}-image`, choice);
                elecciones.push(choice);
            }
        }
    } else if (numHumanos === 2) {
        for (let i = 1; i <= 3; i++) {
            if (i <= 2) {
                let choice = parseInt(prompt(`Jugador ${i}, elige 1 o 2:`));
                document.getElementById(`player${i}Choice`).innerText = choice;
                mostrarImagen(`player-${i}-image`, choice);
                elecciones.push(choice);
            } else {
                let choice = Math.floor(Math.random() * 2) + 1;
                document.getElementById(`player${i}Choice`).innerText = choice;
                mostrarImagen(`player-${i}-image`, choice);
                elecciones.push(choice);
            }
        }
    } else if (numHumanos === 3) {
        for (let i = 1; i <= 3; i++) {
            let choice = parseInt(prompt(`Jugador ${i}, elige 1 o 2:`));
            document.getElementById(`player${i}Choice`).innerText = choice;
            mostrarImagen(`player-${i}-image`, choice);
            elecciones.push(choice);
        }
    }

    let unico = elecciones.find(e => elecciones.filter(x => x === e).length === 1);

    if (unico !== undefined) {
        let ganador = elecciones.indexOf(unico) + 1;
        document.getElementById('gameResult').innerText = `El ganador de la partida ${partida} es Jugador ${ganador}`;
        if (ganador === 1) {
            player1Score++;
        } else if (ganador === 2) {
            player2Score++;
        } else if (ganador === 3) {
            player3Score++;
        }
    } else {
        document.getElementById('gameResult').innerText = `No hay ganador en la partida ${partida}`;
    }

    actualizarContadores();

    if (partida < numPartidas) {
        setTimeout(function() {
            alert(`Prepárate para la siguiente ronda. Partida ${partida + 1} va a comenzar.`);
            jugarRonda(partida + 1);
        }, 3000);
    }
}

function jugar() {
    numPartidas = parseInt(document.getElementById('partidas').value);
    jugarRonda(1);
}

function reiniciar() {
    for (let i = 1; i <= 3; i++) {
        document.getElementById(`player${i}Choice`).innerText = "-";
        mostrarImagen(`player-${i}-image`, 'cero');
    }
    document.getElementById('gameResult').innerText = "";
    player1Score = 0;
    player2Score = 0;
    player3Score = 0;
    actualizarContadores();
}
