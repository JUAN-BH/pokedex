import React from 'react';

function PokeStasAbilities({ pokemon }) {
  return (
    <div className="pokemonDetails__details__sa">
      <ul className="pokemonDetails__details__sa__stats">
        <h2>Stats</h2>
        {pokemon.stats.map((stat) => (
          <li key={stat.stat.name}>
            {stat.stat.name}:{stat.base_stat}
          </li>
        ))}
      </ul>
      <ul className="pokemonDetails__details__sa__abilities">
        <h2>Abilities</h2>
        {pokemon.abilities.map((ability) => (
          <li key={ability.ability.name}>{ability.ability.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default PokeStasAbilities;
