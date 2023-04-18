import React from 'react';
import { Link } from 'react-router-dom';
import getPokeColors from '../../utils/pokeColors';

function EvolutionItem({ pokemon }) {
  const { backColor } = getPokeColors(pokemon.types[0].type.name);

  return (
    <Link to={`/detail/${pokemon.name}`} className="linkPoke">
      <li>
        <div className="backImg" style={{ backgroundColor: backColor }}>
          <img src={pokemon.sprites.front_default} alt={pokemon.name} />
        </div>
        <h3>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h3>
      </li>
    </Link>
  );
}

export default EvolutionItem;
