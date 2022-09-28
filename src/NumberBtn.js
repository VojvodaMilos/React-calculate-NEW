import React from "react";

const NumberBtn = ({ dispatch, digit }) => {
  return (
    <button
      onClick={() => {
        dispatch({ type: "add-digit", number: { digit } });
      }}
    >
      {digit}
    </button>
  );
};

export default NumberBtn;
