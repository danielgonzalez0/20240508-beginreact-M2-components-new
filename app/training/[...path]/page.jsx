import fs from "fs/promises";
import dynamic from "next/dynamic";
import Link from "next/link";
import path from "path";
import { Instruction } from "./Instruction";

export default async function Page({ params }) {
  const fullPath = params.path.join("/");

  if (fullPath.endsWith(".instructions")) {
    return <div>Not found</div>;
  }

  const RenderedComponent = dynamic(() => import(`./${fullPath}`), {
    ssr: false,
    loading: () => (
      <span className="loading loading-infinity loading-lg"></span>
    ),
  });

  const type = params.path[0];
  const moduleName = params.path[1];
  const exerciseNumber = params.path[2];

  const trainingDirectory = path.join(
    process.cwd(),
    `app/instructions/${moduleName}`
  );
  const pth = path.join(
    trainingDirectory,
    `${exerciseNumber.replace(".jsx", "")}.md`
  );

  const instruction = await fs.readFile(pth, "utf-8");

  console.log({ instruction });
  return (
    <div className="h-full flex gap-2 relative">
      <Instruction instruction={instruction} />
      <div className="mx-auto max-w-4xl flex-1">
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
    </div>
  );
}
