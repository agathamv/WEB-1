"use client"

// RegistroComercioPage.js
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Head from 'next/head';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../style.css';
import { v4 as uuidv4 } from 'uuid'; // Importa uuid

const RegistroComercioPage = () => {
  const router = useRouter();

  const [nombreComercio, setNombreComercio] = useState('');
  const [cif, setCif] = useState('');
  const [direccion, setDireccion] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [formIsValid, setFormIsValid] = useState(false);

  // Validar el formulario cada vez que cambia un campo
  useEffect(() => {
    // Verifica si los campos obligatorios están llenos
    setFormIsValid(nombreComercio && cif && direccion && email && telefono);
  }, [nombreComercio, cif, direccion, email, telefono]);

  const handleRegistroComercio = async () => {
    try {
      if (formIsValid) {
        const comercioData = {
          id: uuidv4(), // Generar un ID único
          nombreComercio,
          cif,
          direccion,
          email,
          telefono,
        };

        // Almacena la información localmente
        const storedComercios = JSON.parse(localStorage.getItem('comercios')) || [];
        localStorage.setItem('comercios', JSON.stringify([...storedComercios, comercioData]));

        // Envía la solicitud POST
        const response = await fetch('/api/comercios', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(comercioData),
        });

        if (!response.ok) {
          throw new Error(`Error en la solicitud: ${response.status} - ${response.statusText}`);
        }

        const result = await response.json();
        console.log(result);

        alert(result.message);

        // Restablecer los valores de los campos después de la solicitud exitosa
        setNombreComercio('');
        setCif('');
        setDireccion('');
        setEmail('');
        setTelefono('');
      } else {
        setErrorMessage('Por favor, completa todos los campos antes de registrar el comercio.');
      }
    } catch (error) {
      console.error('Error al procesar la solicitud POST:', error);
      setErrorMessage('Error interno del servidor');
    }
  };

  return (
    <div>
      <Head>
        <title>Registro de Comercio</title>
      </Head>

      <header className="header">
        <img src="../images/logo.png" className="logo" />
        <h1 id="titulo">City Commerce</h1>
      </header>

      <div className="content-container">
        <div className="registro-container white-bg">
          <div className="titleR">
            <h2>Registro de Comercio</h2>
          </div>
          {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
          <form>
            <div className="form-group">
              <label htmlFor="nombreComercio">Nombre del Comercio:</label>
              <input
                type="text"
                id="nombreComercio"
                className="form-control"
                value={nombreComercio}
                onChange={(e) => setNombreComercio(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="cif">CIF:</label>
              <input
                type="text"
                id="cif"
                className="form-control"
                value={cif}
                onChange={(e) => setCif(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="direccion">Dirección:</label>
              <input
                type="text"
                id="direccion"
                className="form-control"
                value={direccion}
                onChange={(e) => setDireccion(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">E-mail:</label>
              <input
                type="email"
                id="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="telefono">Teléfono de Contacto:</label>
              <input
                type="tel"
                id="telefono"
                className="form-control"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
              />
            </div>
            <button type="button" className="btn btn-primary" onClick={handleRegistroComercio}>
              Registrarse
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegistroComercioPage;
