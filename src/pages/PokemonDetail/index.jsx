import React from 'react';
import { useParams } from 'react-router-dom';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Helmet } from 'react-helmet';
import { useInitialState } from '../../context/initalStateContext';
import usePokemonDetail from '../../hooks/usePokemonDetail';
import Modal from '../../containers/Modal';
import PokeIntro from '../../components/PokeIntro';
import Loading from '../../components/Loading';
import ModalMsg from '../../components/ModalMsg';
import PokeBio from '../../components/PokeBio';
import PokeStasAbilities from '../../components/PokeStasAbilities';
import PokeEvolution from '../../components/PokeEvolution';

function PokemonDetail() {
  const { poke } = useParams();
  const { pokemon, pokemonBio, pokemonEvos } = usePokemonDetail();
  const { state } = useInitialState();
  const { loading, error } = state;

  return (
    <main>
      <Helmet>
        <title>{poke.charAt(0).toUpperCase() + poke.slice(1)}</title>
      </Helmet>
      {loading && <Loading />}

      {error.onError && (
        <Modal>
          <ModalMsg />
        </Modal>
      )}

      {pokemon === undefined ||
      pokemonBio === undefined ||
      pokemonEvos === undefined ? null : (
        <section className="pokemonDetails">
          <PokeIntro pokemon={pokemon} />
          <article className="pokemonDetails__details">
            <PokeBio pokeBio={pokemonBio} />
            <PokeStasAbilities pokemon={pokemon} />
            <PokeEvolution pokemonEvos={pokemonEvos} />
          </article>
        </section>
      )}
    </main>
  );
}
export default PokemonDetail;
