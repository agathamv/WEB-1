//NUEVO

import React, { useState, useEffect } from "react";
import Comercios from "./componentes/Comercios.jsx";
import ComerciosEditor from "./componentes/ComerciosEditor.jsx";
import "../css/List.css";



function ComerciosList (){

    const [tasks, setTasks] = useState([]); //Tendremos un array de objetos
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(()=>{

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
                setTasks(comercios);
            }
            else console.log("El servidor no ha devuelto nada");
        
        }

        handleBuscar()

    }, [searchTerm])


    const addComercio = (comercio) => {
        setTasks([...tasks, comercio]);
        localStorage.setItem("tasks", JSON.stringify([...tasks, comercio]));
        JSON.parse(localStorage.getItem("tasks"));
    };

    const deleteTask = async (id) => {
        const updatedTasks = tasks.filter(task => task.id !== id);
        setTasks(updatedTasks);
        //Borrar las notas en el almacenamiento local cada vez que se envía una nueva nota

        localStorage.setItem("tasks", JSON.stringify(updatedTasks));
       // JSON.parse(localStorage.getItem("tasks"));

       const result = await fetch(`/api/comercio/${id}`, {
                    
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json'
        }
        
        }
        );
        
    }

    const filteredTasks = tasks.filter(task =>
        task.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.direccion.toLowerCase().includes(searchTerm.toLowerCase())
    );    

    return (
    
        <div id = "admin">
        <div className="Form" style={{ marginTop: '10px'}}>
            <h2>Busqueda por nombre y/o ciudad</h2>
            <div className="input-group input-group-md mb-3">
                <span className="input-group-text" id="inputGroup-sizing-md">Buscar</span>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Comercio"
                    aria-label="Comercio"
                    aria-describedby="basic-addon1"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                >
                </input>
            </div>
            <ComerciosEditor className= "container-NotaEditor" onSubmit={addComercio}/>
        </div>
        <div className="Filtrados">
            <div>
                <h2>Comercios Filtrados:</h2>
            </div>
            
            {filteredTasks.map ((task) => 

                <Comercios className= "container-Nota"
                    key = {task.id}
                    id = {task.id}
                    nombre = {task.nombre}
                    cif = {task.cif}
                    direccion = {task.direccion}
                    email = {task.email}
                    telefono = {task.telefono}
                    deleteTask={deleteTask}
                    eliminar = {true}
                />
            )
            }
        </div>

        <div className="Todos">
        <div>
            <h2>Todos los comercios:</h2>
        </div>

        {tasks.map((task) => (
                <Comercios
                    className="container-Nota"
                    key={task.id}
                    id={task.id}
                    nombre={task.nombre}
                    cif={task.cif}
                    direccion={task.direccion}
                    email={task.email}
                    telefono={task.telefono}
                    deleteTask={deleteTask}
                    eliminar={true}
                />
        ))}
        </div>
        </div>

    );

}

export default ComerciosList;