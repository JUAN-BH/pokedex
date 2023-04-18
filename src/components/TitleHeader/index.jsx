import React from 'react';
import { useNavigate } from 'react-router-dom';
import pokeball from '../../assets/icons/pokeball.png';

function TitleHeader() {
  const navigate = useNavigate();

  function home() {
    navigate('/');
  }

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
    <article className="menuHeader__titleCon" onClick={home}>
      <img
        src={pokeball}
        alt="Pokeball"
        className="menuHeader__titleCon__icon"
      />
      <h1 className="menuHeader__titleCon__title">Pokemon</h1>
    </article>
  );
}

export default TitleHeader;
