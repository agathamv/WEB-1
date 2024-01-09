// formulario/page.jsx
"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import '../style.css';

// ...

const FormularioPage = () => {
  const [cifComercio, setCifComercio] = useState(null);
  const [ciudad, setCiudad] = useState('');
  const [actividad, setActividad] = useState('');
  const [fotos, setFotos] = useState([]);
  const [nuevaFoto, setNuevaFoto] = useState('');
  const [texto, setTexto] = useState('');
  const [guardadoExitoso, setGuardadoExitoso] = useState(false);

  const router = useRouter();

  useEffect(() => {
    // Obtener y cargar datos del comercio al cargar la página
    const storedCifComercio = localStorage.getItem('cifComercio');
    setCifComercio(storedCifComercio);

    if (storedCifComercio) {
      fetch(`/api/comercios?cif=${storedCifComercio}`)
        .then(response => response.json())
        .then(data => {
          setCiudad(data.ciudad || '');
          setActividad(data.actividad || '');
          setFotos(data.fotos || []);
          setTexto(data.texto || '');
        })
        .catch(error => {
          console.error('Error al obtener información del comercio:', error);
        });
    }
  }, []);

  const handleRemoveFoto = (indexToRemove) => {
    setFotos((prevFotos) => prevFotos.filter((_, index) => index !== indexToRemove));
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      // Eliminar foto temporal antes de enviar la solicitud
      const existingDataResponse = await fetch(`/api/comercios?cif=${cifComercio}`);
      const existingData = await existingDataResponse.json();
  
      await fetch(`/api/comercios?cif=${cifComercio}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(existingData),
      });
  
      // Agregar la nueva foto y otros datos al array (si hay una nueva foto)
      const newData = {
        ...existingData,
        ciudad,
        actividad,
        fotos: nuevaFoto ? [...fotos, nuevaFoto] : [...fotos], // Validación para evitar cadena vacía
        texto,
      };
  
      // Enviar la solicitud POST con los datos actualizados
      await fetch('/api/comercios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newData),
      });
  
      setGuardadoExitoso(true);
  
      // Redirigir después de 2 segundos
      setTimeout(() => {
        router.push('/pagComercios');
      }, 2000);
    } catch (error) {
      console.error('Error al enviar datos al servidor:', error);
    }
  };
  

  return (
    <div>
      <Navbar/>

      <div className="formulario-container">
        {guardadoExitoso && (
          <div className="alert alert-success mt-3">
            Guardado exitoso. Redirigiendo...
          </div>
        )}

        <div className="content-container white-bg">
          <form onSubmit={handleSubmit}>
            <label htmlFor="ciudad">Ciudad:</label>
            <input type="text" id="ciudad" value={ciudad} onChange={(e) => setCiudad(e.target.value)} />

            <label htmlFor="actividad">Actividad:</label>
            <input type="text" id="actividad" value={actividad} onChange={(e) => setActividad(e.target.value)} />

            <label htmlFor="fotos">Fotos:</label>
            {fotos.map((foto, index) => (
              <div key={index}>
                {foto}
                <button type="button" onClick={() => handleRemoveFoto(index)}>
                  Eliminar
                </button>
              </div>
            ))}
            <input type="text" id="nuevaFoto" value={nuevaFoto} onChange={(e) => setNuevaFoto(e.target.value)} />
            <button type="button" onClick={() => setFotos([...fotos, nuevaFoto])}>
              Agregar Foto
            </button>

            <label htmlFor="texto">Texto:</label>
            <input id="texto" value={texto} onChange={(e) => setTexto(e.target.value)} />

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
