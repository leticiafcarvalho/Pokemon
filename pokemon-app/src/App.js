import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PokemonList from './components/PokemonList';
import PokemonDetails from './pages/PokemonDetails';
import SearchBar from './components/SearchBar';
import './App.css';

function App() {
  const [search, setSearch] = useState('');
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return (
    <Router>
      <div className="container">
        <div className="header">
          <h1>Pokédex React</h1>
          <SearchBar
            search={search}
            setSearch={setSearch}
            toggleTheme={toggleTheme}
            theme={theme}
          />
        </div>
        <div className="content">
          <Routes>
            <Route path="/" element={<PokemonList searchTerm={search} />} />
            <Route path="/pokemon/:id" element={<PokemonDetails />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;