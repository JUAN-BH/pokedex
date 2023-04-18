import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Select from 'react-select';
import { useInitialState } from '../../context/initalStateContext';
import api from '../../services/apiConfig';
import searchIcon from '../../assets/icons/searchIconsvg.svg';

function Searcher() {
  const { state, dispatch } = useInitialState();
  const { pokemonsDisplay } = state;
  const [pokemonsData, setPokemonsData] = useState([]);
  const [pokemonOptions, setPokemonOptions] = useState([]);
  const [pokeInput, setPokeInput] = useState('');

  useEffect(() => {
    async function getPokemons() {
      const { data } = await axios.get(
        'https://pokeapi.co/api/v2/pokemon?limit=500&offset=',
      );
      const options = data.results.map((pokemon) => ({
        value: pokemon.name,
        label: pokemon.name,
      }));
      setPokemonsData(options);
      setPokemonOptions(options);
    }

    getPokemons();
  }, []);

  async function searchPokemon() {
    if (pokeInput.value) {
      try {
        dispatch({ type: 'REQUESTING_DATA' });
        const { data } = await api(`pokemon/${pokeInput.value.toLowerCase()}`);
        dispatch({ type: 'REQUEST_SUCCESS' });

        const pokemonsDisplayed = pokemonsDisplay.map((poke) => poke.name);
        if (pokemonsDisplayed.includes(pokeInput.value.toLowerCase())) {
          dispatch({
            type: 'INPUT_BEHAVIOR',
            payload: true,
          });
          dispatch({
            type: 'TRIGGER_ERROR',
            payload: {
              onError: true,
              errorMsg: `You already have ${pokeInput.value}`,
            },
          });
        } else {
          dispatch({ type: 'ADD_POKEMON', payload: data });
        }
      } catch (error) {
        dispatch({
          type: 'INPUT_BEHAVIOR',
          payload: true,
        });
        dispatch({
          type: 'TRIGGER_ERROR',
          payload: {
            onError: true,
            errorMsg: `${error.message}`,
          },
        });
      }
    } else {
      dispatch({
        type: 'INPUT_BEHAVIOR',
        payload: true,
      });
      dispatch({
        type: 'TRIGGER_ERROR',
        payload: {
          onError: true,
          errorMsg: `We couldn't find that pokemon, please try again`,
        },
      });
    }
  }

  const getPokemonOptions = (inputValue) => {
    const filteredOptions = pokemonsData.filter((option) =>
      option.label.toLowerCase().includes(inputValue.toLowerCase()),
    );
    setPokemonOptions(filteredOptions);
  };

  function submitSearchPokemon(e) {
    e.preventDefault();
    setPokeInput('');
    searchPokemon();
  }

  return (
    <form className="menuHeader__searchSection" onSubmit={submitSearchPokemon}>
      <Select
        isDisabled={state.disabledInput}
        className="menuHeader__searchSection__input"
        value={pokeInput}
        onChange={setPokeInput}
        onInputChange={getPokemonOptions}
        options={pokemonOptions}
        placeholder="Selecciona un Pokémon"
      />
      {/* <input
        name="searchPoke"
        type="text"
        placeholder="Search your pokemon"
        required
        value={pokeInput}
        onChange={handleSearch}
      /> */}

      <button type="submit">
        <img src={searchIcon} alt="search icon" />
      </button>
    </form>
  );
}

export default Searcher;
