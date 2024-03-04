import dynamic from "next/dynamic";
import Link from "next/link";

export default function Page({ params }) {
  const path = params.path.join("/");

  const RenderedComponent = dynamic(() => import(`./${path}`), {
    ssr: false,
    loading: () => (
      <span className="loading loading-infinity loading-lg"></span>
    ),
  });

  const type = params.path[0];
  const moduleName = params.path[1];
  const exerciseNumber = params.path[2];

  return (
    <div className="m-auto max-w-4xl">
      <header className="my-4 flex items-center justify-between">
        <h2 className="text-lg font-bold">
          {type} - {moduleName} - {exerciseNumber}
        </h2>
        <Link
          className="btn"
          href={`/training/${
            type === "solutions" ? "exercices" : "solutions"
          }/${moduleName}/${exerciseNumber}`}
        >
          {type === "solutions" ? "Exercices" : "Solutions"}
        </Link>
      </header>
      <div className="border-dashed border border-accent rounded-md p-4">
        <RenderedComponent />
      </div>
    </div>
  );
}
