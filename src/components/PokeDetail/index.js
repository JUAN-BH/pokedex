import React, { useEffect } from "react";
import "./pokemonDetails.scss";
import { VideoBackground } from "../VideoBackground";
import { usePokeData } from "../../utils/pokeData";
import { PokeEvolution } from "../PokeEvolution";
import { PokeStasAbilities } from "../PokeStasAbilities";
import { PokeBio } from "../PokeBio";

// console.log(window.location.hash);
export const PokeDetail = () => {
  const { pokemonsFound, pokeChoosen, pokeBio, getPokemonSpecies, infoEvos } =
    usePokeData();

  useEffect(() => {
    getPokemonSpecies();
  }, [pokeChoosen]);

  const pokeToDisplay =
    pokemonsFound.filter((poke) => poke.name === pokeChoosen)[0] ||
    infoEvos.filter((poke) => poke.name === pokeChoosen)[0];
  const nameUpper =
    pokeToDisplay.name.charAt(0).toUpperCase() + pokeToDisplay.name.slice(1);

  return (
    <main>
      <VideoBackground />
      <section className="pokemonDetails">
        <article className="pokemonDetails__pokemon">
          <h2 className="pokemonDetails__pokemon__name">{nameUpper}</h2>
          <h3 className="pokemonDetails__pokemon__type">
            {pokeToDisplay.types[0].type.name}
          </h3>
          <img
            src={pokeToDisplay.sprites.front_default}
            alt={nameUpper}
            className="pokemonDetails__pokemon__img"
          />
        </article>
        <article className="pokemonDetails__details">
          <PokeBio pokeBio={pokeBio} />
          <PokeStasAbilities pokeToDisplay={pokeToDisplay} />
          <PokeEvolution />
        </article>
      </section>
    </main>
  );
};
