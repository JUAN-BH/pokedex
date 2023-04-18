import React from 'react';
import getPokeColors from '../../utils/pokeColors';
import PokeballBtn from '../PokeballBtn';

function PokeIntro({ pokemon }) {
  if (pokemon.name !== undefined) {
    const nameUpper =
      pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
    const pokeType = pokemon.types[0].type.name;
    const { backColor, typeColor } = getPokeColors(pokeType);
    return (
      <article
        className="pokemonDetails__pokemon"
        style={{ backgroundColor: backColor }}
      >
        <div className="pokemonDetails__pokemon__titleContainer">
          <h2
            className="pokemonDetails__pokemon__titleContainer__name"
            style={{ textShadow: `2px 2px ${typeColor}` }}
          >
            {nameUpper}
          </h2>
          <PokeballBtn pokemon={pokemon} />
        </div>
        <h3
          className="pokemonDetails__pokemon__type"
          style={{ backgroundColor: typeColor }}
        >
          {pokeType}
        </h3>
        <img
          src={pokemon.sprites.front_default}
          alt={nameUpper}
          className="pokemonDetails__pokemon__img"
        />
      </article>
    );
  }
  return <h1>error</h1>;
}
export default PokeIntro;
