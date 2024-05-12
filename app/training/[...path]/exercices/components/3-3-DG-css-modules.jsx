
//@ts-nocheck
"use client"

// Les CSS Modules sont "built-in" dans de nombreux frameworks et permettent de créer des modules CSS limités à un composant.

// Le problème des styles globaux faits précédemment est qu'ils sont globaux et vont donc potentiellement interférer avec d'autres styles.

import styles from "./3.module.css"

const VARIANTS = {
  red: styles["badge-color-red"],
  green: styles["badge-color-green"],
  purple: styles["badge-color-purple"]
};

const SIZES = {
  default: styles["badge-size-default"],
  lg: styles["badge-size-large"],
}; 

const COMMON_STYLES = styles["badge-base"]


// 💣 Supprime cette ligne
// eslint-disable-next-line no-unused-vars
const Badge = ({ size, variant, children }) => {
  const sizeClass = SIZES[size]
  const variantClass = VARIANTS[variant]
  return (
    <span className={`${COMMON_STYLES} ${variantClass} ${sizeClass}`}>
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
