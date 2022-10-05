import React from "react";
import { ACTIONS } from "./App";

function DigitButton({ dispatch, digit }) {
  return (
    <button
      onClick={() =>
        dispatch({ actionType: ACTIONS.ADD_DIGIT, actionParameter: { digit } })
      }
    >
      {digit}
    </button>
  );
}

export default DigitButton;
