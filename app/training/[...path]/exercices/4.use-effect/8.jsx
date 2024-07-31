// @ts-nocheck
"use client";

import { User2 } from "lucide-react";
import { useEffect } from "react";
import { useState } from "react";


// 🦁 Créer une clé `STORAGE_KEY` qui est égale à `storage-name`
const STORAGE_KEY = "storage-name";

const getInitialValue = (key, initialValue) => {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? initialValue;
  } catch {
    return initialValue;
  }
}

const UseStickyState = (key, initialValue) => {
  const [value, setValue] = useState(() => getInitialValue(key, initialValue));
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value])
  return [value, setValue]
};

const NameForm = ({ initialName }) => {

  const [user, setUser] = UseStickyState(STORAGE_KEY, {name: initialName })

  return (
    <div className="flex flex-col items-center justify-center">
      <label className="input input-bordered flex items-center gap-2">
        <User2 size={16} />
        <input
          type="text"
          className="grow"
          placeholder="Enter your name"
          value={user.name}
          onChange={(e) => setUser({name: e.target.value})}
        />
      </label>
    </div>
  );
};

export default function App() {

  return (
    <div className="flex flex-col gap-8">
      <NameForm initialName={"Jean"} />
    </div>
  );
}
