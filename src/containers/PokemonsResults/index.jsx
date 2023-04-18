import React from 'react';
import { useInitialState } from '../../context/initalStateContext';
import PokemonItem from '../../components/PokemonItem';

function PokemonResults() {
  const { state } = useInitialState();
  const { pokemonsDisplay } = state;

  return (
    <section className="pokemonsContainer">
      {pokemonsDisplay.length > 0 ? (
        pokemonsDisplay.map((pokemon) => (
          <PokemonItem key={pokemon.name} pokemon={pokemon} />
        ))
      ) : (
        <h2 className="pokemonsContainer__intial">
          Search and catch them all!
        </h2>
      )}
    </section>
  );
}

export default PokemonResults;
