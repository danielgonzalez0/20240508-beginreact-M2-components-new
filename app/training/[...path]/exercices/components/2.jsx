"use client";

const shoesList = [{
  id: 1,
  title: "Shark Shoes",
  image: "/images/shoes-1.png",
  description: "This yellow shoes will make your friend jealous.",
  isNew: true,
  categories: ["running", "casual"]
},
{
  id: 2,
  title: "Blue Wheti",
  image: "/images/shoes-2.png",
  description: "You can wear this shoes with any clothes. It will make you look cool.",
  isNew: true,
  categories: ["formal"]
},
{
  id: 3,
  title: "Basic Fit",
  image: "/images/shoes-3.png",
  description: "You know what? This shoes is the best shoes for you who like to walk.",
  isNew: false,
  categories: ["casual", "outdoor"]
},
{
  id: 4,
  title: "Darku Shoes",
  image: "/images/shoes-4.png",
  description: "Wow, this shoes is so cool. You can wear it for any occasion.",
  isNew: false,
  categories: ["sport"]
}
];





export default function App() {
  return (
    <ShoesList>
      {/* 🦁 Créer un tableau avec les informations ci-dessous */}
      {/* 💡 Utilise l'IA et demande lui : "Créer un tableau pour afficher ces composants via une liste. Ne me donne que le tableau JavaScript." */}
      {/* 🦁 Le nom du tableau = shoesList */}
      {/* 💸 {shoesList.map(shoe => (...))} */}
      {shoesList.map(shoe => (
        <ShoeCard
          key={shoe.id}
          {...shoe}
        />
      ))}
    </ShoesList>
  );
}

function ShoesList({ children }) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">{children}</div>
  );
}

function ShoeCategories({ categories }) {
  if (categories.length === 0) return null
  return (
    <div className="card-actions justify-end">
      {categories.map((category, index) => <div key={index} className="badge badge-outline">{category}</div>)}

    </div>
  )
}

function ShoeCart() {
  return (
    <label className="label cursor-pointer flex flex-col gap-1">
      <span className="label-text">Cart</span>
      <input type="checkbox" className="checkbox" />
    </label>
  )
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
          <ShoeCategories categories={categories} />
          <ShoeCart />
        </div>
      </div>
    </div>
  );
}
