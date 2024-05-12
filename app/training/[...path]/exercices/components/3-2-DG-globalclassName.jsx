
//@ts-nocheck
"use client"

// Dans le projet, tu trouveras un fichier globals.css que tu peux rechercher en faisant CMD + P puis en tapant globals.css.

// Tu vas pouvoir créer 6 classes:

// badge - base
// badge - size -default
// badge - size - large
// badge - color - red
// badge - color - green
// badge - color - purple

const VARIANTS = {
  red: "badge-color-red",
  green: "badge-color-green",
  purple: "badge-color-purple"
};

const SIZES = {
  default: "badge-size-default",
  lg: "badge-size-large",
}; 

const COMMON_STYLES = "badge-base"


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
