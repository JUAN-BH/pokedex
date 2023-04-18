import React from 'react';

function PokeBio({ pokeBio }) {
  return (
    <div className="pokemonDetails__details__bio">
      <h2>Bio</h2>
      <p className="pokemonDetails__details__bio__info">
        {pokeBio.charAt(0).toUpperCase() + pokeBio.slice(1).toLowerCase()}
      </p>
    </div>
  );
}

export default PokeBio;
