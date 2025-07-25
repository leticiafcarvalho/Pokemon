import axios from 'axios';

const api = axios.create({
  baseURL: 'https://pokeapi.co/api/v2/'
});

export const getPokemonList = async (offset = 0, limit = 20) => {
  try {
    const response = await api.get(`/pokemon?offset=${offset}&limit=${limit}`);
    return response.data.results;
  } catch (error) {
    console.error("Erro ao buscar lista de pokemons:", error);
    return [];
  }
};

export const getPokemon = async (nameOrId) => {
  try {
    const response = await api.get(`/pokemon/${nameOrId}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar Pokémon:", error);
    return null;
  }
};