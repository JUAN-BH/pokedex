import React from "react";
import "./podex.scss";
import { Pokemon } from "../Pokemon";
import { VideoBackground } from "../VideoBackground";
import { usePokeData } from "../../utils/pokeData";
import { Loading } from "../Loading";
import { Modal } from "../Modal";
import { Error } from "../Error";

export const Pokedex = () => {
  const { pokemonsCatch, foundPoke, loading, error, already } = usePokeData();
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

        {already && (
          <Modal>
            <Error message={`You already have the pokemon: ${foundPoke}`} />
          </Modal>
        )}
        <section className="pokemonsContainer">
          {pokemonsCatch.length === 0 ? (
            <h2 className="pokemonsContainer__intial">
              Search and catch them all!
            </h2>
          ) : (
            pokemonsCatch.map((pokemon) => {
              return (
                <Pokemon
                  key={pokemon.name}
                  imgURL={pokemon.sprites.front_default}
                  name={pokemon.name}
                  type={pokemon.types[0].type.name}
                  pokemonAll={pokemon}
                />
              );
            })
          )}
        </section>
      </main>
    </>
  );
};
