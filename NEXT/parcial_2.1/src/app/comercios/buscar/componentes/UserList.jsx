'use client'
import React from "react";
import { useState } from "react";
import User from "./User.jsx";

import "../../../admin/css/List.css"

function UserList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [usuarios, setComercios] = useState([]);

  const filteredTasks = usuarios.filter(usuario => 
    usuario.intereses.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (usuario.oferta === true)
  
  );



  const handleBuscar = async () =>{

    const result = await fetch('/api/usersLogin', {
            
        method: 'GET',
        headers: {
          'Content-type': 'application/json'
        }
        
    });

    const usuarios = await result.json(); //me entran los comercios 

    if (usuarios) {
        console.log(usuarios);
        setComercios(usuarios);
    }
    else console.log("El servidor no ha devuelto nada");

  }




  return (
    <div id = "user">

      <div className="Form">
        <h2>Busqueda de Usuario</h2>
        <div className="input-group input-group-md mb-3">
          <span className="input-group-text" id="inputGroup-sizing-md">Buscar</span>
          <input
            type="text"
            className="form-control"
            placeholder="Intereses"
            aria-label="Buscar"
            aria-describedby="basic-addon1"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      
        <div>
          <button onClick={handleBuscar}>Buscar</button>
        </div>

      </div>

      <div className="Filtrados">
        {filteredTasks.map((usuario) =>
          <User
            className="container-Nota"
            key={usuario.id}
            id={usuario.id}
            nombre={usuario.nombre}
            email={usuario.email}
          />
        )}
      </div>
    </div>
  );
}

export default UserList;
