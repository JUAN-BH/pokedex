import { useEffect } from 'react';
import { useInitialState } from '../context/initalStateContext';

const usePokeBall = () => {
  const { state, dispatch } = useInitialState();
  const { pokemonsDisplay } = state;

  useEffect(() => {
    let pokemonsInLS = JSON.parse(localStorage.getItem('pokemonsCaught'));
    if (!Array.isArray(pokemonsInLS)) {
      pokemonsInLS = [];
      localStorage.setItem('pokemonsCaught', JSON.stringify(pokemonsInLS));
    }
  }, []);

  function catchPokemon({ pokemon } = {}) {
    const pokemonsInLS = JSON.parse(localStorage.getItem('pokemonsCaught'));
    const pokemonsNames = pokemonsInLS.map((poke) => poke.name);

    if (!pokemonsNames.includes(pokemon.name)) {
      const catchPokemonArr = [...pokemonsInLS, pokemon];
      localStorage.setItem(
        'pokemonsCaught',
        JSON.stringify([...catchPokemonArr]),
      );
      const pokemonsDisplayedNames = pokemonsDisplay.map((poke) => poke.name);
      if (!pokemonsDisplayedNames.includes(pokemon.name)) {
        dispatch({ type: 'ADD_POKEMON', payload: pokemon });
      }
    } else {
      const freePokemon = pokemonsInLS.filter((e) => e.name !== pokemon.name);
      localStorage.setItem('pokemonsCaught', JSON.stringify([...freePokemon]));
    }
  }

  return { catchPokemon };
};

export default usePokeBall;
