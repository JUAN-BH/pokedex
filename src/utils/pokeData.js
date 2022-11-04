import React, { useState } from "react";
import { useContext } from "react";
import { createContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PokeContext = createContext();
const api = axios.create({
  baseURL: "https://pokeapi.co/api/v2/",
});

export function PokeProvider({ children }) {
  const [foundPoke, setFoundPoke] = useState("");
  const [pokeChoosen, setPokeChoosen] = useState("");
  const [pokemonsFound, setPokemonsFound] = useState([]);
  const [pokeBio, setPokeBio] = useState("");

  const navigate = useNavigate();

  function pokeSelected(pokemon) {
    navigate("/detail");
    setPokeChoosen(pokemon);
  }

  async function searchPokemon() {
    try {
      const { data, status } = await api(`pokemon/${foundPoke.toLowerCase()}`);
      const searchedPokemons = pokemonsFound.map((e) => e.name);
      if (searchedPokemons.includes(data.species.name)) {
        alert(`You already have it`);
      } else {
        setPokemonsFound([...pokemonsFound, data]);
      }
      setFoundPoke("");
    } catch (error) {
      alert(`Couldn't find the pokemon: ${foundPoke}`);
    }
  }
  // https://pokeapi.co/api/v2/pokemon-species/charizard
  async function getPokemonBio() {
    try {
      const { data, status } = await api(
        `pokemon-species/${pokeChoosen.toLowerCase()}`
      );
      const bio = data.flavor_text_entries[7].flavor_text;
      setPokeBio(bio);
    } catch (error) {
      alert(error.message);
    }
  }

  const data = {
    foundPoke,
    setFoundPoke,
    pokemonsFound,
    searchPokemon,
    pokeChoosen,
    pokeSelected,
    pokeBio,
    getPokemonBio,
  };
  return <PokeContext.Provider value={data}>{children}</PokeContext.Provider>;
}

export function usePokeData() {
  const pokeData = useContext(PokeContext);
  return pokeData;
}
