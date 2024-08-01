"use client";

import useSWR from "swr";


const useFetchData = ()=>{

  // @ts-ignore
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  
  const {data, error, isLoading} = useSWR("https://catfact.ninja/fact", fetcher);

  return {data, isLoading, error}
}


const CatFact = () => {

  const {data, isLoading, error} = useFetchData();
  console.log(data, error, isLoading);

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
        {isLoading ? <span className="loading loading-spinner loading-sm"></span> : null}
        {error ? <p>Une erreur est survenue</p> : null}
        {data ? <p>{data.fact}</p> : null}

      </div>
    </div>
  );
};

export default function App() {
  return (
    <div>
      <CatFact />
    </div>
  );
}
