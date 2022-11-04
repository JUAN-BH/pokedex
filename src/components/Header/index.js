import React from "react";
import "./header.scss";
import { usePokeData } from "../../utils/pokeData";

export const Header = () => {
  const { foundPoke, setFoundPoke, searchPokemon } = usePokeData();

  function search(e) {
    e.preventDefault();
    const valueInput = e.target.searchPoke.value;
    setFoundPoke(valueInput.toLowerCase());
    searchPokemon();
  }

  return (
    <header>
      <nav className="menuHeader">
        <section className="menuHeader__titleCon">
          <h1 className="menuHeader__titleCon__title">
            <span className="menuHeader__titleCon__title__logo"></span>
            Pokemon
          </h1>
        </section>
        <form className="menuHeader__searchSection" onSubmit={search}>
          <input
            name="searchPoke"
            type="text"
            placeholder="Search your pokemon"
            required
            value={foundPoke}
            onChange={(e) => setFoundPoke(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>
      </nav>
    </header>
  );
};
