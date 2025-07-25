import React, { useEffect, useState } from "react";
import { getPokemonList, getPokemon } from "../services/pokemonService";
import PokemonCard from "./PokemonCard";

function PokemonList({ searchTerm }) {
  const [pokemons, setPokemons] = useState([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);

  const loadPokemons = async () => {
    setLoading(true);

    try {
      const list = await getPokemonList(offset, 20);
      const details = await Promise.all(
        list.map(async (p) => await getPokemon(p.name))
      );

      setPokemons((prev) => [...prev, ...details]);
      setOffset((prev) => prev + 20);
    } catch (error) {
      console.error("Erro ao carregar pokemons:", error);
    }

    setLoading(false);
  };

  useEffect(() => {
    if (pokemons.length === 0) {
      loadPokemons();
    }
  }, []);

  const filteredPokemons = pokemons.filter((p) =>
    p.name.toLowerCase().includes((searchTerm || "").toLowerCase())
  );

  return (
    <div>
      <div className="pokemon-list">
        {filteredPokemons.length === 0 && !loading && (
          <p>Nenhum Pokémon encontrado</p>
        )}

        {filteredPokemons.map((p) => (
          <PokemonCard key={p.id} pokemon={p} />
        ))}

        {loading && pokemons.length === 0 && (
          <p style={{ textAlign: "center", width: "100%" }}>Carregando...</p>
        )}
      </div>

      {/* Botão carregar mais só aparece quando não tem filtro ativo */}
      <div style={{ textAlign: "center", margin: "20px" }}>
        {!loading && !searchTerm && (
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
        {loading && <p>Carregando...</p>}
      </div>
    </div>
  );
}

export default PokemonList;