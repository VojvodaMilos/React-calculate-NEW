import { useReducer } from "react";
import NumberBtn from "./NumberBtn";
import OperationBtn from "./OperationBtn";
import "./style.css";

const reducer = (state, action) => {
  switch (action.type) {
    case "add-digit":
      if (state.numberAfterSume) {
        return {
          ...state,
          currentOperand: action.number.digit,
          numberAfterSume: false,
        };
      }
      if (state.currentOperand == "0" && action.number.digit == "0") {
        return state;
      }
      if (
        state.currentOperand == "0" &&
        action.number.digit !== "0" &&
        action.number.digit !== "."
      ) {
        return {
          ...state,
          currentOperand: action.number.digit,
        };
      }

      if (state.currentOperand == null && action.number.digit == ".") {
        return {
          ...state,
          currentOperand: "0.",
        };
      }

      if (action.number.digit == "." && state.currentOperand.includes(".")) {
        return state;
      }
      if (state.currentOperand == null) {
        return {
          ...state,
          currentOperand: action.number.digit,
        };
      }
      return {
        ...state,
        currentOperand: `${state.currentOperand || ""}${action.number.digit}`,
      };
    case "ac-btn":
      return {
        state: "",
      };
    case "operation-btn":
      if (state.currentOperand == null && state.previousOperand == null) {
        return state;
      }
      if (state.currentOperand == null) {
        return {
          ...state,
          operation: action.payload.operation,
        };
      }
      if (state.previousOperand == null) {
        return {
          ...state,
          previousOperand: state.currentOperand,
          operation: action.payload.operation,
          currentOperand: null,
        };
      }

      return {
        ...state,
        previousOperand: suma(state),
        operation: action.payload.operation,
        currentOperand: null,
      };
    case "suma-btn":
      if (state.currentOperand == null && state.previousOperand == null) {
        return state;
      }
      if (state.previousOperand == null) {
        return state;
      }
      if (state.currentOperand == null) {
        return state;
      }
      return {
        ...state,
        currentOperand: suma(state),
        previousOperand: null,
        operation: null,
        numberAfterSume: true,
      };
    case "delete-btn":
      if (state.currentOperand == null && state.previousOperand == null) {
        return state;
      }
      if (state.currentOperand == null) {
        return state;
      }
      if (state.currentOperand.length == 1) {
        return {
          ...state,
          currentOperand: null,
        };
      }
      return {
        ...state,
        currentOperand: state.currentOperand.slice(0, -1),
      };
  }
};

const suma = (state) => {
  // console.log(state.currentOperand);
  const prev = parseFloat(state.previousOperand);
  const current = parseFloat(state.currentOperand);
  if (isNaN(prev) || isNaN(current)) {
    return {
      ...state,
      currentOperand: null,
      previousOperand: null,
      operation: null,
    };
  }

  let sumaNumber;

  switch (state.operation) {
    case "+":
      sumaNumber = prev + current;
      break;

    case "-":
      sumaNumber = prev - current;
      break;
    case "*":
      sumaNumber = prev * current;
      break;
    case "/":
      sumaNumber = prev / current;
      break;
  }
  return sumaNumber.toString();
};

function App() {
  const [{ currentOperand, previousOperand, operation }, dispatch] = useReducer(
    reducer,
    {}
  );

  return (
    <div className="calculate-grid">
      <div className="output">
        <div className="previous-operand">
          {previousOperand}
          {operation}
        </div>
        <div className="current-operand">{currentOperand}</div>
      </div>
      <button
        onClick={() => {
          dispatch({ type: "ac-btn" });
        }}
        className="span-two"
      >
        AC
      </button>
      <button
        onClick={() => {
          dispatch({ type: "delete-btn" });
        }}
      >
        DEL
      </button>
      <OperationBtn dispatch={dispatch} operation="/" />
      <NumberBtn dispatch={dispatch} digit="1" />
      <NumberBtn dispatch={dispatch} digit="2" />
      <NumberBtn dispatch={dispatch} digit="3" />
      <OperationBtn dispatch={dispatch} operation="*" />
      <NumberBtn dispatch={dispatch} digit="4" />
      <NumberBtn dispatch={dispatch} digit="5" />
      <NumberBtn dispatch={dispatch} digit="6" />
      <OperationBtn dispatch={dispatch} operation="+" />
      <NumberBtn dispatch={dispatch} digit="7" />
      <NumberBtn dispatch={dispatch} digit="8" />
      <NumberBtn dispatch={dispatch} digit="9" />
      <OperationBtn dispatch={dispatch} operation="-" />
      <NumberBtn dispatch={dispatch} digit="." />
      <NumberBtn dispatch={dispatch} digit="0" />

      <button
        onClick={() => {
          dispatch({ type: "suma-btn" });
        }}
        className="span-two"
      >
        =
      </button>
    </div>
  );
}

export default App;
