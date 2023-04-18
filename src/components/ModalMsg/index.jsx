import React from 'react';
import { useInitialState } from '../../context/initalStateContext';

function ModalMsg() {
  const { state, dispatch } = useInitialState();
  const { error } = state;
  const { errorMsg } = error;

  function closeModal() {
    dispatch({
      type: 'TRIGGER_ERROR',
      payload: {
        onError: false,
        errorMsg: '',
      },
    });
    dispatch({
      type: 'INPUT_BEHAVIOR',
      payload: false,
    });
  }

  return (
    <article className="modal__messageContainer">
      <h2 className="modal__messageContainer__message">{errorMsg}</h2>
      <button
        type="button"
        className="modal__messageContainer__btn"
        onClick={closeModal}
      >
        Ok
      </button>
    </article>
  );
}

export default ModalMsg;
