import React, {
  useContext,
  createContext,
  useReducer,
  useMemo,
  useEffect,
} from 'react';

const InitialStateContext = createContext();

function reducer(state, action) {
  switch (action.type) {
    case 'SEARCH_POKEMON':
      return {
        ...state,
        searchedPokemon: action.payload,
      };
    case 'ADD_POKEMON':
      return {
        ...state,
        pokemonsDisplay: [...state.pokemonsDisplay, action.payload],
      };
    case 'ADD_POKEMONSCAUGHT':
      return {
        ...state,
        pokemonsDisplay: [...state.pokemonsDisplay, ...action.payload],
      };
    case 'INPUT_BEHAVIOR':
      return {
        ...state,
        disabledInput: action.payload,
      };
    case 'REQUESTING_DATA':
      return {
        ...state,
        loading: true,
      };
    case 'REQUEST_SUCCESS':
      return {
        ...state,
        loading: false,
        error: {
          onError: false,
          errorMsg: '',
        },
      };
    case 'TRIGGER_ERROR':
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
}

const intialState = {
  searchedPokemon: '',
  pokemonsDisplay: [],
  disabledInput: false,
  loading: false,
  error: {
    onError: false,
    errorMsg: '',
  },
  errorMessage: '',
};

export function InitialStateContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, intialState);

  useEffect(() => {
    let pokemonsCought;
    if (Array.isArray(JSON.parse(localStorage.getItem('pokemonsCaught')))) {
      pokemonsCought = JSON.parse(localStorage.getItem('pokemonsCaught'));
      dispatch({ type: 'ADD_POKEMONSCAUGHT', payload: pokemonsCought });
    }
  }, []);

  const data = useMemo(() => {
    return {
      state,
      dispatch,
    };
  }, [state]);

  return (
    <InitialStateContext.Provider value={data}>
      {children}
    </InitialStateContext.Provider>
  );
}

export function useInitialState() {
  const pokeData = useContext(InitialStateContext);
  return pokeData;
}
