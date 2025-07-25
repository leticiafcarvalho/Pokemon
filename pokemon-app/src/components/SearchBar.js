import React from 'react';

const SearchBar = ({ search, setSearch, toggleTheme, theme }) => {
  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Buscar Pokémon..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button onClick={toggleTheme}>
        {theme === 'light' ? '🌙 Modo Escuro' : '☀️ Modo Claro'}
      </button>
    </div>
  );
};

export default SearchBar;