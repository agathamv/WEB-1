// page.js
"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import './globals.css';

export default function HomePage() {

  const [selectedOption, setSelectedOption] = useState('');
  const [usuario, setUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');
  const router = useRouter(); // Asegúrate de importar correctamente useRouter desde next/router

  const handleContinue = () => {
    if (selectedOption && usuario && contrasena) {
      switch (selectedOption) {
        case 'administrador':
          router.push('./admin');
          break;
        case 'comercio':
          router.push('./comercio');
          break;
        case 'usuarioNoRegistrado':
          router.push('./no-user');
          break;
        case 'usuarioRegistrado':
          router.push('./user');
          break;
        default:
          break;
      }
    } else {
      alert('Por favor, completa todos los campos y selecciona una opción antes de continuar.');
    }
  };

  return (
    <div className="flex flex-col min-h-screen">

    <header className="header bg-indigo-900 text-white text-center py-10">
      <div className="mx-auto flex items-center justify-center">
        <img className="h-20 w-auto mr-10" src="./logo.png" alt="Logo" />
        <h1 className="text-6xl font-bold leading-9 tracking-tight" id="titulo">City Commerce</h1>
      </div>
    </header>

      <div className="flex-1 flex items-center justify-center px-6 py-12 lg:px-8">
        <div className="sm:w-full sm:max-w-sm">
          <h2 className="text-2xl font-bold leading-9 tracking-tight text-gray-900 text-center">
            Inicie sesión
          </h2>

          <form className="space-y-6 mt-4" action="#" method="POST">
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Usuario
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Contraseña
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="tipoUsuario" className="block text-sm font-medium leading-6 text-gray-900">
                Tipo de Usuario:
              </label>
              <div className="mt-2">
                <select
                  id="tipoUsuario"
                  name="tipoUsuario"
                  onChange={(e) => setSelectedOption(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                >
                  <option value="">Selecciona una opción</option>
                  <option value="administrador">Administrador</option>
                  <option value="comercio">Comercio</option>
                  <option value="usuarioNoRegistrado">Usuario No Registrado</option>
                  <option value="usuarioRegistrado">Usuario Registrado</option>
                </select>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Iniciar Sesión
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            No tengo cuenta
          </p>
        </div>
      </div>
    </div>
  );
}
