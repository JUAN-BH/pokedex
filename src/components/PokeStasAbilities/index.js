import React from "react";

export const PokeStasAbilities = ({ pokeToDisplay }) => {
  return (
    <div className="pokemonDetails__details__sa">
      <ul className="pokemonDetails__details__sa__stats">
        <h2>Stats</h2>
        {pokeToDisplay.stats.map((stat) => {
          return (
            <li key={stat.stat.name}>
              {stat.stat.name}: {stat.base_stat}
            </li>
          );
        })}
      </ul>
      <ul className="pokemonDetails__details__sa__abilities">
        <h2>Abilities</h2>
        {pokeToDisplay.abilities.map((ability) => {
          return <li key={ability.ability.name}>{ability.ability.name}</li>;
        })}
      </ul>
    </div>
  );
};
