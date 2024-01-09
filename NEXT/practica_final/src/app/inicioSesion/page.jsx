"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Head from 'next/head';
import Navbar from '../../components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function InicioPage() {
  const [selectedOption, setSelectedOption] = useState('');
  const [usuario, setUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const [formIsValid, setFormIsValid] = useState(false);
  const [fieldsDisabled, setFieldsDisabled] = useState(false);

  useEffect(() => {
    setFormIsValid(
      selectedOption && ((!fieldsDisabled && usuario && contrasena) || (fieldsDisabled && !usuario && !contrasena))
    );
  }, [selectedOption, usuario, contrasena, fieldsDisabled]);

  useEffect(() => {
    setFieldsDisabled(selectedOption === 'usuarioNoRegistrado');
    setUsuario('');
    setContrasena('');
  }, [selectedOption]);

  const handleContinue = async () => {
    try {
      if (formIsValid) {
        let apiUrl;
        switch (selectedOption) {
          case 'administrador':
            apiUrl = '/api/admin';
          break;

          case 'comercio':
            apiUrl = '/api/comercios';
          break;
          
          case 'usuarioRegistrado':
            apiUrl = '/api/users';
          break;

          case 'usuarioNoRegistrado':
          router.push('/noUser');
          return;
          
          default:
            setErrorMessage('Tipo de usuario no válido.');
          return;
        }
  
        const response = await fetch(apiUrl);
        const data = await response.json();
  
        const accountMatch =
          selectedOption === 'comercio'
            ? data.find((account) => account.cif === usuario && account.contrasena === contrasena)
            : data.find((account) => account.nombreUsuario === usuario && account.contrasena === contrasena);
  
            if (accountMatch) {
              if (selectedOption === 'comercio') {
                const cifComercio = accountMatch.cif;
            
                // Almacenar cifComercio en localStorage
                localStorage.setItem('cifComercio', cifComercio);
            
                router.push('/pagComercios');
              } else if(selectedOption === 'usuarioRegistrado'){
                const nombreUsuario = accountMatch.nombreUsuario;
            
                // Almacenar cifComercio en localStorage
                localStorage.setItem('nombreUsuario', nombreUsuario);
            
                router.push('/user');
              }else{
                router.push(`/${selectedOption}`);
              }
            } else {
              setErrorMessage('Usuario, CIF o contraseña incorrectos.');
            }
      }
    } catch (error) {
      console.error('Error al procesar la solicitud:', error);
      setErrorMessage('Error interno del servidor');
    }
  };

  return (
    <div>
      <Head>
        <title>City Commerce</title>
      </Head>

      <Navbar />

      <div className="content-container">
        <div className="login-container">
          <h1 className="title">Iniciar Sesión</h1>
          {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
          <form>
            <div className="form-group">
              <label htmlFor="tipoUsuario">Tipo de Usuario:</label>
              <select
                id="tipoUsuario"
                name="tipoUsuario"
                className="form-control"
                onChange={(e) => setSelectedOption(e.target.value)}
              >
                <option value="">Selecciona una opción</option>
                <option value="administrador">Administrador</option>
                <option value="comercio">Comercio</option>
                <option value="usuarioNoRegistrado">Usuario No Registrado</option>
                <option value="usuarioRegistrado">Usuario Registrado</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="usuario">Usuario:</label>
              <input
                type="text"
                id="usuario"
                name="usuario"
                className="form-control"
                onChange={(e) => setUsuario(e.target.value)}
                required={!fieldsDisabled}
                disabled={fieldsDisabled}
              />
            </div>

            <div className="form-group">
              <label htmlFor="contrasena">Contraseña:</label>
              <input
                type="password"
                id="contrasena"
                name="contrasena"
                className="form-control"
                onChange={(e) => setContrasena(e.target.value)}
                required={!fieldsDisabled}
                disabled={fieldsDisabled}
              />
            </div>

            <div className="d-grid gap-2 text-center">
              <button type="button" className="btn btn-primary" onClick={handleContinue}>
                Continuar
              </button>
              <button type="button" className="btn btn-secondary" id="NoCuenta" onClick={() => router.push('/registro')}>
                No tengo cuenta
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
