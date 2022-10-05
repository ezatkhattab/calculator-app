import { useReducer } from "react";
import "./App.css";
import DigitButton from "./DigitButton";
import OperationButton from "./OperationButton";

export const ACTIONS = {
  ADD_DIGIT: "add-digit",
  CLEAR: "clear",
  DELETE_DIGIT: "delete-digit",
  CHOOSE_OPERATION: "choose-operation",
  EVALUTE: "evaluate",
};
function reducer(state, { actionType, actionParameter }) {
  switch (actionType) {
    case ACTIONS.ADD_DIGIT:
      if (state.overwite)
        return {
          ...state,
          curr: actionParameter.digit,
          overwrite: false,
        };
      if (actionParameter.digit === "0" && state.curr === "0")
        return { ...state };
      if (actionParameter.digit === "." && state.curr.includes("."))
        return {
          ...state,
        };
      return {
        ...state,
        curr: (state.curr || "") + actionParameter.digit,
      };
    case ACTIONS.CHOOSE_OPERATION:
      if (state.curr == null && state.prev == null)
        return {
          state,
        };
      if (state.prev == null) {
        return {
          ...state,
          operation: actionParameter.operation,
          prev: state.curr,
          curr: null,
        };
      }
      return {
        ...state,
        prev: evaluate(state),
        operation: actionParameter.operation,
        curr: null,
      };
    case ACTIONS.EVALUTE:
      if (state.curr == null || state.prev == null || state.operation == null)
        return { ...state };
      return {
        ...state,
        operation: null,
        prev: null,
        curr: evaluate(state),
        overwrite: true,
      };
    case ACTIONS.CLEAR:
      return {};
    case ACTIONS.DELETE_DIGIT:
      if (state.curr === null) {
        return state;
      }
      if (state.overwrite) {
        return {};
      }
      return {
        ...state,
        curr: state.curr.slice(0, -1),
      };
  }
}

function evaluate({ curr, prev, operation }) {
  const current = parseFloat(curr);
  const previous = parseFloat(prev);
  if (isNaN(current) || isNaN(previous)) return "";
  let compute = "";
  switch (operation) {
    case "+":
      compute = previous + current;
      break;
    case "-":
      compute = previous - current;
      break;
    case "*":
      compute = previous * current;
      break;
    case "÷":
      compute = previous / current;
      break;
  }
  return compute.toString();
}

function App() {
  const [{ curr, prev, operation }, dispatch] = useReducer(reducer, {});
  return (
    <div className="calculator-grid">
      <div className="output">
        <div className="previous-operand">
          {prev} {operation}
        </div>
        <div className="current-operand">{curr}</div>
      </div>
      <button
        className="span-two"
        onClick={() => dispatch({ actionType: ACTIONS.CLEAR })}
      >
        AC
      </button>
      <button onClick={() => dispatch({ actionType: ACTIONS.DELETE_DIGIT })}>
        DEL
      </button>
      <OperationButton operation={"÷"} dispatch={dispatch} />
      <DigitButton digit={"7"} dispatch={dispatch} />
      <DigitButton digit={"8"} dispatch={dispatch} />
      <DigitButton digit={"9"} dispatch={dispatch} />
      <OperationButton operation={"*"} dispatch={dispatch} />
      <DigitButton digit={"4"} dispatch={dispatch} />
      <DigitButton digit={"5"} dispatch={dispatch} />
      <DigitButton digit={"6"} dispatch={dispatch} />
      <OperationButton operation={"+"} dispatch={dispatch} />
      <DigitButton digit={"1"} dispatch={dispatch} />
      <DigitButton digit={"2"} dispatch={dispatch} />
      <DigitButton digit={"3"} dispatch={dispatch} />
      <OperationButton operation={"-"} dispatch={dispatch} />
      <DigitButton digit={"0"} dispatch={dispatch} />
      <DigitButton digit={"."} dispatch={dispatch} />

      <button
        className="span-two"
        onClick={() => dispatch({ actionType: ACTIONS.EVALUTE })}
      >
        =
      </button>
    </div>
  );
}

export default App;
