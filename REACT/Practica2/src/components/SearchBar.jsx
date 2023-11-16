import React, { useState } from 'react';

function SearchBar({ onSearch }) {
  const [term, setTerm] = useState('');

  const handleInputChange = (e) => {
    setTerm(e.target.value);
  };

  const handleSearch = () => {
    onSearch(term);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Buscar notas..."
        value={term}
        onChange={handleInputChange}
      />
      <button onClick={handleSearch}>Buscar</button>
    </div>
  );
}

export default SearchBar;
