import React from "react";
import { usePokeData } from "../../utils/pokeData";
import searchIcon from "../../assets/icons/searchIconsvg.svg";
export const Searcher = () => {
  const { foundPoke, setFoundPoke, searchPokemon } = usePokeData();

  function search(e) {
    e.preventDefault();
    const valueInput = e.target.searchPoke.value;
    setFoundPoke(valueInput.toLowerCase());
    searchPokemon();
  }
  return (
    <form className="menuHeader__searchSection" onSubmit={search}>
      <input
        name="searchPoke"
        type="text"
        placeholder="Search your pokemon"
        required
        value={foundPoke}
        onChange={(e) => setFoundPoke(e.target.value)}
      />
      <button type="submit">
        <img src={searchIcon} alt="search icon" />
      </button>
    </form>
  );
};
