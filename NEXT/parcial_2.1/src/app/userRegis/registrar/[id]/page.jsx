'use client'
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import NavbarUs from "@/app/componentes/NavBarUs";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../../../Regis.css"
import "../../../MisDatos.css"


const InfoPage = () => {

    const searchParams = useSearchParams();
    const userId = searchParams.get('id');
    const [userData, setUserData] = useState({});
    const router = useRouter();
    const [intereses, setIntereses] = useState('');
    const [ciudad, setCiudad] = useState('');
    const [ofertas, setOferta] = useState(false);

    const handleChange1 = (content) => { //mantenemos el valor en la variable
        setIntereses(content.target.value);
    }

    const handleChange2 = (content) => { //mantenemos el valor en la variable
        setCiudad(content.target.value);
    }

    const handleChange3 = (content) => {
        setOferta(content.target.checked);
    }
      
    

    useEffect(() => {
        const fetchUserData = async () => {
        try {
            const result = await fetch(`/api/users/${userId}`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
            },
            });

            const data = await result.json();

            setUserData(data.user);

            console.log("dsta", data)
            console.log("data.user", data.user)
            console.log("userData", userData)

            setIntereses(data.user.intereses);
            setCiudad(data.user.ciudad);
            setOferta(data.user.oferta);
    

        } catch (error) {
            console.error("ERROR:", error);
        }
        };

        if (userId) {
            fetchUserData();
        }
    }, [userId]);

    const handleSend = async (content) => { //enviamos el texto
        
        content.preventDefault(); //no recarga la pagina

        try{

            console.log("ciudad", ciudad)
            const result = await fetch(`/api/users/${userId}`, {
                    
                method: 'PUT',
                headers: {
                  'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    intereses: intereses,
                    ciudad: ciudad,
                    oferta: ofertas
                })
                
            });
            
            const data = await result.json();
            console.log("data", data)
        }catch(error){
            console.error("ERROR:", error);
        }
    
    }

    const deleteTask = async (userId) => {

        try {
            const result = await fetch(`/api/users/${userId}`, {
              method: 'DELETE',
              headers: {
                'Content-type': 'application/json'
              }
            });
        
            const data = await result.json();
            console.log('Respuesta del servidor:', data);
            

          } catch (error) {
            console.error('ERROR:', error);
          }
        
          router.push('/userNoRegis');
    }

    return (

        <>
        <NavbarUs></NavbarUs>
        <div>
        <div className='Fijo'>
            <h4 className='insertarNota'>Mis datos</h4>
            <h5>Nombre: {userData.nombre}</h5>
            <h5>Email: {userData.email}</h5>
            <h5>Edad: {userData.edad}</h5>
        </div>

        <form className="form-nota" onSubmit={handleSend}>

            <div className='row'>
                <h4 className='insertarNota'>Datos Modificables</h4>

                <div className="input-group input-group-md mb-3">
                    <span className="input-group-text" id="inputGroup-sizing-md">Intereses</span>
                    <input 
                        className="form-control" 
                        aria-label="Intereses"
                        aria-describedby="basic-addon1"
                        placeholder = "Intereses"
                        name = "intereses"
                        value = {intereses}
                        onChange={handleChange1}
                    />
                </div>
                <div className="input-group input-group-md mb-3">
                    <span className="input-group-text" id="inputGroup-sizing-md">Ciudad</span>
                    <input 
                        className="form-control" 
                        aria-label="Ciudad"
                        aria-describedby="basic-addon1"
                        placeholder = "Ciudad"
                        name = "ciudad"
                        value = {ciudad}
                        onChange={handleChange2}
                    />
                </div>
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" onChange = {handleChange3} checked = {ofertas}></input>
                    <label className="form-check-label" htmlFor="flexCheckDefault">
                        Permitir recibir ofertas
                    </label>
                </div>
            </div>
            <button className="button-nota" >
                    Guardar
            </button>

            <button className="button-nota" style={{ backgroundColor: 'red', color: 'white' }} onClick={() => deleteTask(userId)}>
                    Eliminar 
            </button>
        </form>
        </div>
        </>
    );
}

export default InfoPage