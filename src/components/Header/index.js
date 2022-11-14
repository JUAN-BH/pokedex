import React from "react";
import "./header.scss";
import { useNavigate } from "react-router-dom";
import { Searcher } from "../Searcher";
import pokeball from "../../assets/icons/e7cde7fd0b8b992d7b74d2580a70b624.png";

export const Header = () => {
  const navigate = useNavigate();

  function home() {
    navigate("/");
  }

  return (
    <header>
      <nav className="menuHeader">
        <section className="menuHeader__titleCon" onClick={home}>
          <img
            src={pokeball}
            alt="Pokeball"
            className="menuHeader__titleCon__icon"
          />
          <h1 className="menuHeader__titleCon__title">Pokemon</h1>
        </section>
        {!window.location.hash.includes("#/detail") && <Searcher />}
      </nav>
    </header>
  );
};
