import React from "react";
import { usePokeData } from "../../utils/pokeData";
import "./pokemon.scss";

export const Pokemon = ({ name, type, imgURL }) => {
  const { pokeSelected } = usePokeData();
  const nameUpper = name.charAt(0).toUpperCase() + name.slice(1);

  return (
    <article className="pokemonItem" onClick={() => pokeSelected(name)}>
      <div className="pokemonItem__back">
        <img src={imgURL} alt={name} className="pokemonItem__back__pokeImg" />
      </div>
      <div className="pokemonItem__details">
        <h2>{nameUpper}</h2>
        <p>Type: {type}</p>
      </div>
    </article>
  );
};
