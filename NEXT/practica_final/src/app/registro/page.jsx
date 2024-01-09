"use client";

import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import { useRouter } from 'next/navigation';
import Head from 'next/head';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../globals.css';

const RegistroPage = () => {
  const [tipoUsuario, setTipoUsuario] = useState('');
  const [nombre, setNombre] = useState('');
  const [nombreUsuario, setNombreUsuario] = useState('');
  const [email, setEmail] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [confirmarContrasena, setConfirmarContrasena] = useState('');
  const [edad, setEdad] = useState('');
  const [ciudad, setCiudad] = useState('');
  const [intereses, setIntereses] = useState('');
  const [permiteRecibirOfertas, setPermiteRecibirOfertas] = useState('si');
  const [errorMessage, setErrorMessage] = useState('');
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const router = useRouter();

  // Validar formulario
  const [formIsValid, setFormIsValid] = useState(false);

  useEffect(() => {
    // Verificar que las contraseñas coincidan
    if (contrasena !== '' && confirmarContrasena !== '' && contrasena !== confirmarContrasena) {
      setPasswordsMatch(false);
    } else {
      setPasswordsMatch(true);
    }

    setFormIsValid(
      (tipoUsuario === 'administrador' && nombre && nombreUsuario && email && contrasena && confirmarContrasena) ||
        (tipoUsuario === 'usuarioComun' && nombre && email && contrasena && confirmarContrasena && edad && ciudad && intereses)
    );
  }, [tipoUsuario, nombre, nombreUsuario, email, contrasena, confirmarContrasena, edad, ciudad, intereses]);

  const handleRegistro = async () => {
    let response;  // Mueve la declaración aquí
  
    if (formIsValid && passwordsMatch) {
      try {
        const cuentaData = {
          tipoUsuario,
          nombre,
          nombreUsuario,
          email,
          contrasena,
          confirmarContrasena,
          edad,
          ciudad,
          intereses,
          permiteRecibirOfertas,
        };
  
        if (tipoUsuario === 'administrador') {
          response = await fetch('/api/admin', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(cuentaData),
          });
        } else if (tipoUsuario === 'usuarioComun') {
          response = await fetch('/api/users', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(cuentaData),
          });
        }
  
        if (!response.ok) {
          throw new Error(`Error en la solicitud: ${response.status} - ${response.statusText}`);
        }
  
        const result = await response.json();
        console.log(result);
  
        router.push('/inicioSesion');
      } catch (error) {
        console.error('Error al procesar la solicitud POST:', error);
        setErrorMessage('Error interno del servidor');
      }
    } else {
      setErrorMessage('Por favor, completa todos los campos antes de continuar.');
    }
  };

  const renderFormFields = () => {
    if (tipoUsuario === 'administrador') {
      return (
        <div>
          <div className="form-group">
            <label htmlFor="nombre">Nombre completo:</label>
            <input type="text" id="nombre" className="form-control" value={nombre} onChange={(e) => setNombre(e.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="nombreUsuario">Nombre de usuario:</label>
            <input type="text" id="nombreUsuario" className="form-control" value={nombreUsuario} onChange={(e) => setNombreUsuario(e.target.value)} />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>

          <div className="form-group">
            <label htmlFor="contrasena">Contraseña:</label>
            <input
              type="password"
              id="contrasena"
              className="form-control"
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmarContrasena">Confirmar Contraseña:</label>
            <input
              type="password"
              id="confirmarContrasena"
              className="form-control"
              value={confirmarContrasena}
              onChange={(e) => setConfirmarContrasena(e.target.value)}
            />
          </div>
        </div>
      );
    } else if (tipoUsuario === 'usuarioComun') {
      return (
        <div>
          <div className="form-group">
            <label htmlFor="nombre">Nombre completo:</label>
            <input type="text" id="nombre" className="form-control" value={nombre} onChange={(e) => setNombre(e.target.value)} />
          </div>

          <div className="form-group">
            <label htmlFor="nombreUsuario">Nombre de usuario:</label>
            <input type="text" id="nombreUsuario" className="form-control" value={nombreUsuario} onChange={(e) => setNombreUsuario(e.target.value)} />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>

          <div className="form-group">
            <label htmlFor="edad">Edad:</label>
            <input type="text" id="edad" className="form-control" value={edad} onChange={(e) => setEdad(e.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="ciudad">Ciudad:</label>
            <input type="text" id="ciudad" className="form-control" value={ciudad} onChange={(e) => setCiudad(e.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="intereses">Intereses:</label>
            <input type="text" id="intereses" className="form-control" value={intereses} onChange={(e) => setIntereses(e.target.value)} />
          </div>
          <div className="form-group">
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
          </div>

          <div className="form-group">
            <label htmlFor="contrasena">Contraseña:</label>
            <input
              type="password"
              id="contrasena"
              className="form-control"
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmarContrasena">Confirmar Contraseña:</label>
            <input
              type="password"
              id="confirmarContrasena"
              className="form-control"
              value={confirmarContrasena}
              onChange={(e) => setConfirmarContrasena(e.target.value)}
            />
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <div>
      <Head>
        <title>City Commerce - Registro</title>
      </Head>

      <Navbar />

      <div className="content-container">
        <div className="login-container">
          <h1 className="title">Crear cuenta</h1>
          {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
          <form>
            <div className="form-group">
              <label htmlFor="tipoUsuario">Tipo de Usuario:</label>
              <select id="tipoUsuario" name="tipoUsuario" className="form-control" onChange={(e) => setTipoUsuario(e.target.value)}>
                <option value="">Selecciona una opción</option>
                <option value="administrador">Administrador</option>
                <option value="usuarioComun">Usuario Común</option>
              </select>
            </div>

            {renderFormFields()}

            {!passwordsMatch && <div className="alert alert-danger">Las contraseñas no coinciden.</div>}

            <div className="d-grid gap-2 text-center">
              <button type="button" className="btn btn-primary" onClick={handleRegistro}>
                Crear Cuenta
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegistroPage;
