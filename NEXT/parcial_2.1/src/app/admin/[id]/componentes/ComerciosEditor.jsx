//NUEVO
import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid'; //nos da una ip distinta cada vez
import 'bootstrap/dist/css/bootstrap.min.css';
import "../../css/Editor.css"

function ComerciosEditor({onSubmit}){ //aqui metemos los elementos que usamos "las props"

    const [input1, setNombre] = useState('');//cada vez que escribamos actualizamos el valor de imput titulo
    const [input2, setCif] = useState('');//cada vez que escribamos actualizamos el valor de imput texto
    const [input3, setDireccion] = useState('');
    const [input4, setEmail] = useState('');
    const [input5, setTelefono] = useState('');

    const handleChange1 = (content) => { //mantenemos el valor en la variable
        setNombre(content.target.value);
    }

    const handleChange2 = (content) => { //mantenemos el valor en la variable
        setCif(content.target.value);
    }

    const handleChange3 = (content) => { //mantenemos el valor en la variable
        setDireccion(content.target.value);
    }

    const handleChange4 = (content) => { //mantenemos el valor en la variable
        setEmail(content.target.value);
    }

    const handleChange5 = (content) => { //mantenemos el valor en la variable
        setTelefono(content.target.value);
    }

    function generarContraseña(longitud) {
        const caracteres =
          'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      
        let contraseña = '';
        for (let i = 0; i < longitud; i++) {
          const indiceAleatorio = Math.floor(Math.random() * caracteres.length);
          contraseña += caracteres.charAt(indiceAleatorio);
        }
      
        return contraseña;
    }


    const handleSend = async (content) => { //enviamos el texto
        
        content.preventDefault(); //no recarga la pagina
        const newTask = {
            //genera un id unico llamando a uuidv4
            id: uuidv4(),
            contra: generarContraseña(10),
            nombre: input1,
            cif: input2,
            direccion: input3,
            email: input4,
            telefono: input5
        }

        const result = await fetch('../api/comercio', {
            
            method: 'POST',
            body: JSON.stringify(newTask),
            headers: {
              'Content-type': 'application/json',
            },
            
        });
    

        onSubmit(newTask);

        setNombre('');
        setCif('');
        setDireccion('');
        setEmail('');
        setTelefono('');
    
    }

    return (

        <>
        <form className="form-nota" onSubmit={handleSend}>

            <div className='row'>
                <h2 className='insertarNota'>Registrar Comercio</h2>

                <div className="input-group input-group-md mb-3">
                    <span className="input-group-text" id="inputGroup-sizing-md">Nombre</span>
                    <input 
                        type="text" 
                        className="form-control" 
                        aria-label="Nombre"
                        aria-describedby="basic-addon1"
                        placeholder = "Nombre"
                        name = "nombre"
                        value={input1}
                        onChange = {handleChange1}
                    />
                </div>

                <div className="input-group input-group-md mb-3">
                    <span className="input-group-text" id="inputGroup-sizing-md">Cif</span>
                    <input 
                        type="text" 
                        className="form-control" 
                        aria-label="Cif"
                        aria-describedby="basic-addon1"
                        placeholder = "Cif"
                        name = "cif"
                        value={input2}
                        onChange = {handleChange2}
                    />
                </div>

                <div className="input-group input-group-md mb-3">
                    <span className="input-group-text" id="inputGroup-sizing-md">Direccion</span>
                    <input 
                        type="text" 
                        className="form-control" 
                        aria-label="Direccion"
                        aria-describedby="basic-addon1"
                        placeholder = "Direccion"
                        name = "direccion"
                        value={input3}
                        onChange = {handleChange3}
                    />
                </div>


                <div className="input-group input-group-md mb-3">
                    <span className="input-group-text" id="inputGroup-sizing-md">Email</span>
                    <input 
                        type="text" 
                        className="form-control" 
                        aria-label="Email"
                        aria-describedby="basic-addon1"
                        placeholder = "Email"
                        name = "email"
                        value={input4}
                        onChange = {handleChange4}
                    />
                </div>

                <div className="input-group input-group-md mb-3">
                    <span className="input-group-text" id="inputGroup-sizing-md">Telefono</span>
                    <input 
                        type="text" 
                        className="form-control" 
                        aria-label="Telefono"
                        aria-describedby="basic-addon1"
                        placeholder = "Telefono"
                        name = "telefono"
                        value={input5}
                        onChange = {handleChange5}
                    />
                </div>

            </div>
            <button className="button-nota">
                    Guardar
                </button>
        </form>
        </>
    );
}

export default ComerciosEditor