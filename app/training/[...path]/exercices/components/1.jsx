const SHOES = [{
  title: "Shark Shoes",
  src: "/images/shoes-1.png",
  desc: "This yellow shoes will make your friend jealous.",
  isNew: true
},
{
  title: "Blue Wheti",
  src: "/images/shoes-2.png",
  desc: "You can wear this shoes with any clothes. It will make you lookcool.",
  isNew: true
},
{
  title: "Basic Fit",
  src: "/images/shoes-3.png",
  desc: "You know what? This shoes is the best shoes for you who like to walk.",
  isNew: false
},
{
  title: "Darku Shoes",
  src: "/images/shoes-4.png",
  desc: "Wow, this shoes is so cool. You can wear it for any occasion.",
  isNew: false
}];

const ShoesList = (({children})=>{
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {children}
    </div>
  )
})

const NewBadge = (()=>{
  return <div className="badge badge-secondary">NEW</div>
})


const ShoeCard = ({ shoes }) => {

  const { title, src, desc, isNew } = shoes;
  return (
    <div className="card bg-base-300 w-full shadow-xl">
      <figure>
        <img
          src={src}
          className="h-32 w-full object-cover object-center"
          alt="Shoes"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {title}
          {isNew ? <NewBadge/> : null}
        </h2>
        <p>{desc}</p>
      </div>
    </div>
  )
};


export default function App() {
  return (
<ShoesList>
  {SHOES.map((shoe, index) => <ShoeCard key={index} shoes={shoe} />)}
</ShoesList>


// {/* 🦁 Ceci est le premier composant */}
// {/* 🦁 Tu peux le copier/coller dans un nouveau composant pour le séparer */}
 
  );
}

// 🦁 Créer un component `ShoeCard`
// 🦁 Celui-ci va prendre des "props"
// 🦁 Tu peux prendre une props `image`, `title` et `description`
