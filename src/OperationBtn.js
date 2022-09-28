import React from "react";

const OperationBtn = ({ dispatch, operation }) => {
  return (
    <button
      onClick={() => {
        dispatch({ type: "operation-btn", payload: { operation } });
      }}
    >
      {operation}
    </button>
  );
};

export default OperationBtn;
