/* eslint-disable tailwindcss/classnames-order */
/* eslint-disable tailwindcss/no-custom-classname */
"use client";

import { User2 } from "lucide-react";
import { useState } from "react";

function NameForm({ initialName = "" }) {
  // 🦁 Ajoute un `useState` pour le nom
  // 💡 useState("")
  const [name, setName] = useState(initialName)
  const handleChangeName = (e) => {
    setName(e.target.value)
  }

  const resetName = () => {
    setName(initialName)
  }


  return (
    <div className="flex flex-col items-center justify-center">
      <div className="card w-full max-w-96 bg-neutral text-neutral-content">
        <div className="card-body items-center text-center">
          <h2 className="card-title">Name :</h2>
          {name ? <p>{name}</p> : <p className="text-error">No name</p>}
          {name !== initialName && <button className="btn btn-warning btn-sm" onClick={() => resetName()}>Reset</button>}
        </div>
      </div>
      <div className="divider">Form</div>
      <label className="input input-bordered flex items-center gap-2">
        <
// @ts-ignore
        User2 size={16} />
        <input type="text" className="grow" placeholder="Melvynx" onChange={(e) => handleChangeName(e)} />
      </label>
    </div>
  );
}

export default function App() {
  return (
    <div>
      <NameForm />
    </div>
  );
}
