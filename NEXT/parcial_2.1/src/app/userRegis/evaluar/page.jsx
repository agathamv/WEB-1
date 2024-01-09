'use client'
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import "../../Regis.css"

const EvaluarPage = () => {
    const [id, setId] = useState('');
    const [scoring, setScoring] = useState('');
    const [reseina, setReseina] = useState('');
    const [error, setError] = useState('');
    const [mensaje, setMensaje] = useState('');
  
    const handleSend = async () => {
      try {
        
        console.log(id)
        const result = await fetch(`/api/comercio/${id}`, {
          method: 'PUT',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify({
            id: id,
            scoring: scoring,
            reseina: reseina,
          }),
        });
  
        // Maneja la respuesta según tus necesidades
        const data = await result.json();
        console.log('Respuesta del servidor:', data);

        setMensaje('Reseña enviada');
    

      } catch (error) {
        console.error('ERROR:', error);
        setError('Error al enviar la evaluación. Por favor, inténtalo de nuevo.');
      }
    };
  
    return (
      <div className="evaluar-page">

        <h2>Evaluación de Comercio</h2>
        <form onSubmit={handleSend}>
            <div>
            <label>ID del Comercio</label>
            <input
              type="text"
              placeholder="Ingrese el ID del comercio"
              value={id}
              onChange={(e) => setId(e.target.value)}
              required
            />
            </div>
          <div >
            <label>Scoring</label>
            <input
              type="number"
              min={0}
              max={10}
              placeholder="Ingrese el Scoring"
              value={scoring}
              onChange={(e) => setScoring(e.target.value)}
              required
            />
          </div>
  
          <div >
            <label>Reseña</label>
            <input
              as="textarea"
              rows={3}
              placeholder="Ingrese la reseña"
              value={reseina}
              onChange={(e) => setReseina(e.target.value)}
              required
            />
          </div>
  
          <button >
            Enviar Evaluación
          </button>

        </form>
        <div>
          {mensaje}

        </div>
      </div>
    );
  };
  
export default EvaluarPage;