import React from 'react';
import { Link } from 'react-router-dom';

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

const PokemonCard = ({ pokemon }) => {
  if (!pokemon) return null;

  const mainType = pokemon.types[0].type.name;
  const bgColor = typeColors[mainType] || '#ccc';

  return (
    <Link to={`/pokemon/${pokemon.id}`} className="pokemon-card" style={{ background: bgColor }}>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      <h3>{pokemon.name}</h3>
    </Link>
  );
};

export default PokemonCard;
