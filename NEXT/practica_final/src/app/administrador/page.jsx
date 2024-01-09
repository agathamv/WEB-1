"use client"
// pages/administrador/adminPage.jsx
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Head from 'next/head';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';
import Navbar from '@/components/Navbar';

const AdminPage = () => {
  const router = useRouter();

  const handleRegistrarComercio = () => {
    router.push('administrador/registroComercio');
  };

  const handleConsultarComercio = () => {
    // Lógica para redirigir a la página de consulta de comercio
    router.push('administrador/consultarComercios');
  };

  return (
    <div>
      <Head>
        <title>City Commerce</title>
      </Head>

      <Navbar/>

      <div className='title text-center'>
        <h2>Panel de Administrador</h2>
        <p>¡Bienvenido!</p>
        <p>Aquí podrás añadir un nuevo comercio o consultar comercios ya creados, donde podrás eliminarlos o buscar por nombre.</p>
      </div>

      <div className="content-container d-flex justify-content-center align-items-center">

        <div className="row">
          <div className="col-md-6">
            <div className="admin-button-container white-bg d-flex justify-content-center align-items-center">
              <button type="button" className="btn-admin" onClick={handleRegistrarComercio}>
                Registrar un Comercio
              </button>
            </div>
          </div>

          <div className="col-md-6">
            <div className="admin-button-container white-bg d-flex justify-content-center align-items-center">
              <button type="button" className="btn-admin" onClick={handleConsultarComercio}>
                Consultar un Comercio
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default AdminPage;
