/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import getPokeColors from '../../utils/pokeColors';
import PokeballBtn from '../PokeballBtn';

function PokemonItem({ pokemon }) {
  const navigate = useNavigate();
  const pokeType = pokemon.types[0].type.name;

  function linkToPokemon(e) {
    if (e.target.id !== 'savePokemon') {
      navigate(`/detail/${pokemon.name}`);
    }
  }

  const nameUpper =
    pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
  const { backColor } = getPokeColors(pokeType);
  const cardColorStyle = { backgroundColor: backColor };

  return (
    <article
      className="pokemonItem"
      style={cardColorStyle}
      onClick={linkToPokemon}
    >
      <PokeballBtn pokemon={pokemon} />
      <div className="pokemonItem__back">
        <img
          src={pokemon.sprites.front_default}
          alt={pokemon.name}
          className="pokemonItem__back__pokeImg"
        />
      </div>
      <div className="pokemonItem__details">
        <h2>{nameUpper}</h2>
        <p>Type: {pokemon.types[0].type.name}</p>
      </div>
    </article>
  );
}

export default PokemonItem;
