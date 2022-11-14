import React, { useState } from "react";
import { useContext } from "react";
import { createContext } from "react";
import axios from "axios";

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
  const [loading, setLoading] = useState(false);
  const [backColor, setBackColor] = useState("");
  const [error, setError] = useState(false);
  const [already, setAlready] = useState(false);

  const colors = [
    { type: "normal", typeColor: "#a8a878", backColor: "#F5F5F5" },
    { type: "fire", typeColor: "#f08030", backColor: "#FDDFDF" },
    { type: "water", typeColor: "#6890ef", backColor: "#DEF3FD" },
    { type: "grass", typeColor: "#78c850", backColor: "#DEFDE0" },
    { type: "electric", typeColor: "#f8d030", backColor: "#FCF7DE" },
    { type: "ice", typeColor: "#98d8d8", backColor: "#cce4e4" },
    { type: "fighting", typeColor: "#bf3129", backColor: "#E6E0D4" },
    { type: "poison", typeColor: "#a0409f", backColor: "#98D7A5" },
    { type: "ground", typeColor: "#dfbe68", backColor: "#F4E7DA" },
    { type: "flying", typeColor: "#a890f0", backColor: "#F5F5F5" },
    { type: "psychic", typeColor: "#f85888", backColor: "#EAEDA1" },
    { type: "bug", typeColor: "#a8b820", backColor: "#F8D5A3" },
    { type: "rock", typeColor: "#b8a038", backColor: "#D5D5D4" },
    { type: "ghost", typeColor: "#705898", backColor: "#9790a3" },
    { type: "dark", typeColor: "#705848", backColor: "#807873" },
    { type: "dragon", typeColor: "#7038f8", backColor: "#97B3E6" },
    { type: "steel", typeColor: "#b8b8d0", backColor: "#cbcbd4" },
    { type: "fairy", typeColor: "#f0b6bc", backColor: "#FCEAFF" },
  ];

  function pokeSelected(pokemon) {
    setPokeChoosen(pokemon);
  }

  async function searchPokemon() {
    try {
      setLoading(true);
      const { data } = await api(`pokemon/${foundPoke.toLowerCase()}`);
      setLoading(false);
      const searchedPokemons = pokemonsFound.map((e) => e.name);
      if (searchedPokemons.includes(data.species.name)) {
        setAlready(true);
      } else {
        setPokemonsFound([...pokemonsFound, data]);
        setFoundPoke("");
      }
    } catch (error) {
      setError(true);
      setLoading(false);
    }
  }
  async function getPokemonSpecies(slug) {
    try {
      setLoading(true);
      const { data } = await api(`pokemon-species/${slug.toLowerCase()}`);
      setLoading(false);
      const bio = data.flavor_text_entries[7].flavor_text.replace("\f", " ");
      const evoURL = data.evolution_chain.url.split("/").slice(5, 7).join("/");
      setPokeBio(bio);
      getPokemonEvolutions(evoURL);
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  }
  async function getPokemonEvolutions(evoURL) {
    try {
      setLoading(true);
      const { data } = await api(`${evoURL}`);
      setLoading(false);
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
      setLoading(false);
      setError(true);
    }
  }
  async function getEvolutionsInformations(pokemon) {
    if (pokemon !== "no_evolution") {
      try {
        const { data } = await api(`pokemon/${pokemon}`);
        return data;
      } catch (error) {
        setLoading(false);
        setError(true);
      }
    }
  }

  function getBackColor(type) {
    const backColor = colors.find((color) => color.type === type).backColor;
    setBackColor(backColor);
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
    loading,
    colors,
    backColor,
    getBackColor,
    error,
    setError,
    already,
    setAlready,
  };
  return <PokeContext.Provider value={data}>{children}</PokeContext.Provider>;
}

export function usePokeData() {
  const pokeData = useContext(PokeContext);
  return pokeData;
}
