import React from "react";
import { usePokeData } from "../../utils/pokeData";
import "../Modal/modal.scss";

export const Error = ({ message }) => {
  const { setError, setAlready } = usePokeData();
  function closeModal() {
    setError(false);
    setAlready(false);
  }
  return (
    <>
      <article className="modal__messageContainer">
        <h2 className="modal__messageContainer__message">{message}</h2>
        <button className="modal__messageContainer__btn" onClick={closeModal}>
          Ok
        </button>
      </article>
    </>
  );
};
