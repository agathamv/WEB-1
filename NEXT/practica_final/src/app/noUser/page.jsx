"use client"

import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import './style.css';

const GuestUserPage = () => {
  const [comercios, setComercios] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchComercios();
  }, []);

  const fetchComercios = async () => {
    try {
      const response = await fetch('/api/comercios');

      if (!response.ok) {
        throw new Error(`Error en la solicitud GET: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();

      if (data && data.length > 0) {
        setComercios(data);
      } else {
        setErrorMessage('No se encontraron comercios');
      }
    } catch (error) {
      console.error('Error al obtener la lista de comercios:', error);
      setErrorMessage('Error interno del servidor');
    }
  };

  return (
    <div>
      <Navbar />
  
      <div className='comercio-container'>
        {errorMessage && <div>Error: {errorMessage}</div>}
        {comercios.map((comercio) => (
          <div className='content-container' key={comercio.id} style={{ display: 'flex', flexDirection: 'column' }}>
            <h1>{comercio.nombreComercio}</h1>

            <p><strong>Dirección:</strong> {comercio.direccion}</p>
            <p><strong>Email:</strong> {comercio.email}</p>
            <p><strong>Teléfono:</strong> {comercio.telefono}</p>
            <p><strong>Ciudad:</strong> {comercio.ciudad}</p>
            <p><strong>Actividad:</strong> {comercio.actividad}</p>
            <p><strong>Texto:</strong> {comercio.texto}</p>
            
            <div>
              <strong>Fotos:</strong>
              <ul>
                {comercio.fotos.map((foto, index) => (
                  <li key={index}>
                    <img className='foto' src={foto} alt={`Foto ${index + 1}`} />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GuestUserPage;
