import React, { useState } from 'react';

function NoteEditor({ addNote }) {
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');

  const handleSave = () => {
    if (title.trim() !== '' && content.trim() !== '') {
      addNote(content, title);
      setContent('');
      setTitle('');
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Título"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Contenido de la nota"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button onClick={handleSave}>Guardar</button>
    </div>
  );
}

export default NoteEditor;
