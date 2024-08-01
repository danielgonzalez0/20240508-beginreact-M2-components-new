"use client";

import { ErrorBoundaries } from "@/src/utils/ErrorBoundaries";
import { Suspense } from "react";
import { use } from "react";

const fetchCatFact = async () => {
  const res = await fetch("https://catfact.ninja/fact");
  if (!res.ok) {
    throw new Error("Network response was not ok")
  }
  const json = await res.json();
  return json;
}


const CatFact = () => {

  //use attend une promesse c'est pour cela que fetchCatFact est une fonction que l'on appelle
  //et qui retourne une promesse

  const data = use(fetchCatFact());


  return (
    <div className="card card-compact w-96 max-w-sm bg-base-200 shadow-xl">
      <figure>
        <img
          src="https://cataas.com/cat"
          alt="Shoes"
          className="max-h-32 w-full object-cover"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">Cat fact</h2>
        {/* 
          🦁 Ajoute un loader si ça charge : https://daisyui.com/components/loading/
          🦁 Ajoute un message d'erreur si isError est true
          🦁 Affiche la donnée si elle est présente
        */ }
        {/* {isLoading ? <span className="loading loading-spinner loading-sm"></span> : null}
        {error ? <p>Une erreur est survenue</p> : null} */}
        {data ? <p>{data.fact}</p> : null}

      </div>
    </div>
  );
};

export default function App() {
  //il faut wrapper le composant dans un suspense boundary pour éviter que le composant ne spam l'api avec use

  //
  return (
    <div>
      <ErrorBoundaries>
        <Suspense fallback={<p>Loading...</p>}>
          <CatFact />
        </Suspense>
      </ErrorBoundaries>
    </div>
  );
}
