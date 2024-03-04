import { MDXRemote } from "next-mdx-remote/rsc";
import { Suspense } from "react";
import { InstructionToggle } from "./InstructionToggle";

export const Instruction = ({ instruction }) => {
  return (
    <InstructionToggle>
      <Suspense fallback={<>Loading...</>}>
        <article className="prose">
          <MDXRemote source={instruction} />
        </article>
      </Suspense>
    </InstructionToggle>
  );
};
