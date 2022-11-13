import React from "react";
import "./podex.scss";
import { Pokemon } from "../Pokemon";
import { VideoBackground } from "../VideoBackground";
import { usePokeData } from "../../utils/pokeData";
import { Loading } from "../Loading";
import { Modal } from "../Modal";
import { Error } from "../Error";

export const Pokedex = () => {
  const { pokemonsFound, foundPoke, loading, error } = usePokeData();
  return (
    <>
      <main>
        <VideoBackground />
        {loading && (
          <Modal>
            <Loading />
          </Modal>
        )}
        {error && (
          <Modal>
            <Error message={`We couldn't find the pokemon: ${foundPoke}`} />
          </Modal>
        )}
        <section className="pokemonsContainer">
          {pokemonsFound.map((pokemon) => {
            return (
              <Pokemon
                imgURL={pokemon.sprites.front_default}
                name={pokemon.name}
                type={pokemon.types[0].type.name}
                key={pokemon.name}
              />
            );
          })}
        </section>
      </main>
    </>
  );
};
