const shoesList = [{
  Id: 1,
  title: "Shark Shoes",
  src: "/images/shoes-1.png",
  description: "This yellow shoes will make your friend jealous.",
  isNew: true
},
{
  id: 2,
  title: "Blue Wheti",
  src: "/images/shoes-2.png",
  description: "You can wear this shoes with any clothes. It will make you lookcool.",
  isNew: true
},
{
  id: 3,
  title: "Basic Fit",
  src: "/images/shoes-3.png",
  description: "You know what? This shoes is the best shoes for you who like to walk.",
  isNew: false
},
{
  id: 4,
  title: "Darku Shoes",
  src: "/images/shoes-4.png",
  description: "Wow, this shoes is so cool. You can wear it for any occasion.",
  isNew: false
}];


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
          image={shoe.src}
          title={shoe.title}
          description={shoe.description}
          isNew={shoe.isNew}
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

function NewBadge() {
  return <div className="badge badge-secondary">NEW</div>;
}

function ShoeCard({ image, title, description, isNew = false }) {
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
      </div>
    </div>
  );
}
