// @ts-nocheck
"use client";

import { Minus } from "lucide-react";
import { Hash } from "lucide-react";
import { Plus } from "lucide-react";
import { RefreshCcw } from "lucide-react";
import { useReducer } from "react";

// 🦁 Créer une méthode `reducer` qui prends en paramètre `state` et `action`
// 🦁 Return le `state` + 1

const REDUCER_ACTIONS = {
  'INCREMENT': 'increment',
  'DECREMENT': 'decrement',
  'RESET': 'reset',
  'SET': 'set'
};

function reducer(state, action) {

  const value = action.value || 1;

switch (action.type) {
  case REDUCER_ACTIONS.INCREMENT: 
    return state + value;
  case REDUCER_ACTIONS.DECREMENT:
    return state - value;
  case REDUCER_ACTIONS.RESET:
    return 0;
  case REDUCER_ACTIONS.SET:
    if(typeof value !== 'number') throw new Error("Value must be a number");
    return value;
  default: 
  throw new Error('Invalid action type ' + action);
}
}

export default function App() {
  // 🦁 Remplace ceci par un `useReducer`
  // ⚡ La seul action sera d'incrémenter le count
  const [count, dispatch] = useReducer(reducer, 0);

  return (
    <div className="card m-auto w-full max-w-md bg-base-200 shadow-xl">
      <div className="card-body items-center text-center">
      
        <label className="input input-bordered flex  items-center gap-2">
          <Hash scale={16} />
          <input
            type="text"
            className="w-10 grow"
            placeholder="Count"
            value={count}
            onChange={(e) => {
              let value = parseInt(e.target.value);
              if (isNaN(value)) {
                value = 0;
              }
              dispatch({type: REDUCER_ACTIONS.SET, value: value});
            }}
          />
        </label>


        <div className="card-actions">
          <button className="btn btn-primary" onClick={() => dispatch({type:REDUCER_ACTIONS.DECREMENT, value: 5})}>
            <Minus size={16} /> 5
          </button>
          <button className="btn btn-primary" onClick={() => dispatch({ type: REDUCER_ACTIONS.DECREMENT })}>
            <Minus size={16} />
          </button>
          <button className="btn btn-outline" onClick={() => dispatch({ type: REDUCER_ACTIONS.RESET })}>
            <RefreshCcw size={16} />
          </button>
          <button className="btn btn-primary" onClick={() => dispatch({type: REDUCER_ACTIONS.INCREMENT})}>
            <Plus size={16} />
          </button>
          <button className="btn btn-primary" onClick={() => dispatch({type: REDUCER_ACTIONS.INCREMENT, value: 5})}>
            <Plus size={16} /> 5
          </button>
        </div>
      </div>
    </div>
  );
}
