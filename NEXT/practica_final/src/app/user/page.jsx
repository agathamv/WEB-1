"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import './style.css';

const UserPage = () => {
  const [nombreUsuario, setNombreUsuario] = useState('');
  const [comercios, setComercios] = useState([]);
  const router = useRouter();
  const [evaluarComercio, setEvaluarComercio] = useState(null);
  const [puntuacion, setPuntuacion] = useState('');
  const [resena, setResena] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [permiteRecibirOfertas, setPermiteRecibirOfertas] = useState(true);
  const [modoEdicion, setModoEdicion] = useState(false);

  useEffect(() => {
    const storedNombreUsuario = localStorage.getItem('nombreUsuario');
    const storedPermiteRecibirOfertas = localStorage.getItem('permiteRecibirOfertas');
    setPermiteRecibirOfertas(storedPermiteRecibirOfertas === 'si');

    if (storedNombreUsuario) {
      setNombreUsuario(storedNombreUsuario);

    }

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

  const handlePuntuar = (comercio) => {
    localStorage.setItem('evaluarComercio', JSON.stringify(comercio));
    setEvaluarComercio(comercio);
  };

  const handleGuardarEvaluacion = async () => {
    try {
      const storedComercio = JSON.parse(localStorage.getItem('evaluarComercio'));

      if (!storedComercio) {
        console.error('No se encontró el comercio para evaluar.');
        return;
      }

      const updatedComercios = comercios.filter((c) => c.id !== storedComercio.id);

      const updatedComercio = {
        ...storedComercio,
        puntuaciones: [...storedComercio.puntuaciones, puntuacion],
        reseñas: [...storedComercio.reseñas, resena],
      };

      updatedComercios.push(updatedComercio);

      setComercios(updatedComercios);

      await fetch(`/api/comercios?cif=${storedComercio.cif}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(storedComercio),
      });

      await fetch('/api/comercios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedComercio),
      });

      setEvaluarComercio(null);
      setPuntuacion('');
      setResena('');
      localStorage.removeItem('evaluarComercio');
    } catch (error) {
      console.error('Error al actualizar la evaluación del comercio:', error);
      setErrorMessage('Error al guardar la evaluación');
    }
  };

  const filteredComercios = comercios.filter((com) => {
    const lowerSearchTerm = searchTerm.toLowerCase();
    return (
      com.nombreComercio.toLowerCase().includes(lowerSearchTerm) ||
      com.ciudad.toLowerCase().includes(lowerSearchTerm) ||
      com.actividad.toLowerCase().includes(lowerSearchTerm)
    );
  });

  const handleEditarDatos = async() => {
    router.push('/user/editarDatos');
  } ;

  const handleEliminarUsuario = async () => {
    try {
      const response = await fetch(`/api/users?nombreUsuario=${nombreUsuario}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Limpiar los datos locales y redirigir a la página de inicio u otra página deseada
        localStorage.clear();
        router.push('/'); // Reemplaza con la ruta a la que quieras redirigir
      } else {
        console.error('Error al eliminar el usuario');
      }
    } catch (error) {
      console.error('Error al enviar la solicitud de eliminación del usuario:', error);
    }
  };

  return (
    <div>
      <Navbar />
      <h1 className='userName'>Hola {nombreUsuario}</h1>
      <div className='comercio-container'>
        
        <button className='boton-editar' onClick={handleEditarDatos}>
          Editar Datos
        </button>
        
        <button className='boton-eliminar' onClick={handleEliminarUsuario}>
          Eliminar Usuario
        </button>
        
        <input
          type='text'
          placeholder='Buscar comercio...'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {filteredComercios.map((comercio) => (
          <div
            className='content-container'
            key={comercio.id}
            style={{ display: 'flex', flexDirection: 'column' }}
          >
            <h1>{comercio.nombreComercio}</h1>
            <p>
              <strong>Dirección:</strong> {comercio.direccion}
            </p>
            <p>
              <strong>Email:</strong> {comercio.email}
            </p>
            <p>
              <strong>Teléfono:</strong> {comercio.telefono}
            </p>
            <p>
              <strong>Ciudad:</strong> {comercio.ciudad}
            </p>
            <p>
              <strong>Actividad:</strong> {comercio.actividad}
            </p>
            <p>
              <strong>Texto:</strong> {comercio.texto}
            </p>
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
            <div>
              <button
                className='boton-evaluar'
                onClick={() => handlePuntuar(comercio)}
              >
                Evaluar comercio
              </button>
            </div>
            {evaluarComercio && evaluarComercio.id === comercio.id && (
              <div>
                <label>
                  Puntuación:
                  <input
                    type='text'
                    value={puntuacion}
                    onChange={(e) => setPuntuacion(e.target.value)}
                  />
                </label>
                <label>
                  Reseña:
                  <input
                    type='text'
                    value={resena}
                    onChange={(e) => setResena(e.target.value)}
                  />
                </label>
                <button onClick={handleGuardarEvaluacion} className='boton-guardar' >Guardar</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserPage;
