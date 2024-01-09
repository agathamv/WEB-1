'use client'
import React from "react";
import { useState } from "react";
import Comercios from "../../../admin/[id]/componentes/Comercios.jsx";

import "../../../admin/css/List.css"

function ComerciosList() {
  const [searchTerm1, setSearchTerm1] = useState('');
  const [searchTerm2, setSearchTerm2] = useState('');

  const [comercios, setComercios] = useState([]);

  const filteredTasks = comercios.filter((comercio) =>
  comercio &&
  comercio.direccion &&
  comercio.direccion.toLowerCase().includes(searchTerm1.toLowerCase()) &&
  comercio.actividad &&
  comercio.actividad.toLowerCase().includes(searchTerm2.toLowerCase())
);


  const deleteTask = (id) => {
    // Implementa la lógica para eliminar la tarea con el ID proporcionado
    // Actualiza el estado tasks después de eliminar la tarea
  };

  const handleBuscar = async () =>{

    const result = await fetch('/api/comercioLogin', {
            
        method: 'GET',
        headers: {
          'Content-type': 'application/json'
        }
        
    });

    const comercios = await result.json(); //me entran los comercios 

    if (comercios) {
        console.log(comercios);
        setComercios(comercios);
    }
    else console.log("El servidor no ha devuelto nada");

  }




  return (
    <div id = "user">

      <div className="Form">
        <h2>Busqueda por ciudad</h2>
        <div className="input-group input-group-md mb-3">
          <span className="input-group-text" id="inputGroup-sizing-md">Buscar Ciudad y Actividad</span>
          <input
            type="text"
            className="form-control"
            placeholder="Ciudad"
            aria-label="Ciudad"
            aria-describedby="basic-addon1"
            value={searchTerm1}
            onChange={(e) => setSearchTerm1(e.target.value)}
          />
        </div>
        <div className="input-group input-group-md mb-3">
          <span className="input-group-text" id="inputGroup-sizing-md">Buscar Actividad</span>
          <input
            type="text"
            className="form-control"
            placeholder="Actividad"
            aria-label="Actividad"
            aria-describedby="basic-addon1"
            value={searchTerm2}
            onChange={(e) => setSearchTerm2(e.target.value)}
          />
        </div>
      
        <div>
          <button onClick={handleBuscar}>Buscar</button>
        </div>

      </div>

      <div className="Filtrados">
        {filteredTasks.map((comercio) =>
          <Comercios
            className="container-Nota"
            key={comercio.id}
            id={comercio.id}
            nombre={comercio.nombre}
            cif={comercio.cif}
            direccion={comercio.direccion}
            email={comercio.email}
            telefono={comercio.telefono}
            deleteTask={() => deleteTask(comercio.id)}
            eliminar = {false}
          />
        )}
      </div>
    </div>
  );
}

export default ComerciosList;
