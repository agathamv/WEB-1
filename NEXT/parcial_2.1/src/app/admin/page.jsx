'use client'
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import "../LogIn.css"


const AdminLoginPage = () => {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [mensaje, setMensaje] = useState('');

  const router = useRouter();
  
  const handleLogin = async () => {
    console.log(user)
    console.log(pass)
    const result = await fetch('/api/admin', {
      method: 'POST',
      body: JSON.stringify({ user, pass }),
      headers: {
        'Content-type': 'application/json',
      },
    });

    const data = await result.json();

    if (data.message === 'OK') {

      setMensaje('Usuario Correcto');

      router.push('/admin/registrar');

    } else {
      setMensaje('ERROR, intente con otro nombre de usuario u otra contraseña');
      setPass('');
      setUser('');
    }
  };

  return (
    <div>
      <h1>Admin Login</h1>
      <label>User:</label>
      <input type="text" value={user} onChange={(e) => setUser(e.target.value)} />
      <label>Password:</label>
      <input type="password" value={pass} onChange={(e) => setPass(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
      <div>
        {mensaje}

      </div>
    </div>
  );
};

export default AdminLoginPage;