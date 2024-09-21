import React, { useState } from 'react';

function SearchBar({ onSearch }) {
  const [city, setCity] = useState('');

  const handleSearch = () => {
    if (typeof onSearch === 'function') {
      onSearch(city);
    } else {
      console.error('onSearch non è una funzione');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="search-bar-container">
      <div className="logo-container">
        <img className='logo' src="./src/assets/logo.png" alt="" srcSet="" />
      </div>
      <div className="search-bar">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={handleKeyDown} // Aggiungi gestore per il tasto Invio
          placeholder="Type a City and press Enter"
        />
      </div>
    </div>
  );
}

export default SearchBar;
