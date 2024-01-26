"use client"


import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import './style.css';

// Define el componente GuestUserPage
const GuestUserPage = () => {
  const [comercios, setComercios] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  // Efecto para cargar la lista de comercios al montar el componente
  useEffect(() => {
    fetchComercios();
  }, []);

  // Función para obtener la lista de comercios desde la API
  const fetchComercios = async () => {
    try {
      // Realiza la solicitud GET a la API de comercios
      const response = await fetch('/api/comercios');

      // Verifica si la respuesta es exitosa (código de estado 200)
      if (response.ok) {
        // Parsea los datos JSON de la respuesta
        const data = await response.json();
        // Actualiza el estado con la lista de comercios
        setComercios(data);
      } else {
        // Si la respuesta no es exitosa, lanza un error
        throw new Error(`Error en la solicitud GET: ${response.status} - ${response.statusText}`);
      }
    } catch (error) {
      // Captura y maneja cualquier error durante la solicitud
      console.error('Error al obtener la lista de comercios:', error);
      // Actualiza el estado con un mensaje de error
      setErrorMessage('Error interno del servidor');
    }
  };

  // Función para manejar el clic en el botón de "Ver más información"
  const handleInfoClick = (cif) => {
    // Almacena el cif del comercio en el almacenamiento local
    localStorage.setItem('cifComercioSeleccionado', cif);
    // Redirige a la página masInfo
    router.push('/noUser/masInfo');
  };

  // Renderiza el componente
  return (
    <div>
      <Navbar />
      <div className='comercio-container'>
        {errorMessage && <div>Error: {errorMessage}</div>}
        {comercios.map((comercio) => (
          <div className='content-container' key={comercio.id} style={{ display: 'flex', flexDirection: 'column' }}>
            <h1>{comercio.nombreComercio}</h1>
            <button onClick={() => handleInfoClick(comercio.cif)}>Ver más información</button>
          </div>
        ))}
      </div>
    </div>
  );
};

// Exporta el componente GuestUserPage
export default GuestUserPage;
