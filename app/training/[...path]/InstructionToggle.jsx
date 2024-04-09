"use client";

import { cn } from "@/src/utils/cn";
import { useLocalStorageState } from "@/src/utils/useLocalStorage";

export const InstructionToggle = ({ children }) => {
  const [open, setOpen] = useLocalStorageState("open-instruction", false);

  return (
    <div
      className={cn("pt-2 px-4 flex flex-col", {
        "flex-1 border-r border-r-neutral": open,
      })}
    >
      <div className="flex items-start m-2">
        <input
          type="checkbox"
          id="toggle-instructions"
          className="toggle"
          checked={open}
          onChange={(e) => {
            setOpen(e.target.checked);
          }}
        />
      </div>
      {open ? children : null}
    </div>
  );
};
