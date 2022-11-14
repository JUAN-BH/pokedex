import React from "react";
import { useNavigate } from "react-router-dom";
import { usePokeData } from "../../utils/pokeData";
import { PokeballBtn } from "../PokeballBtn";
import "./pokemon.scss";

export const Pokemon = ({ name, type, imgURL, pokemonAll }) => {
  const navigate = useNavigate();
  function linkToPokemon(e, pokemon) {
    if (e.target.id !== "savePokemon") {
      navigate(`/detail/${pokemon}`);
    }
  }

  const { colors } = usePokeData();
  const nameUpper = name.charAt(0).toUpperCase() + name.slice(1);

  function getBackColor() {
    const backColor = colors.find((color) => color.type === type).backColor;
    return backColor;
  }
  const backColor = getBackColor();
  const styles = { backgroundColor: backColor };
  return (
    <article
      className="pokemonItem"
      style={styles}
      onClick={(e) => linkToPokemon(e, name)}
    >
      <PokeballBtn pokemonAll={pokemonAll} />
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
