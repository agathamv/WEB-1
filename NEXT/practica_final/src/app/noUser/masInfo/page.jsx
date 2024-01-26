"use client"


import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import '../style.css';

// Define el componente MasInfoPage
const MasInfoPage = () => {
  // Estado para almacenar la información del comercio
  const [comercio, setComercio] = useState(null);
  // Estado para manejar mensajes de error
  const [errorMessage, setErrorMessage] = useState('');
  // Obtiene el objeto de historial de navegación

  // Efecto para cargar la información del comercio al montar el componente
  useEffect(() => {
    // Obtiene el cif del comercio almacenado en el almacenamiento local
    const cifComercioSeleccionado = localStorage.getItem('cifComercioSeleccionado');

    // Realiza la solicitud GET a la API de comercios para obtener la información del comercio
    fetch(`/api/comercios?cif=${cifComercioSeleccionado}`)
    .then(response => response.json())
    .then(data => {
        // Actualiza el estado con la información del comercio
        setComercio(data);
    })
    .catch(error => {
        console.error('Error al obtener información del comercio:', error);
        // Actualiza el estado con un mensaje de error
        setErrorMessage('Error al obtener información del comercio');
    });

  });

  // Renderiza el componente
  return (
    <div>
      <Navbar />

      <div className='comercio-container'>
        {errorMessage && <div>Error: {errorMessage}</div>}
        {comercio && (
          <div className='content-container' style={{ display: 'flex', flexDirection: 'column' }}>
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
        )}
      </div>
    </div>
  );
};

// Exporta el componente MasInfoPage
export default MasInfoPage;
