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
  const [infoEvos, setInfoEvos] = useState([]);
  const [pokeEvolutionNames, setPokeEvolutionNames] = useState([]);

  const navigate = useNavigate();

  function pokeSelected(pokemon) {
    navigate("/detail");
    setPokeChoosen(pokemon);
  }

  async function searchPokemon() {
    try {
      const { data } = await api(`pokemon/${foundPoke.toLowerCase()}`);
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
  async function getPokemonSpecies() {
    try {
      const { data } = await api(
        `pokemon-species/${pokeChoosen.toLowerCase()}`
      );
      const bio = data.flavor_text_entries[7].flavor_text.replace("\f", " ");
      const evoURL = data.evolution_chain.url.split("/").slice(5, 7).join("/");
      setPokeBio(bio);
      // setEvolutionURL(evoURL);
      getPokemonEvolutions(evoURL);
    } catch (error) {
      alert("species");
    }
  }

  async function getPokemonEvolutions(evoURL) {
    try {
      const { data } = await api(`${evoURL}`);
      const evolutions = [];
      const babyPokemon = data.chain.species.name;
      const midPokemon =
        data.chain.evolves_to[0] === undefined
          ? "no_evolution"
          : data.chain.evolves_to[0].species.name;

      let oldPokemon;
      if (midPokemon === "no_evolution") {
        oldPokemon = "no_evolution";
      } else {
        oldPokemon =
          data.chain.evolves_to[0].evolves_to[0] === undefined
            ? "no_evolution"
            : data.chain.evolves_to[0].evolves_to[0].species.name;
      }

      evolutions.push(babyPokemon);
      evolutions.push(midPokemon);
      evolutions.push(oldPokemon);
      setPokeEvolutionNames(evolutions);
    } catch (error) {
      console.log(error);
    }
  }

  async function getEvolutionsInformations(pokemon) {
    if (pokemon !== "no_evolution") {
      try {
        const { data } = await api(`pokemon/${pokemon}`);
        return data;
      } catch (error) {
        alert(error.message);
      }
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
    getPokemonSpecies,
    pokeEvolutionNames,
    getEvolutionsInformations,
    infoEvos,
    setInfoEvos,
  };
  return <PokeContext.Provider value={data}>{children}</PokeContext.Provider>;
}

export function usePokeData() {
  const pokeData = useContext(PokeContext);
  return pokeData;
}
