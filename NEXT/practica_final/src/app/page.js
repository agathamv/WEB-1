"use client"

import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/navigation'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import './globals.css';

const HomePage = () => {
  const router = useRouter();

  return (
    <div className='Inicio'>

      <div className="left-container">
      <img src="/images/logo.png" className="logoInicio"/>
        <h1 id="tituloInicio">City Commerce</h1>
        <h3 id="slgn">Explorar tu mundo comercial</h3>
        <div className="btnsInicio">
          <button type="button" className="btnInicio" onClick={() => router.push('/inicioSesion')}>
            Iniciar Sesión
          </button>
          <button type="button" className="btnInicio" id="NoCuenta" onClick={() => router.push('/registro')}>
            Registrarse
          </button>
        </div>
      </div>

      <div className="right-container">
        
      </div>

    </div>
  );
};

export default HomePage;