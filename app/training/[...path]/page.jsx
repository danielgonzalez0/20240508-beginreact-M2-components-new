import { MarkAsDone } from "@/src/components/MarkAsDone";
import fs from "fs/promises";
import dynamic from "next/dynamic";
import Link from "next/link";
import path from "path";
import { Instruction } from "./Instruction";

export async function generateMetadata({ params }) {
  return {
    title: `Training - ${params.path[1]} - ${params.path[2]}`,
  };
}

export default async function Page({ params }) {
  const fullPath = params.path.join("/");

  if (fullPath.endsWith(".instructions")) {
    return <div>Not found</div>;
  }

  const currentExercice =
    params.path[0] === "exercices"
      ? params.path[2].replace(".jsx", "")
      : params.path[2].split(".")[0];

  const currentPath = path.join(
    process.cwd(),
    `app/training/[...path]/${fullPath}`
  );

  const solutions = await fs.readdir(
    path.join(
      process.cwd(),
      `app/training/[...path]/solutions/${params.path[1]}`
    )
  );

  const currentSolution = solutions
    .filter((s) => s.startsWith(currentExercice))
    .filter((s) => s.endsWith(".jsx"))
    .map((s) => s.replace(".jsx", ""));

  await fs.access(currentPath);

  const RenderedComponent = dynamic(() => import(`./${fullPath}`), {
    ssr: false,
    loading: () => (
      <span className="loading loading-infinity loading-lg"></span>
    ),
  });

  const type = params.path[0];
  const moduleName = params.path[1];
  const exerciseNumber = params.path[2];

  return (
    <div className="flex gap-2 relative">
      <TrainingContent
        moduleName={moduleName}
        exerciseNumber={exerciseNumber}
      />
      <div className="mx-auto max-w-4xl px-4 flex-1">
        <header className="my-4 flex items-center gap-4">
          <h2 className="text-lg font-bold mr-auto">
            {type} - {moduleName} - {exerciseNumber}
          </h2>

          <MarkAsDone value={`${moduleName}/${currentExercice}`}>
            Done
          </MarkAsDone>

          <details className="dropdown dropdown-end">
            <summary className="m-1 btn btn-sm btn-outline">Solutions</summary>
            <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-200 rounded-box w-52">
              <li>
                <Link
                  href={`/training/exercices/${moduleName}/${currentExercice}.jsx`}
                >
                  Exercice
                </Link>
              </li>
              {currentSolution.map((s) => (
                <li key={s}>
                  <Link href={`/training/solutions/${moduleName}/${s}.jsx`}>
                    Solution {s}
                  </Link>
                </li>
              ))}
            </ul>
          </details>
        </header>
        <div className="border-dashed border border-accent rounded-md p-4">
          <RenderedComponent />
        </div>
      </div>
    </div>
  );
}

const TrainingContent = async ({ moduleName, exerciseNumber }) => {
  try {
    const trainingDirectory = path.join(
      process.cwd(),
      `app/instructions/${moduleName}`
    );
    const pth = path.join(
      trainingDirectory,
      `${exerciseNumber.replace(".jsx", "")}.md`
    );

    const instruction = await fs.readFile(pth, "utf-8");

    return <Instruction instruction={instruction} />;
  } catch {
    return null;
  }
};
