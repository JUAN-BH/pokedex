import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useInitialState } from '../context/initalStateContext';
import api from '../services/apiConfig';
// import getPokemonSpecies from '../services/getPokemonSpecies';

function usePokemonDetail() {
  const { poke } = useParams();
  const { dispatch } = useInitialState();
  const [pokemon, setPokemon] = useState();
  const [pokemonBio, setPokemonBio] = useState();
  const [evosUrl, setEvosUrl] = useState();
  const [pokemonEvos, setPokemonEvos] = useState();

  useEffect(() => {
    async function getPokemonSearched() {
      try {
        dispatch({ type: 'REQUESTING_DATA' });
        const { data } = await api(`pokemon/${poke.toLowerCase()}`);
        dispatch({ type: 'REQUEST_SUCCESS' });
        setPokemon(data);
      } catch (error) {
        console.log(error);

        dispatch({
          type: 'TRIGGER_ERROR',
          payload: { onError: true, errorMsg: error.message },
        });
      }
    }
    async function getPokemonSpecies() {
      try {
        dispatch({ type: 'REQUESTING_DATA' });
        const { data } = await api(`pokemon-species/${poke.toLowerCase()}`);
        dispatch({ type: 'REQUEST_SUCCESS' });
        const bio = data.flavor_text_entries[7].flavor_text.replace('\f', ' ');
        const evoURL = data.evolution_chain.url
          .split('/')
          .slice(5, 7)
          .join('/');
        setPokemonBio(bio);
        setEvosUrl(evoURL);
      } catch (error) {
        console.log(error);
        dispatch({
          type: 'TRIGGER_ERROR',
          payload: { onError: true, errorMsg: error.message },
        });
      }
    }
    getPokemonSpecies();
    getPokemonSearched();
  }, [poke]);

  useEffect(() => {
    async function getPokemonEvolutions() {
      dispatch({ type: 'REQUESTING_DATA' });
      const { data } = await api(evosUrl);
      const evolutions = [];
      const babyPokemon = data.chain.species.name;
      const midPokemon =
        data.chain.evolves_to[0] === undefined
          ? 'no_evolution'
          : data.chain.evolves_to[0].species.name;

      let oldPokemon;
      if (midPokemon === 'no_evolution') {
        oldPokemon = 'no_evolution';
      } else {
        oldPokemon =
          data.chain.evolves_to[0].evolves_to[0] === undefined
            ? 'no_evolution'
            : data.chain.evolves_to[0].evolves_to[0].species.name;
      }

      evolutions.push(babyPokemon);
      evolutions.push(midPokemon);
      evolutions.push(oldPokemon);
      setPokemonEvos(evolutions);
      dispatch({ type: 'REQUEST_SUCCESS' });
    }
    getPokemonEvolutions();
  }, [evosUrl]);

  return {
    pokemon,
    pokemonBio,
    pokemonEvos,
  };
}

export default usePokemonDetail;
