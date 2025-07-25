import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPokemon } from '../services/pokemonService';

const typeColors = {
  fire: '#f08030',
  water: '#6890f0',
  grass: '#78c850',
  electric: '#f8d030',
  bug: '#a8b820',
  poison: '#a040a0',
  normal: '#a8a878',
  ground: '#e0c068',
  fairy: '#ee99ac',
  fighting: '#c03028',
  psychic: '#f85888',
  rock: '#b8a038',
  ghost: '#705898',
  ice: '#98d8d8',
  dragon: '#7038f8'
};

const PokemonDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    const loadPokemon = async () => {
      const data = await getPokemon(id);
      setPokemon(data);
    };
    loadPokemon();
  }, [id]);

  if (!pokemon) return <div style={{ textAlign: 'center', marginTop: '50px' }}>Carregando...</div>;

  const mainType = pokemon.types[0].type.name;
  const bgColor = typeColors[mainType] || '#ccc';

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '40px', padding: '10px' }}>
      <div style={{
        background: bgColor,
        padding: '30px',
        borderRadius: '20px',
        width: '500px',
        maxWidth: '95%',
        boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
        textAlign: 'center'
      }}>
        
        {/* Botão voltar */}
        <button
          onClick={() => navigate(-1)}
          style={{
            background: 'rgba(255,255,255,0.2)',
            border: 'none',
            padding: '8px 15px',
            borderRadius: '8px',
            cursor: 'pointer',
            color: '#fff',
            fontWeight: 'bold',
            marginBottom: '15px'
          }}
        >
          ⬅ Voltar
        </button>

        <h2 style={{
          color: '#fff',
          textTransform: 'capitalize',
          fontSize: '28px',
          margin: '15px 0'
        }}>
          {pokemon.name}
        </h2>

        <img
          src={pokemon.sprites.other['official-artwork'].front_default}
          alt={pokemon.name}
          style={{ width: '230px', height: '230px' }}
        />

        <p style={{ color: '#fff', marginTop: '10px' }}><strong>ID:</strong> {pokemon.id}</p>
        <p style={{ color: '#fff' }}>Altura: {pokemon.height}</p>
        <p style={{ color: '#fff' }}>Peso: {pokemon.weight}</p>
        <p style={{ color: '#fff' }}>Tipos: {pokemon.types.map(t => t.type.name).join(', ')}</p>

        {/* Barra de stats */}
        <div style={{ marginTop: '20px', textAlign: 'left' }}>
          {pokemon.stats.map((stat, i) => (
            <div key={i} style={{ marginBottom: '12px' }}>
              <span style={{ color: '#fff', fontWeight: '600', display: 'block' }}>
                {stat.stat.name} ({stat.base_stat})
              </span>
              <div style={{
                background: 'rgba(255,255,255,0.3)',
                height: '10px',
                borderRadius: '5px',
                overflow: 'hidden'
              }}>
                <div style={{
                  width: `${Math.min(stat.base_stat, 100)}%`,
                  height: '100%',
                  background: '#fff'
                }} />
              </div>
            </div>
          ))}
        </div>

        {/* Navegação anterior/próximo */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '25px' }}>
          <button
            onClick={() => navigate(`/pokemon/${parseInt(id) - 1}`)}
            disabled={parseInt(id) <= 1}
            style={{
              background: '#fff',
              padding: '8px 15px',
              borderRadius: '8px',
              cursor: 'pointer',
              border: 'none',
              opacity: parseInt(id) <= 1 ? 0.5 : 1
            }}
          >
            ◀ Anterior
          </button>

          <button
            onClick={() => navigate(`/pokemon/${parseInt(id) + 1}`)}
            style={{
              background: '#fff',
              padding: '8px 15px',
              borderRadius: '8px',
              cursor: 'pointer',
              border: 'none'
            }}
          >
            Próximo ▶
          </button>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetails;