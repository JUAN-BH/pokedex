import React from "react";
import pokeball_inactive from "../../assets/icons/pokeball_inactive.png";
import pokeball_active from "../../assets/icons/pokeball_active.png";
import { usePokeData } from "../../utils/pokeData";

export const PokeballBtn = ({ pokemonAll }) => {
  const { catchPokemon } = usePokeData();

  return (
    <div
      className="pokemonItem__pokeball"
      onClick={() => catchPokemon(pokemonAll)}
    >
      <img
        className="pokemonItem__pokeball__btn"
        src={pokeball_inactive}
        alt="pokeball"
        id="savePokemon"
      />
    </div>
  );
};
