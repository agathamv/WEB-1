import React from 'react';
import "../../css/Comercio.css"

function Comercios ({ id, nombre, cif, direccion, email, telefono, deleteTask, eliminar}){
    
    return (

        <div className= "nota-container">
            <div className='nota-texto'>
                <div className='nombre'>
                    <h4>Nombre: {nombre}</h4>
                </div>
                <div className='cif'>
                    <h6>Cif: {cif}</h6>
                </div>
                <div className='direccion'>
                    <h6>Direccion: {direccion}</h6>
                </div>
                <div className='email'>
                    <h6>Email: {email}</h6>
                </div>
                <div className='telefono'>
                    <h6>Telefono: {telefono}</h6>
                </div>
                
            </div>
            <div onClick = { () => deleteTask(id)}>
            {eliminar ?(

                <button className="button-eliminar">
                    Eliminar
                </button>

            ): null} 
            </div>
        </div>
    );
}

export default Comercios