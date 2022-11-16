import React from "react";
import pokeball_inactive from "../../assets/icons/pokeball_inactive.png";
import pokeball_active from "../../assets/icons/pokeball_active.png";
import { usePokeData } from "../../utils/pokeData";

export const PokeballBtn = ({ pokemonAll }) => {
  const { catchPokemon } = usePokeData();
  const [pokeball, setPokeball] = React.useState(false);

  React.useEffect(() => {
    const pokeCoughtNames = JSON.parse(
      localStorage.getItem("pokemonsCaught")
    ).map((poke) => poke.name);
    setPokeball(pokeCoughtNames.includes(pokemonAll.name));
  }, []);

  function pokeballToggle() {
    if (pokeball) {
      setPokeball(false);
    } else {
      setPokeball(true);
    }
  }

  return (
    <div
      className="pokemonItem__pokeball"
      onClick={() => catchPokemon(pokemonAll)}
    >
      <img
        className="pokemonItem__pokeball__btn"
        onClick={pokeballToggle}
        src={pokeball ? pokeball_active : pokeball_inactive}
        alt="pokeball"
        id="savePokemon"
      />
    </div>
  );
};
