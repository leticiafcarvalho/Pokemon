import React, { useEffect, useState } from 'react';
import { getPokemonList, getPokemon } from '../services/pokemonService';
import PokemonCard from './PokemonCard';

function PokemonList({ searchTerm }) {
  const [pokemons, setPokemons] = useState([]); // pokémons com detalhes
  const [allPokemonNames, setAllPokemonNames] = useState([]); // todos nomes (para busca parcial)
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState(null);

  // 🔹 Carrega todos nomes uma vez (apenas name/url)
  const loadAllPokemonNames = async () => {
    if (allPokemonNames.length > 0) return; // já carregou
    const all = await getPokemonList(0, 1302); // pega todos da API (somente nomes/urls)
    setAllPokemonNames(all);
  };

  // 🔹 Carrega lista paginada com detalhes
  const loadPokemons = async () => {
    setLoading(true);
    try {
      const list = await getPokemonList(offset, 30);
      const details = await Promise.all(list.map((p) => getPokemon(p.name)));

      // evita duplicados
      setPokemons((prev) =>
        [...prev, ...details].filter(
          (p, index, self) => index === self.findIndex((x) => x.id === p.id)
        )
      );

      setOffset((prev) => prev + 30);
    } catch (error) {
      console.error("Erro ao carregar pokemons:", error);
    }
    setLoading(false);
  };

  // Carregamento inicial
  useEffect(() => {
    loadPokemons();
    loadAllPokemonNames();
  }, []);

  // Busca
  useEffect(() => {
    if (!searchTerm) {
      setSearchResults(null);
      return;
    }

    const term = searchTerm.toLowerCase();

    // 🔹 Busca parcial pelos nomes de todos Pokémon
    const matches = allPokemonNames.filter((p) =>
      p.name.toLowerCase().includes(term)
    );

    if (matches.length > 0) {
      // carrega detalhes de todos os encontrados
      const fetchDetails = async () => {
        setLoading(true);
        const details = await Promise.all(matches.map((p) => getPokemon(p.name)));
        setSearchResults(details);
        setLoading(false);
      };
      fetchDetails();
      return;
    }

    // 🔹 Se não achou parcial, tenta buscar exato (nome/id)
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
  }, [searchTerm, allPokemonNames]);

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

        {loading && (
          <p style={{ textAlign: "center", width: "100%" }}>Carregando...</p>
        )}
      </div>

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