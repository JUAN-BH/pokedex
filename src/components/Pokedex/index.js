import React from "react";
import "./podex.scss";
import { Pokemon } from "../Pokemon";
import { VideoBackground } from "../VideoBackground";
import { usePokeData } from "../../utils/pokeData";

export const Pokedex = () => {
  const { pokemonsFound } = usePokeData();
  return (
    <>
      <main>
        <VideoBackground />
        <section className="pokemonsContainer">
          {pokemonsFound.map((pokemon) => {
            return (
              <Pokemon
                imgURL={pokemon.sprites.front_default}
                name={pokemon.name}
                type={pokemon.types[0].type.name}
                key={pokemon.name}
              />
            );
          })}
        </section>
      </main>
    </>
  );
};
