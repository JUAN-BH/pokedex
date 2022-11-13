import React, { useEffect, useState } from "react";
import "./pokemonDetails.scss";
import { VideoBackground } from "../VideoBackground";
import { usePokeData } from "../../utils/pokeData";
import { PokeEvolution } from "../PokeEvolution";
import { PokeStasAbilities } from "../PokeStasAbilities";
import { PokeBio } from "../PokeBio";
import { Loading } from "../Loading";
import { Modal } from "../Modal";
import { Error } from "../Error";

// console.log(window.location.hash);
export const PokeDetail = () => {
  const [typeColor, setTypeColor] = useState("");
  const {
    pokemonsFound,
    pokeChoosen,
    pokeBio,
    getPokemonSpecies,
    infoEvos,
    loading,
    colors,
    backColor,
    getBackColor,
    error,
  } = usePokeData();

  useEffect(() => {
    getTypeColor();
    getPokemonSpecies();
  }, [pokeChoosen]);

  const pokeToDisplay =
    pokemonsFound.filter((poke) => poke.name === pokeChoosen)[0] ||
    infoEvos.filter((poke) => poke.name === pokeChoosen)[0];
  const nameUpper =
    pokeToDisplay.name.charAt(0).toUpperCase() + pokeToDisplay.name.slice(1);

  function getTypeColor() {
    const color = colors.find(
      (color) => color.type === pokeToDisplay.types[0].type.name
    );
    setTypeColor(color.typeColor);
  }

  getBackColor(pokeToDisplay.types[0].type.name);

  return (
    <main>
      <VideoBackground />

      {loading && (
        <Modal>
          <Loading />
        </Modal>
      )}

      {error && (
        <Modal>
          <Error
            message={`Something went wrong please try to reload the page`}
          />
        </Modal>
      )}

      <section className="pokemonDetails">
        <article
          className="pokemonDetails__pokemon"
          style={{ backgroundColor: backColor }}
        >
          <h2
            className="pokemonDetails__pokemon__name"
            style={{ textShadow: `2px 2px ${typeColor}` }}
          >
            {nameUpper}
          </h2>
          <h3
            className="pokemonDetails__pokemon__type"
            style={{ backgroundColor: typeColor }}
          >
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
