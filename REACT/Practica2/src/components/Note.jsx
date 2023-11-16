// En el componente Note.jsx

import React from 'react';

function Note({ index, title, content, onDelete }) {
  const handleDelete = () => {
    onDelete(index);
  };

  return (
    <div className="note">
      <h3>{title}</h3>
      <p>{content}</p>
      <button className="note-delete-button" onClick={handleDelete}>
        Eliminar
      </button>
    </div>
  );
}

export default Note;
