import React, { useState, useEffect } from 'react';
import Note from './Note';
import NoteEditor from './NoteEditor';
import SearchBar from './SearchBar';
import 'bootstrap/dist/css/bootstrap.min.css';

function NoteList() {
  const [isEditorCompressed, setIsEditorCompressed] = useState(false);

  const [notes, setNotes] = useState(() => {
    const savedNotes = JSON.parse(localStorage.getItem('notes')) || [];
    return savedNotes;
  });

  const [filteredNotes, setFilteredNotes] = useState(notes);

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
    setFilteredNotes(notes);
  }, [notes]);

  const addNote = (content, title) => {
    const newNotes = [...notes, { content, title }];
    setNotes(newNotes);
  };

  const deleteNote = (index) => {
    const updatedNotes = notes.filter((_, i) => i !== index);
    setNotes(updatedNotes);
  };

  const handleSearch = (term) => {
    const filtered = notes.filter(
      (note) =>
        note.content.toLowerCase().includes(term.toLowerCase()) ||
        note.title.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredNotes(filtered);
  };

  
  return(
    <div>
      <SearchBar onSearch={handleSearch} />
      <div className="editor-header">
        <h2>Editor de Notas</h2>
        <button onClick={() => setIsEditorCompressed(!isEditorCompressed)} className='editor-button'>
          {isEditorCompressed ? '↓' : '↑'}
        </button>
      </div>
      

      {!isEditorCompressed && (
        <div className="note-editor">
          <NoteEditor addNote={addNote} />
        </div>
      )}

      <h2 id="Lista">Lista de Notas</h2>
      {filteredNotes.map((note, index) => (
        <Note
          key={index}
          index={index}
          content={note.content}
          title={note.title}
          onDelete={deleteNote}
        />
      ))}
    </div>
  );

}

export default NoteList;
