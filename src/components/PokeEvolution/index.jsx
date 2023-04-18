import React, { useEffect, useState } from 'react';
import { useInitialState } from '../../context/initalStateContext';
import api from '../../services/apiConfig';
import EvolutionItem from '../EvolutionItem/EvolutionItem';

function PokeEvolution({ pokemonEvos }) {
  const { dispatch } = useInitialState();
  const [evoInfos, setEvosInfos] = useState([]);

  async function getEvolutions(pokeName) {
    try {
      dispatch({ type: 'REQUESTING_DATA' });
      const { data } = await api(`pokemon/${pokeName.toLowerCase()}`);
      dispatch({ type: 'REQUEST_SUCCESS' });
      return data;
    } catch (error) {
      dispatch({
        type: 'TRIGGER_ERROR',
        payload: { onError: true, errorMsg: error.message },
      });
    }
    return null;
  }

  useEffect(() => {
    async function fetchdata(pokeNames) {
      const infoEvos = await Promise.all(
        pokeNames.map(async (pokemon) => {
          if (pokemon !== 'no_evolution') {
            return getEvolutions(pokemon);
          }
          return 'no_evolution';
        }),
      );
      setEvosInfos(infoEvos);
    }
    fetchdata(pokemonEvos);
  }, [pokemonEvos]);

  return (
    <div className="pokemonDetails__details__evo">
      <h2>Evolutions</h2>
      <ul>
        {evoInfos.map((pokemon) => {
          if (pokemon !== 'no_evolution') {
            return <EvolutionItem key={pokemon.name} pokemon={pokemon} />;
          }
          return null;
        })}
      </ul>
    </div>
  );
}

export default PokeEvolution;
