// @ts-nocheck
"use client";

import clsx from "clsx";

const Button = ({ children, variant, id, ...props }) => {
  const buttonClass = clsx("btn ring-offset-2 ring-offset-base-100", {
    "btn-primary": variant === "primary",
    "btn-error": variant === "error",
    "btn-success": variant === "success",
    "btn-warning": variant === "warning",
  });

  return (
    <button className={buttonClass} id={id} onClick={() => props.onClick?.(id)}>
      {children}
    </button>
  );
};

export default function App() {

  const handleClick = (e) => {
    if (e.target === e.currentTarget) return alert("You clicked on the container");
    return
  }

  const handleBtnClick = (id) => {
    alert(`You clicked on <${id}>`);
  }

  return (
    <div
      className="flex flex-wrap gap-4 p-4" onClick={(e) => handleClick(e)}
    >
      <Button variant={"primary"} id="eat-me" onClick={(id) => handleBtnClick(id)}>;
        Eat me
      </Button>
      <Button variant={"error"} id="love-me" onClick={(id) => handleBtnClick(id)}>
        Love me
      </Button>
      <Button variant={"success"} id="drink-me" onClick={(id) => handleBtnClick(id)}>
        Drink me
      </Button>
      <Button variant={"warning"} id="leave-me" onClick={(id) => handleBtnClick(id)}>
        Eat me
      </Button>
    </div>
  );
}
