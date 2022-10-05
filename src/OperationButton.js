import React from "react";
import { ACTIONS } from "./App";

function OperationButton({ operation, dispatch }) {
  return (
    <button
      onClick={() =>
        dispatch({
          actionType: ACTIONS.CHOOSE_OPERATION,
          actionParameter: { operation },
        })
      }
    >
      {operation}
    </button>
  );
}

export default OperationButton;
