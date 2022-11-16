import { useEffect } from "react";
import { useState } from "react";

export const usePokeBall = () => {
  const [pokemonsCatch, setPokemonsCatch] = useState([]);

  useEffect(() => {
    let pokemonsCaught = JSON.parse(localStorage.getItem("pokemonsCaught"));
    if (!Array.isArray(pokemonsCaught)) {
      pokemonsCaught = [];
      localStorage.setItem("pokemonsCaught", JSON.stringify(pokemonsCaught));
      setPokemonsCatch(pokemonsCaught);
    } else {
      localStorage.setItem("pokemonsCaught", JSON.stringify(pokemonsCaught));
      setPokemonsCatch(pokemonsCaught);
    }
  }, []);

  function catchPokemon(pokemon) {
    let pokemonsCaught = JSON.parse(localStorage.getItem("pokemonsCaught"));
    const pokemonsNames = pokemonsCaught.map((e) => e.name);

    if (!pokemonsNames.includes(pokemon.name)) {
      pokemonsCaught = [...pokemonsCaught, pokemon];
      localStorage.setItem(
        "pokemonsCaught",
        JSON.stringify([...pokemonsCaught])
      );
    } else {
      pokemonsCaught = pokemonsCaught.filter((e) => e.name !== pokemon.name);
      localStorage.setItem(
        "pokemonsCaught",
        JSON.stringify([...pokemonsCaught])
      );
    }
  }

  return { pokemonsCatch, catchPokemon, setPokemonsCatch };
};
