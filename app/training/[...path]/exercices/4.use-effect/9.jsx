"use client";

import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";


const useEventListener = ({
  eventName,
  handler,
  element = window,
  enabled = true }) => {

// 🦁 Créer un `useRef` qui stocke la référence de `handler` = ref stable
  const handlerRef = useRef(handler);
//créer un useEffect qui met à jour la ref avec le handler => ce met à jour à chaque fois que le handler change
//mais cout tres faible car on ne fait que mettre à jour la ref
  useEffect(() => {
    handlerRef.current = handler;
  }, [handler]);


  useEffect(() => {
    if (!enabled) return;

    const onEvent = () => {
      handlerRef.current();
    }
    console.log("add event listener");
    element.addEventListener(eventName, onEvent);
    return () => {
      console.log("remove event listener");
      element.removeEventListener(eventName, onEvent);
    }
  }, [element, eventName, enabled]);

};


export default function App() {
  const [isCountingClick, setIsCountingClick] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [count, setCount] = useState(0);

  // 🦁 Créer un `useEffect` qui vient écouter les click sur `window`
  // 🦁 Ensuite il incrémente le state `count` uniquement si `isCountingClick` est `true`

  useEventListener({
    eventName: "click",
    handler: () => {
        setCount((prevCount) => prevCount + 1);
    },
    element: window,
    enabled: isCountingClick
  });


  return (
    <div className="flex max-w-sm flex-col gap-8">
      <div className="form-control">
        <label className="label cursor-pointer">
          <span className="label-text">Is Counting Click</span>
          <input
            type="checkbox"
            className="toggle"
            checked={isCountingClick}
            onChange={(e) => {
              setIsCountingClick(e.target.checked)
            }
            }
          />
        </label>
      </div>
      <h2 className="text-2xl font-bold">Click count: {count}</h2>
    </div>
  );
}
