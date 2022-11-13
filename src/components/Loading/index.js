import React from "react";
import pokeball from "../../assets/icons/e7cde7fd0b8b992d7b74d2580a70b624.png";
import "../Modal/modal.scss";

export const Loading = () => {
  return (
    <>
      <img src={pokeball} alt="pokeball" className="modal__loading" />
    </>
  );
};
