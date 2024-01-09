// pagComercios/page.jsx
"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; 
import Head from 'next/head';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '@/components/Navbar';
import './style.css';

const ComerciosPage = () => {
  const [comercio, setComercio] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [showReviews, setShowReviews] = useState(false);
  const [usersWithOffers, setUsersWithOffers] = useState([]);
  const [showUsersWithOffers, setShowUsersWithOffers] = useState(false); // Agregado el estado
  const router = useRouter();

  useEffect(() => {
    const cifComercio = localStorage.getItem('cifComercio');

    if (!cifComercio) {
      setErrorMessage('CIF de comercio no encontrado en el localStorage');
      return;
    }

    fetch(`/api/comercios?cif=${cifComercio}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Error en la solicitud GET: ${response.status} - ${response.statusText}`);
        }
        return response.json();
      })
      .then(data => {
        if (data) {
          setComercio(data);
        } else {
          setErrorMessage('No se encontró información del comercio');
        }
      })
      .catch(error => {
        console.error('Error al obtener información del comercio:', error);
        setErrorMessage('Error interno del servidor');
      });

    fetch(`/api/users?recibirOfertas=si`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Error en la solicitud GET: ${response.status} - ${response.statusText}`);
        }
        return response.json();
      })
      .then(data => {
        if (data) {
          setUsersWithOffers(data);
        }
      })
      .catch(error => {
        console.error('Error al obtener la lista de usuarios con recibir ofertas:', error);
      });
  }, []);

  const handleIrAEditarFormulario = () => {
    router.push('/pagComercios/formulario');
  };

  const handleMostrarUsuarios = async () => {
    try {
      const response = await fetch(`/api/users?permiteRecibirOfertas=si`);
      const data = await response.json();
  
      if (data) {
        // Filtrar solo los usuarios que tienen la opción de recibir ofertas en "SI"
        const usersWithOffers = data.filter(user => user.permiteRecibirOfertas === 'si');
  
        setUsersWithOffers(usersWithOffers);
        setShowUsersWithOffers(!showUsersWithOffers);
      }
    } catch (error) {
      console.error('Error al obtener la lista de usuarios con recibir ofertas:', error);
    }
  };
  
  return (
    <div>
      <Head>
        <title>Consultar Comercios</title>
      </Head>

      <Navbar/>

      <div className="content-container">
        <div className="consultar-container white-bg">
          <div className="titleR">
            <h2>{comercio ? `Bienvenido ${comercio.nombreComercio}` : 'Cargando...'}</h2>
          </div>
          {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

          <div className="comerce-container">
            <div className="row">
              <div className="col-md-6 d-flex justify-content-center align-items-center">
                {comercio && (
                  <div>
                    <h3>Información del comercio:</h3>
                    <ul>
                      <li className='datos'><strong>Nombre:</strong> {comercio.nombreComercio}</li>
                      <li className='datos'><strong>Ciudad:</strong> {comercio.ciudad}</li>
                      <li className='datos'><strong>Actividad:</strong> {comercio.actividad}</li>
                      
                      <li className='datos'>
                        <strong>Fotos:</strong>
                        <div className="foto-container">
                          {comercio.fotos && comercio.fotos.length > 0 && (
                            comercio.fotos.map((foto, index) => (
                              <img key={index} src={foto} alt={`Foto ${index + 1}`} style={{ maxWidth: '100%', maxHeight: '200px', margin: '5px' }} />
                            ))
                          )}
                        </div>
                      </li>

                      <li className='datos'><strong>Texto:</strong> {comercio.texto}</li>
                      <button onClick={handleIrAEditarFormulario} className='btn-editar mt-3'>Editar Formulario</button>
                    </ul>
                  </div>
                )}
              </div>

              <div className="col-md-6 d-flex flex-column align-items-center">
                <button className='btn-reseñas' onClick={() => setShowReviews(!showReviews)}>
                  {showReviews ? 'Ocultar Reseñas' : 'Ver Reseñas y Puntuaciones'}
                </button>

                {comercio && (
                  <div>
                    {showReviews && (
                      <div>
                        <h3>Reseñas y Puntuaciones:</h3>
                        <ul>
                          <li className='datos'>
                            <strong>Puntuaciones:</strong> {comercio.puntuaciones.join(', ')}
                          </li>
                          <li className='datos'>
                            <strong>Reseñas:</strong> {comercio.reseñas.join(', ')}
                          </li>
                        </ul>
                      </div>
                    )}

                    <button onClick={handleMostrarUsuarios} className='btn-mostrar-usuarios mt-3'>
                      {showUsersWithOffers ? 'Ocultar Usuarios con Recibir Ofertas' : 'Mostrar Usuarios con Recibir Ofertas'}
                    </button>

                    {showUsersWithOffers && (
                      <div>
                        <h3>Usuarios:</h3>
                        <ul>
                          {usersWithOffers.map(user => (
                            <li key={user.id} className='datos'>{user.nombreUsuario}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComerciosPage;
