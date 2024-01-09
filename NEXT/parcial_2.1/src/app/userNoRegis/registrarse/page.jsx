'use client'
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid'; //nos da una ip distinta cada vez
import 'bootstrap/dist/css/bootstrap.min.css';
import "../../LogIn.css"

const RegistrarseLoginPage = ({onSubmit}) => {

    const [input1, setNombre] = useState('');//cada vez que escribamos actualizamos el valor de imput titulo
    const [input2, setEmail] = useState('');//cada vez que escribamos actualizamos el valor de imput texto
    const [input3, setPassword] = useState('');
    const [input4, setEdad] = useState('');
    const [input5, setCiudad] = useState('');
    const [input6, setIntereses] = useState('');
    const [input7, setOferta] = useState(false);

    const handleChange1 = (content) => { //mantenemos el valor en la variable
        setNombre(content.target.value);
    }

    const handleChange2 = (content) => { //mantenemos el valor en la variable
        setEmail(content.target.value);
    }

    const handleChange3 = (content) => { //mantenemos el valor en la variable
        setPassword(content.target.value);
    }

    const handleChange4 = (content) => { //mantenemos el valor en la variable
        setEdad(content.target.value);
    }

    const handleChange5 = (content) => { //mantenemos el valor en la variable
        setCiudad(content.target.value);
    }

    const handleChange6 = (content) => { //mantenemos el valor en la variable
      setIntereses(content.target.value);
    }

    const handleChange7 = () => { //mantenemos el valor en la variable
        setOferta(!input7);
    }
    const router = useRouter();

    const handleSend = async (content) => { //enviamos el texto
        
        content.preventDefault(); //no recarga la pagina

        const newTask = {
            //genera un id unico llamando a uuidv4
            id: uuidv4(),
            nombre: input1,
            email: input2,
            password: input3,
            edad: input4,
            ciudad: input5,
            intereses: input6,
            oferta: input7,
        };

        const result = await fetch('../api/users', {
            
            method: 'POST',
            body: JSON.stringify(newTask),
            headers: {
              'Content-type': 'application/json',
            },
            
        });
      
        //onSubmit(newTask);

        router.push('/userRegis');

        setNombre('');
        setEmail('');
        setPassword('');
        setEdad('');
        setCiudad('');
        setIntereses('');
        setOferta(false);
    
    }

    return (

        <>
        <form className="form-nota" onSubmit={handleSend} style={{display: 'block', marginLeft: 'auto', marginRight: 'auto',}}>

            <div className='row'>
                <h2 className='insertarNota'>Registrar Usuaruo</h2>

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
                    <span className="input-group-text" id="inputGroup-sizing-md">Email</span>
                    <input 
                        type="text" 
                        className="form-control" 
                        aria-label="Email"
                        aria-describedby="basic-addon1"
                        placeholder = "Email"
                        name = "email"
                        value={input2}
                        onChange = {handleChange2}
                    />
                </div>

                <div className="input-group input-group-md mb-3">
                    <span className="input-group-text" id="inputGroup-sizing-md">Password</span>
                    <input 
                        type="password" 
                        className="form-control" 
                        aria-label="Password"
                        aria-describedby="basic-addon1"
                        placeholder = "Password"
                        name = "password"
                        value={input3}
                        onChange = {handleChange3}
                    />
                </div>


                <div className="input-group input-group-md mb-3">
                    <span className="input-group-text" id="inputGroup-sizing-md">Edad</span>
                    <input 
                        type="text" 
                        className="form-control" 
                        aria-label="Edad"
                        aria-describedby="basic-addon1"
                        placeholder = "Edad"
                        name = "edad"
                        value={input4}
                        onChange = {handleChange4}
                    />
                </div>

                <div className="input-group input-group-md mb-3">
                    <span className="input-group-text" id="inputGroup-sizing-md">Ciudad</span>
                    <input 
                        type="text" 
                        className="form-control" 
                        aria-label="Ciudad"
                        aria-describedby="basic-addon1"
                        placeholder = "Ciudad"
                        name = "ciudad"
                        value={input5}
                        onChange = {handleChange5}
                    />
                </div>

                <div className="input-group input-group-md mb-3">
                  <span className="input-group-text" id="inputGroup-sizing-md">Intereses</span>
                    <textarea
                        className="form-control"
                        type='text'
                        aria-label="Ciudad"
                        aria-describedby="basic-addon1"
                        placeholder = "Intereses"
                        name = "intereses"
                        rows="2"
                        value={input6}
                        onChange = {handleChange6}
                    ></textarea>
                </div>

            </div>
            <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" onChange = {handleChange7}></input>
                <label className="form-check-label" htmlFor="flexCheckDefault">
                    Permitir recibir ofertas
                </label>
            </div>
            <button className="button-nota">
              Registrar
            </button>
        </form>
    
        </>
    );
}

export default RegistrarseLoginPage;