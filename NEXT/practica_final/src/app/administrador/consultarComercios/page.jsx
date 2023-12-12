"use client"

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Head from 'next/head';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../style.css';

const ConsultarComerciosPage = () => {
  const [comercios, setComercios] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  useEffect(() => {
    // Obtener la lista de comercios al cargar la página
    fetchComercios();
  }, []);

  const fetchComercios = async () => {
    try {
      // Realizar la solicitud a la API para obtener la lista de comercios
      const response = await fetch('/api/comercios');
      const data = await response.json();

      // Actualizar el estado con la nueva lista de comercios
      setComercios(data);
    } catch (error) {
      console.error('Error al obtener la lista de comercios:', error);
      setErrorMessage('Error interno del servidor');
    }
  };

  const handleEliminarComercio = async (id) => {
    try {
      // Realizar la solicitud DELETE para eliminar el comercio
      const response = await fetch(`/api/comercios?id=${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`Error en la solicitud DELETE: ${response.status} - ${response.statusText}`);
      }

      const result = await response.json();

      // Mostrar mensaje de éxito
      console.log(result.message);

      // Actualizar la lista de comercios después de la eliminación
      fetchComercios();
    } catch (error) {
      console.error('Error al eliminar el comercio:', error);
      setErrorMessage('Error al eliminar el comercio');
    }
  };

  return (
    <div>
      <Head>
        <title>Consultar Comercios</title>
      </Head>

      <header className="header">
        <img src="/images/logo.png" className="logo" />
        <h1 id="titulo">City Commerce</h1>
      </header>

      <div className="content-container">
        <div className="consultar-container white-bg">
          <div className="titleR">
            <h2>Consultar Comercios</h2>
          </div>
          {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
          <ul className="list-group">
            {comercios.map((comercio) => (
              <li key={comercio.id} className="list-group-item">
                <strong>Nombre:</strong> {comercio.nombreComercio}
                <br />
                <strong>CIF:</strong> {comercio.cif}
                <br />
                <strong>Dirección:</strong> {comercio.direccion}
                <br />
                <strong>E-mail:</strong> {comercio.email}
                <br />
                <strong>Teléfono de Contacto:</strong> {comercio.telefono}
                <br />
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => handleEliminarComercio(comercio.id)}
                >
                  Eliminar
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ConsultarComerciosPage;
