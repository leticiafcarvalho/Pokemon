import React from 'react';

const SearchBar = ({ search, setSearch, toggleTheme, theme }) => {
  // Limpa o campo ao pressionar ESC
  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      setSearch('');
    }
  };

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Buscar Pokémon (nome ou ID)..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button onClick={toggleTheme}>
        {theme === 'light' ? '🌙 Modo Escuro' : '☀️ Modo Claro'}
      </button>
    </div>
  );
};

export default SearchBar;