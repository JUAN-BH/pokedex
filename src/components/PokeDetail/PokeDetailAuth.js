import React from "react";
import { Navigate, useParams } from "react-router-dom";
import { usePokeData } from "../../utils/pokeData";
import { PokeDetail } from "./PokeDetail";

export const PokeDetailAuth = () => {
  const { slug } = useParams();
  const { pokemonsCatch, infoEvos } = usePokeData();

  const pokeToDisplay =
    pokemonsCatch.filter((poke) => poke.name === slug)[0] ||
    infoEvos.filter((poke) => poke.name === slug)[0] ||
    null;

  if (pokeToDisplay === null) {
    return <Navigate to="/" />;
  } else {
    return <PokeDetail pokeToDisplay={pokeToDisplay} />;
  }
};
