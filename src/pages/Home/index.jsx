import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Helmet } from 'react-helmet';
import { useInitialState } from '../../context/initalStateContext';
import PokemonResults from '../../containers/PokemonsResults';
import Modal from '../../containers/Modal';
import Loading from '../../components/Loading';
import ModalMsg from '../../components/ModalMsg';

function Home() {
  const { state } = useInitialState();
  const { loading, error } = state;

  return (
    <main>
      <Helmet>
        <title>Pokedex</title>
      </Helmet>
      {loading && <Loading />}
      {error.onError && (
        <Modal>
          <ModalMsg />
        </Modal>
      )}
      <PokemonResults />
    </main>
  );
}

export default Home;
