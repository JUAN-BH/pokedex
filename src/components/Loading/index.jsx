import React from 'react';
import pokeball from '../../assets/icons/pokeball.png';

function Loading() {
  return (
    <section className="loadingContainer">
      <img
        src={pokeball}
        alt="pokeball"
        className="loadingContainer__loading"
      />
    </section>
  );
}

export default Loading;
