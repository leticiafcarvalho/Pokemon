import React, { useEffect, useState } from 'react';
import { getPokemonList, getPokemon } from '../services/pokemonService';
import PokemonCard from './PokemonCard';

function PokemonList({ searchTerm }) {
  const [pokemons, setPokemons] = useState([]); // lista paginada
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState(null);

  // Carregar pokemons da lista paginada
  const loadPokemons = async () => {
    setLoading(true);
    try {
      const list = await getPokemonList(offset, 30);
      const details = await Promise.all(list.map((p) => getPokemon(p.name)));

      // evita duplicados
      setPokemons((prev) => {
        const newList = [...prev, ...details];
        return newList.filter(
          (p, index, self) => index === self.findIndex((x) => x.id === p.id)
        );
      });

      setOffset((prev) => prev + 30);
    } catch (error) {
      console.error("Erro ao carregar pokemons:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadPokemons();
  }, []);

  // Efeito de busca
  useEffect(() => {
    if (!searchTerm) {
      setSearchResults(null);
      return;
    }

    const term = searchTerm.toLowerCase();

    // busca parcial na lista carregada
    const localMatches = pokemons.filter(
      (p) =>
        p.name.toLowerCase().includes(term) ||
        p.id.toString() === term
    );

    // se encontrou na lista local, usa ela
    if (localMatches.length > 0) {
      setSearchResults(localMatches);
      return;
    }

    // senão tenta buscar diretamente na API
    const fetchFromAPI = async () => {
      setLoading(true);
      try {
        const result = await getPokemon(term);
        setSearchResults(result ? [result] : []);
      } catch (err) {
        setSearchResults([]);
      }
      setLoading(false);
    };

    fetchFromAPI();
  }, [searchTerm, pokemons]);

  // Decide qual lista mostrar
  const listToShow = searchResults !== null ? searchResults : pokemons;

  return (
    <div>
      <div className="pokemon-list">
        {!loading && listToShow.length === 0 && (
          <p>Nenhum Pokémon encontrado.</p>
        )}

        {listToShow.map((p) => (
          <PokemonCard key={p.id} pokemon={p} />
        ))}

        {loading && <p style={{ textAlign: "center", width: "100%" }}>Carregando...</p>}
      </div>

      {/* Botão só aparece se não estiver buscando */}
      {searchResults === null && (
        <div style={{ textAlign: "center", margin: "20px" }}>
          {!loading && (
            <button
              onClick={loadPokemons}
              style={{
                background: "#ffcb05",
                border: "none",
                padding: "10px 20px",
                borderRadius: "8px",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              Carregar mais
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default PokemonList;