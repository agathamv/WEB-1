import React from 'react';
import "../../../admin/css/Comercio.css"

function User ({ id, nombre, email}){
    
    return (

        <div className= "nota-container">
            <div className='nota-texto'>
                <div className='nombre'>
                    <h4>Nombre: {nombre}</h4>
                </div>
                <div className='email'>
                    <h6>Email: {email}</h6>
                </div>
                
            </div>
        </div>
    );
}

export default User