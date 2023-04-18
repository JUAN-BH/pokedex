/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import pokeballInactive from '../../assets/icons/pokeball_inactive.png';
import pokeballActive from '../../assets/icons/pokeball_active.png';
import usePokeBall from '../../hooks/usePokeBall';

function PokeballBtn({ pokemon, where = '' }) {
  const { catchPokemon } = usePokeBall();
  const [pokeball, setPokeball] = React.useState(false);

  React.useEffect(() => {
    const pokeCoughtNames = JSON.parse(
      localStorage.getItem('pokemonsCaught'),
    ).map((poke) => poke.name);
    setPokeball(pokeCoughtNames.includes(pokemon.name));
  }, [pokemon.name]);

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
      onClick={() => catchPokemon({ pokemon, where })}
    >
      <img
        className="pokemonItem__pokeball__btn"
        onClick={pokeballToggle}
        src={pokeball ? pokeballActive : pokeballInactive}
        alt="pokeball"
        id="savePokemon"
      />
    </div>
  );
}
export default PokeballBtn;
