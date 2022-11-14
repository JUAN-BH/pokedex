import React, { useEffect, useState } from "react";
import "./pokemonDetails.scss";
import { VideoBackground } from "../VideoBackground";
import { PokeEvolution } from "../PokeEvolution";
import { PokeStasAbilities } from "../PokeStasAbilities";
import { PokeBio } from "../PokeBio";
import { Loading } from "../Loading";
import { Modal } from "../Modal";
import { Error } from "../Error";
import { useParams } from "react-router-dom";
import { usePokeData } from "../../utils/pokeData";

export const PokeDetail = ({ pokeToDisplay }) => {
  const { slug } = useParams();
  const [typeColor, setTypeColor] = useState("");
  const {
    pokeBio,
    getPokemonSpecies,
    loading,
    colors,
    backColor,
    getBackColor,
    error,
  } = usePokeData();

  useEffect(() => {
    getTypeColor();
    getPokemonSpecies(slug);
  }, [slug]);

  const nameUpper =
    pokeToDisplay.name.charAt(0).toUpperCase() + pokeToDisplay.name.slice(1);

  getBackColor(pokeToDisplay.types[0].type.name);

  function getTypeColor() {
    const color = colors.find(
      (color) => color.type === pokeToDisplay.types[0].type.name
    );
    setTypeColor(color.typeColor);
  }

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
