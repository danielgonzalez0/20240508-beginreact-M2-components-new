
//@ts-nocheck
"use client"
// Emotion est une librairie CSS -in -JS qui permet de créer des styles dynamiquement.

// Je déconseille d'utiliser Emotion pour des projets en 2024 et si tu souhaites utiliser une solution bien meilleure, je te recommande PandaCSS mais... PandaCSS demande énormément de configuration là où Emotion n'en demande aucune.

//   C'est pour ça qu'on va utiliser Emotion!


import clsx from "clsx";

const VARIANTS = {
  red: "bg-red-500/15 text-red-700",
  green: "bg-green-500/15 text-green-700",
  purple: "bg-purple-500/15 text-purple-700",
};

const SIZES = {
  default: "px-1.5 py-0.5",
  lg: "px-2 py-1",
};

// 💣 Supprime cette ligne
// eslint-disable-next-line no-unused-vars
const Badge = ({ size = "default", variant = "red", children }) => {
  return (
    <span className={clsx("inline-flex text-sm items-center rounded-md font-medium w-fit", SIZES[size], VARIANTS[variant]
    )}>
      {children}
    </span>
  );
};

export default function App() {
  return (
    <div className="grid grid-cols-4 flex-col gap-2 bg-white p-8 text-black">
      <p className="code">Size / color</p>
      <p className="code">Green</p>
      <p className="code">Red</p>
      <p className="code">Purple</p>
      <p className="code">lg</p>
      <Badge size="lg" variant="green">
        New
      </Badge>
      <Badge size="lg" variant="red">
        New
      </Badge>
      <Badge size="lg" variant="purple">
        New
      </Badge>
      <p className="code">default</p>
      <Badge size="default" variant="green">
        New
      </Badge>
      <Badge size="default" variant="red">
        New
      </Badge>
      <Badge size="default" variant="purple">
        New
      </Badge>
    </div>
  );
}
