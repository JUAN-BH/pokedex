import React from "react";
import { useEffect } from "react";
import { usePokeData } from "../../utils/pokeData";

export const PokeEvolution = () => {
  const {
    pokeEvolutionNames,
    getEvolutionsInformations,
    pokeSelected,
    infoEvos,
    setInfoEvos,
    backColor,
  } = usePokeData();

  useEffect(() => {
    async function fetchdata(pokeNames) {
      const infoEvos = await Promise.all(
        pokeNames.map(async (pokemon) => {
          if (pokemon !== "no_evolution") {
            return await getEvolutionsInformations(pokemon);
          } else {
            return "no_evolution";
          }
        })
      );
      setInfoEvos(infoEvos);
    }
    fetchdata(pokeEvolutionNames);
  }, [pokeEvolutionNames]);

  return (
    <div className="pokemonDetails__details__evo">
      <h2>Evolutions</h2>
      <ul>
        {infoEvos.map((pokemon) => {
          if (pokemon !== "no_evolution") {
            return (
              <li key={pokemon.name} onClick={() => pokeSelected(pokemon.name)}>
                <div className="backImg" style={{ backgroundColor: backColor }}>
                  <img src={pokemon.sprites.front_default} alt={pokemon.name} />
                </div>
                <h3>
                  {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
                </h3>
              </li>
            );
          }
        })}
      </ul>
    </div>
  );
};
