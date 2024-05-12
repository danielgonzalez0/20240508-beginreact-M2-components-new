
//@ts-nocheck
"use client"
// Emotion est une librairie CSS -in -JS qui permet de créer des styles dynamiquement.

// Je déconseille d'utiliser Emotion pour des projets en 2024 et si tu souhaites utiliser une solution bien meilleure, je te recommande PandaCSS mais... PandaCSS demande énormément de configuration là où Emotion n'en demande aucune.

//   C'est pour ça qu'on va utiliser Emotion!

import styled from "@emotion/styled"

const VARIANTS = {
  red: {
    backgroundColor: "#ef444415",
    color: "#b91c1c",
  },
  green: {
    backgroundColor: "#22c55e15",
    color: "#15803d",
  },
  purple: {
    backgroundColor: "#8b5cf615",
    color: "#6d28d9",
  },
};

const SIZES = {
  default: {
    padding: "2px 6px",
  },
  lg: {
    padding: "4px 8px",
  },
}; 


const BadgeCss = styled.span`
background-color: ${({variant})=> VARIANTS[variant]?.backgroundColor || VARIANTS.red.backgroundColor};
color: ${({variant})=> VARIANTS[variant]?.color || VARIANTS.red.color};
padding: ${({size})=> SIZES[size]?.padding || SIZES.default.padding};
//common style
  display: inline-flex;
  align-items: center;
  border-radius: 6px;
  width: fit-content;
  font-weight: 500;
`

// 💣 Supprime cette ligne
// eslint-disable-next-line no-unused-vars
const Badge = ({ size, variant, children }) => {
  return (
    <BadgeCss variant={variant} size={size}>
      {children}
    </BadgeCss>
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
