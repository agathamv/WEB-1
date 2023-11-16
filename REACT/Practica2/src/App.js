import React from 'react';
import NoteList from './components/NoteList';
import './App.css';
import escribirImage from './images/escribir.png'; // Importa la imagen

function App() {
  return (
    <div className="App">
      <div className="title-container">
        <h1>Mi bloc de notas</h1>
        <img src={escribirImage} alt="Escribir" />
      </div>
      <div className="content">
        <NoteList />
      </div>
    </div>
  );
}

export default App;
