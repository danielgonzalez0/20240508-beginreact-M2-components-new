"use client";

import { cn } from "@/src/utils/cn";
import { Check, ShoppingBasket } from "lucide-react";
// import { useContext } from "react";
// import { createContext } from "react";
// import { useState } from "react";
import { create } from "zustand";

// 🦁 Créer un context avec les informations suivant :
// - `items` : un tableau de type `{ id: number, name: string, cover: string }`
// - `onDeleteItem` : une fonction qui va supprimer un item
// - `onAddItem` : une fonction qui va ajouter un item dans le panier

// const ShoppingContext = createContext(null)

// const useShoppingContext = () => {
//   const context = useContext(ShoppingContext);
//   if (!context) {
//     throw new Error("useShoppingContext must be used within a shopping provider");
//   }
//   return context;
// }

const useBasketStore = create((set) => ({
  items: [],
  onDeleteItem: (selectedItem) => {
  set((state) => ({ items: state.items.filter((item) => item.id !== selectedItem.id) }));
  },
  onAddItem: (selectedItem) => {
   set((state) => { return { items: [...state.items, selectedItem] } })
  },
  // isSelected: (selectedItem) => {
  //   set((state) => state.items.some((item) => item.id === selectedItem.id))
  // }
  }
));

// const ShoppingProvider = ({ children }) => {
//   const [items, setItems] = useState([]);

//   const onDeleteItem = (selectedItem) => {
//     setItems((prevItems) => prevItems.filter((i) => i.id !== selectedItem.id));
//   }
//   const onAddItem = (selectedItem) => {
//     setItems((prevItems) => [...prevItems, selectedItem]);
//   }

//   const isSelected = (selectedItem) => {
//     return items.some((item) => item.id === selectedItem.id)
//   }

//   const value = { items, onDeleteItem, onAddItem, isSelected };

//   return <ShoppingContext.Provider value={value}>
//     {children}
//   </ShoppingContext.Provider>

// }

const Dropdown = () => {
  const { items, onDeleteItem } = useBasketStore();
  return (
    <div className="dropdown">
      <button tabIndex={0} className="btn btn-secondary m-1">
        <
          // @ts-ignore
          ShoppingBasket size={16} /> {items.length}
      </button>
      <div
        tabIndex={0}
        className="card dropdown-content card-compact z-[1] w-64 bg-base-200 p-2 shadow"
      >
        <ul>
          {items.length === 0 ? (
            <li className="flex w-60 flex-row flex-nowrap items-center justify-between p-1">
              No items
            </li>
          ) : null}
          {items.map((item, index) => (
            <li
              key={index}
              className="flex w-60 flex-row flex-nowrap items-center justify-between p-1"
            >
              <img
                src={item.cover}
                alt={item.name}
                className="m-0 size-8 rounded-full p-0"
              />
              <span>{item.name}</span>
              <button
                onClick={() => {
                  onDeleteItem(item);
                }}
                className="btn btn-error btn-sm"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

// 🦁 Supprime les imports et utilise le context
const Header = () => {
  // const { items, onDeleteItem } = useShoppingContext();
  return (
    <div className="flex items-center justify-between rounded-lg border border-neutral/40 bg-base-200 px-8 py-4 shadow-lg">
      <h2 className="text-2xl font-bold">Shoes</h2>
      <Dropdown />
    </div>
  );
};

export default function App() {

  return (
    // <ShoppingProvider>
    <div className="flex flex-col gap-8">
      <Header />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {SHOES.map((shoe) => (
          <ShoeCard
            key={shoe.id}
            shoe={shoe}
          />
        ))}
      </div>
    </div>
    // </ShoppingProvider>
  );
}

const ShoeCardButton = ({ shoe }) => {
  // 🦁 Utilise le context pour récupérer le state `isSelected` ainsi que `onAddItem` et `onDeleteItem`
  // const { isSelected, onAddItem, onDeleteItem } = useShoppingContext();
  const onAddItem = useBasketStore((state) => state.onAddItem);
  const onDeleteItem = useBasketStore((state) => state.onDeleteItem);
  const isShoeSelected = useBasketStore((state) =>
    state.items.some((item) => item.id === shoe.id)
  );
  
  const onShoppingBasketClick = () => {
    console.log("click", shoe);
    if (isShoeSelected) {
      onDeleteItem(shoe);
    } else {
      onAddItem(shoe);
    }
  }

  return (
    <button
      // En fonction de `useSelected` on ajoutera ou supprimera du panier
      onClick={() => onShoppingBasketClick()}
      className={cn("btn", {
        "btn-outline": isShoeSelected,
        "btn-primary": !isShoeSelected,
      })}
    >
      <
        // @ts-ignore
        ShoppingBasket size={16} />{" "}
      {(isShoeSelected) ? <
        // @ts-ignore
        Check size={16} /> : null}
    </button>
  )

}

const ShoeCard = ({ shoe }) => {

  return (
    <div className="card flex w-full bg-base-300 shadow-xl">
      <figure>
        <img
          src={shoe.cover}
          className="h-32 w-full object-cover object-center"
          alt="Shoes"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{shoe.name}</h2>
        <div className="card-actions flex w-full items-end justify-end">
          <ShoeCardButton shoe={shoe} />
        </div>
      </div>
    </div>
  );
};

// *** Data ***
const SHOES = [
  {
    name: "Air Max Plus",
    id: 1,
    cover: "/images/shoes-1.png",
  },
  {
    name: "Air Force",
    id: 2,
    cover: "/images/shoes-2.png",
  },
  {
    name: "Dunk Retro",
    id: 3,
    cover: "/images/shoes-3.png",
  },
  {
    name: "Air Max",
    id: 4,
    cover: "/images/shoes-4.png",
  },
];
