'use client'
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../../Regis.css";
import "../../MisDatos.css"
import NavBarComercio from '@/app/componentes/NavBarComercio';


const InfoComercioPage = () => {

    const searchParams = useSearchParams();
    const comercioId = searchParams.get('id');
    const [comercioData, setComercioData] = useState({});
    const router = useRouter();
    const [nombre, setNombre] = useState('');
    const [actividad, setActividad] = useState('');
    const [direccion, setDireccion] = useState('');
    const [titulo, setTitlo] = useState('');
    const [resumen, setResumen] = useState('');
    const [texto, setTexto] = useState('');
    const [foto, setFoto] = useState(null);

    const handleChange1 = (content) => { //mantenemos el valor en la variable
        setNombre(content.target.value);
    }

    const handleChange2 = (content) => { //mantenemos el valor en la variable
        setActividad(content.target.value);
    }

    const handleChange3 = (content) => {
        setDireccion(content.target.value);
    }

    const handleChange4 = (content) => {
        setTitlo(content.target.value);
    }

    const handleChange5 = (content) => {
        setResumen(content.target.value);
    }

    const handleChange6 = (content) => {
        setTexto(content.target.value);
    }
      
    const handleChange7 = (content) => {
        setFoto(content.target.files[0]);
    }
    

    useEffect(() => {
        
        const fetchComercioData = async () => {
        
        try {
            
            const result = await fetch(`/api/comercio/${comercioId}`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
            },
            });

            const data = await result.json();

            setComercioData(data.come);

            console.log("data", data)
            console.log("data.comercio", data.come)
            console.log("comercioData", comercioData)

            setNombre(data.come.nombre);
            setActividad(data.come.actividad);
            setDireccion(data.come.direccion);
            setTitlo(data.come.titulo);
            setResumen(data.come.resumen);
            setTexto(data.come.texto);
            setFoto(data.foto);


        } catch (error) {
            console.error("ERROR:", error);
        }
        };

        if (comercioId) {
            fetchComercioData();
        }
    }, [comercioId]);

    
    const handleSend = async (content) => { //enviamos el texto
        
        content.preventDefault(); //no recarga la pagina

        try{

            const result = await fetch(`/api/comercio/${comercioId}`, {
                    
                method: 'PUT',
                headers: {
                  'Content-type': 'application/json'
                },
                body: JSON.stringify({

                    actividad: actividad,
                    direccion: direccion,
                    titulo: titulo,
                    resumen: resumen,
                    texto: texto,
                    foto: foto
                })
                
            });
            
        }catch(error){
            console.error("ERROR:", error);
        }
    
    }
    
    const deleteTask = async (comercioId) => {

        try {
            const result = await fetch(`/api/comercio/${comercioId}`, {
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
        
          router.push('/comercios');
    }
    

    return (

        <>
        <div>
            <NavBarComercio></NavBarComercio>
            <div className='Fijo'>
                <h4 className='insertarNota'>Mis datos</h4>
                <h5>Scoring: {comercioData.scoring}</h5>
                <h5>Reseñas: {comercioData.reseina}</h5>
                <h5>Cantidad de reseñas: {comercioData.reseinasCant}</h5>
            </div>  


        <form className="form-nota" onSubmit={handleSend}>

            <div className='row'>
                <h4 className='insertarNota'>Datos Modificables</h4>

                <div className="input-group input-group-md mb-3">
                    <span className="input-group-text" id="inputGroup-sizing-md">Nombre</span>
                    <input 
                        className="form-control" 
                        aria-label="Nombre"
                        aria-describedby="basic-addon1"
                        placeholder = "Nombre"
                        name = "nombre"
                        value = {nombre}
                        onChange={handleChange1}
                    />
                </div>
                <div className="input-group input-group-md mb-3">
                    <span className="input-group-text" id="inputGroup-sizing-md">Actividad</span>
                    <input 
                        className="form-control" 
                        aria-label="Actividad"
                        aria-describedby="basic-addon1"
                        placeholder = "Actividad"
                        name = "actividad"
                        value = {actividad}
                        onChange={handleChange2}
                    />
                </div>
                <div className="input-group input-group-md mb-3">
                    <span className="input-group-text" id="inputGroup-sizing-md">Direccion</span>
                    <input 
                        className="form-control" 
                        aria-label="Direccion"
                        aria-describedby="basic-addon1"
                        placeholder = "Direccion"
                        name = "direccion"
                        value = {direccion}
                        onChange={handleChange3}
                    />
                </div>
                <div className="input-group input-group-md mb-3">
                    <span className="input-group-text" id="inputGroup-sizing-md">Titulo</span>
                    <input 
                        className="form-control" 
                        aria-label="Titulo"
                        aria-describedby="basic-addon1"
                        placeholder = "Titulo"
                        name = "titulo"
                        value = {titulo}
                        onChange={handleChange4}
                    />
                </div>
                <div className="input-group input-group-md mb-3">
                    <span className="input-group-text" id="inputGroup-sizing-md">Resumen</span>
                    <input 
                        className="form-control" 
                        aria-label="Resumen"
                        aria-describedby="basic-addon1"
                        placeholder = "Resumen"
                        name = "resumen"
                        value = {resumen}
                        onChange={handleChange5}
                    />
                </div>
                <div className="input-group input-group-md mb-3">
                    <span className="input-group-text" id="inputGroup-sizing-md">Texto</span>
                    <input 
                        className="form-control" 
                        aria-label="Texto"
                        aria-describedby="basic-addon1"
                        placeholder = "Texto"
                        name = "texto"
                        value = {texto}
                        onChange={handleChange6}
                    />
                </div>
                <div>
                    <input
                        type="file"
                        className="form-control mt-1"
                        onChange={handleChange7}
                        accept="image/*"
                    />  
                    {foto && <img src={URL.createObjectURL(foto)} alt="Selecciona una foto" style={{ maxWidth: '100%', maxHeight: '200px', marginTop: '10px', borderRadius: '8px', display: 'block', marginLeft: 'auto', marginRight: 'auto'}}/>}
                </div>
            </div>
            <button className="button-nota" >
                    Guardar
            </button>

            <button className="button-nota" style={{ backgroundColor: 'red', color: 'white' }} onClick={() => deleteTask(comercioId)}>
                    Eliminar 
            </button>
        </form>
        </div>
        </>
    );
}

export default InfoComercioPage