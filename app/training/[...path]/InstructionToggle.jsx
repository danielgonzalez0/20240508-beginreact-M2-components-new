"use client";

import { useState } from "react";

export const InstructionToggle = ({ children }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="absolute top-4 left-4 flex items-center gap-1">
        <input
          type="checkbox"
          id="toggle-instructions"
          className="toggle"
          checked={open}
          onChange={(e) => {
            setOpen(e.target.checked);
          }}
        />
        <label className="text-xs" htmlFor="toggle-instructions">
          {open ? "Close" : "Open"} instructions
        </label>
      </div>
      {open ? <div className="flex-1 mt-12 px-4">{children}</div> : null}
    </>
  );
};
