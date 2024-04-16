// Tu verras ce `"use client"` dû aux limitations de Next.js quant à l'utilisation de hooks dans les composants.
// Rappelle-toi juste de **toujours l'ajouter si tu utilises un hook**.
"use client";

import { useState } from "react";

const getInitialShoesList = () => [
  {
    isNew: true,
    image: "/images/shoes-1.png",
    title: "Shark Shoes",
    description: "This yellow shoes will make your friend jealous.",
    categories: ["Fashion", "Summer", "Trendy"],
  },
  {
    isNew: true,
    image: "/images/shoes-2.png",
    title: "Blue Wheti",
    description:
      "You can wear this shoes with any clothes. It will make you look cool.",
    categories: ["Casual", "Comfort"],
  },
  {
    isNew: false,
    image: "/images/shoes-3.png",
    title: "Basic Fit",
    description:
      "You know what? This shoes is the best shoes for you who like to walk.",
    categories: ["Outdoor", "Walking"],
  },
  {
    isNew: false,
    image: "/images/shoes-4.png",
    title: "Darku Shoes",
    description:
      "Wow, this shoes is so cool. You can wear it for any occasion.",
    categories: ["Elegant", "Evening", "Party"],
  },
];

export default function App() {
  const [shoesList, setShoesList] = useState(getInitialShoesList());
  const [enableKeys, setEnableKeys] = useState(true);

  const shuffleShoesList = () => {
    setShoesList((currentShoesList) => {
      const shuffled = [...currentShoesList];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled;
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center">
        <h2 className="text-4xl">{enableKeys ? "With" : "Without"} keys</h2>
        <button onClick={shuffleShoesList} className="btn btn-primary ml-auto">
          Shuffle
        </button>
        <label className="label flex cursor-pointer flex-col gap-1">
          <span className="label-text">Enable key</span>
          <input
            type="checkbox"
            className="checkbox"
            checked={enableKeys}
            onChange={() => setEnableKeys((prev) => !prev)}
          />
        </label>
      </div>
      <ShoesList>
        {shoesList.map((shoe) => (
          // eslint-disable-next-line react/jsx-key
          <ShoeCard
            key={enableKeys ? shoe.title : undefined}
            isNew={shoe.isNew}
            image={shoe.image}
            title={shoe.title}
            description={shoe.description}
            categories={shoe.categories}
          />
        ))}
      </ShoesList>
    </div>
  );
}

function ShoesList({ children }) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">{children}</div>
  );
}

function NewBadge() {
  return <div className="badge badge-secondary">NEW</div>;
}

function ShoeCard({ image, title, description, isNew = false, categories }) {
  return (
    <div className="card w-full bg-base-300 shadow-xl">
      <figure>
        <img
          src={image}
          className="h-32 w-full object-cover object-center"
          alt="Shoes"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {title}
          {isNew ? <NewBadge /> : null}
        </h2>
        <p>{description}</p>
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            {categories.map((category, index) => (
              <div key={index} className="badge badge-outline">
                {category}
              </div>
            ))}
          </div>
          <label className="label flex cursor-pointer flex-col gap-1">
            <span className="label-text">Cart</span>
            <input type="checkbox" className="checkbox" />
          </label>
        </div>
      </div>
    </div>
  );
}
