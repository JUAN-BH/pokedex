import React from "react";
import { Navigate, useParams } from "react-router-dom";
import { usePokeData } from "../../utils/pokeData";
import { PokeDetail } from "./PokeDetail";

export const PokeDetailAuth = () => {
  const { slug } = useParams();
  const { pokemonsFound, infoEvos } = usePokeData();

  const pokemonsCaught = JSON.parse(localStorage.getItem("pokemonsCaught"));

  const pokeToDisplay =
    pokemonsCaught.filter((poke) => poke.name === slug)[0] ||
    pokemonsFound.filter((poke) => poke.name === slug)[0] ||
    infoEvos.filter((poke) => poke.name === slug)[0] ||
    null;

  if (pokeToDisplay === null) {
    return <Navigate to="/" />;
  } else {
    return <PokeDetail pokeToDisplay={pokeToDisplay} />;
  }
};
