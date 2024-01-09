"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import '../style.css';

const FormularioPage = () => {
  const [nombreUsuario, setNombreUsuario] = useState('');
  const [ciudad, setCiudad] = useState('');
  const [intereses, setIntereses] = useState('');
  const [permiteRecibirOfertas, setPermiteRecibirOfertas] = useState('');
  const [guardadoExitoso, setGuardadoExitoso] = useState(false);

  const router = useRouter();

  useEffect(() => {
    // Obtener y cargar datos del usuario al cargar la página
    const storedNombreUsuario = localStorage.getItem('nombreUsuario');
    setNombreUsuario(storedNombreUsuario);

    if (storedNombreUsuario) {
      fetch(`/api/users?nombreUsuario=${storedNombreUsuario}`)
        .then(response => response.json())
        .then(data => {
          setCiudad(data.ciudad || '');
          setIntereses(data.intereses || '');
          setPermiteRecibirOfertas(data.permiteRecibirOfertas || '');
        })
        .catch(error => {
          console.error('Error al obtener información del usuario:', error);
        });
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Obtener datos existentes del usuario
      const existingDataResponse = await fetch(`/api/users?nombreUsuario=${nombreUsuario}`);
      if (existingDataResponse.ok) {
        const existingData = await existingDataResponse.json();


        // Eliminar el usuario existente
        await fetch(`/api/users?nombreUsuario=${nombreUsuario}`, {
          method: 'DELETE',
        });

        const newData = {
            ...existingData,
            ciudad,
            intereses,
            permiteRecibirOfertas,
          };

        // Enviar la solicitud POST para actualizar los datos
        await fetch('/api/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newData),
        });

        setGuardadoExitoso(true);

        
      } else {
        console.error('Error al obtener datos existentes del usuario');
      }
    } catch (error) {
      console.error('Error al enviar datos al servidor:', error);
    }
  };

  return (
    <div>
      <Navbar />

      <div className="formulario-container">
        {guardadoExitoso && (
          <div className="alert alert-success mt-3">
            Guardado exitoso
          </div>
        )}

        <div className="content-container white-bg">
          <form onSubmit={handleSubmit}>
            <label htmlFor="ciudad">Ciudad:</label>
            <input type="text" id="ciudad" value={ciudad} onChange={(e) => setCiudad(e.target.value)} />

            <label htmlFor="intereses">Intereses:</label>
            <input type="text" id="intereses" value={intereses} onChange={(e) => setIntereses(e.target.value)} />

            
            <label htmlFor="permiteRecibirOfertas">Permite recibir ofertas:</label>
            <select
              id="permiteRecibirOfertas"
              className="form-control"
              value={permiteRecibirOfertas}
              onChange={(e) => setPermiteRecibirOfertas(e.target.value)}
            >
              <option value="si">Sí</option>
              <option value="no">No</option>
            </select>

            <div>
              <button className='btn-guardar' type="submit">Guardar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormularioPage;
