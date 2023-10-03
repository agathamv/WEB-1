function agregarTarea() {
    var texto = document.getElementById('nuevatarea').value.trim();
    if (texto !== '') {
      var contenedor = document.getElementById('tareas');
      var nuevaTarea = document.createElement('div');
      nuevaTarea.classList.add('tarea');
      nuevaTarea.innerHTML = `
        <div>${texto}</div>
        <div class="botones">
          <button onclick="marcarCompletado(this)">Completado</button>
          <button onclick="eliminarTarea(this)">Eliminar</button>
        </div>
      `;
      contenedor.appendChild(nuevaTarea);
      document.getElementById('nuevatarea').value = '';
    }
  }
