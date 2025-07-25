import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
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
  const [pokemon, setPokemon] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadPokemon = async () => {
      const data = await getPokemon(id);
      setPokemon(data);
    };
    loadPokemon();
  }, [id]);

  if (!pokemon) return <div>Carregando...</div>;

  const mainType = pokemon.types[0].type.name;
  const bgColor = typeColors[mainType] || '#ccc';

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
      <div style={{
        background: bgColor,
        padding: '30px',
        borderRadius: '16px',
        width: '500px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
        textAlign: 'center'
      }}>
        <Link to="/" style={{ color: '#fff', fontWeight: 'bold', textDecoration: 'none' }}>⬅ Voltar</Link>

        <h2 style={{ color: '#fff', textTransform: 'capitalize', fontSize: '28px', margin: '15px 0' }}>
          {pokemon.name}
        </h2>

        <img 
          src={pokemon.sprites.other['official-artwork'].front_default}
          alt={pokemon.name}
          style={{ width: '230px', height: '230px' }}
        />

        <p style={{ color: '#fff', marginTop: '10px' }}>Altura: {pokemon.height}</p>
        <p style={{ color: '#fff' }}>Peso: {pokemon.weight}</p>
        <p style={{ color: '#fff' }}>Tipos: {pokemon.types.map(t => t.type.name).join(', ')}</p>

        {/* Stats */}
        <div style={{ marginTop: '20px', textAlign: 'left' }}>
          {pokemon.stats.map((stat, i) => (
            <div key={i} style={{ marginBottom: '10px' }}>
              <span style={{ color: '#fff', fontWeight: '600' }}>{stat.stat.name}</span>
              <div style={{
                background: 'rgba(255,255,255,0.3)',
                height: '10px',
                borderRadius: '5px',
                marginTop: '4px'
              }}>
                <div style={{
                  width: `${Math.min(stat.base_stat, 100)}%`,
                  height: '100%',
                  background: '#fff',
                  borderRadius: '5px'
                }} />
              </div>
            </div>
          ))}
        </div>

        {/* Navegação */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '25px' }}>
          <button 
            onClick={() => navigate(`/pokemon/${parseInt(id) - 1}`)}
            disabled={id <= 1}
            style={{
              background: '#fff', padding: '8px 15px', borderRadius: '8px', cursor: 'pointer', border: 'none'
            }}
          >
            ◀ Anterior
          </button>
          <button 
            onClick={() => navigate(`/pokemon/${parseInt(id) + 1}`)}
            style={{
              background: '#fff', padding: '8px 15px', borderRadius: '8px', cursor: 'pointer', border: 'none'
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