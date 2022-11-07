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
                <div className="backImg">
                  <img src={pokemon.sprites.front_default} alt={pokemon.name} />
                </div>
                <h3>{pokemon.name}</h3>
              </li>
            );
          }
        })}
      </ul>
    </div>
  );
};
