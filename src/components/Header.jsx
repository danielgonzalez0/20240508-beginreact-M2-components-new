import Link from "next/link";
import { ThemeController } from "./ThemeController";

export const Header = () => {
  return (
    <header className="flex gap-4 border-b border-base-300 px-4 py-2">
      <Link href="/" className="flex-1 text-xl font-bold">
        BeginReact
      </Link>

      <ThemeController />
    </header>
  );
};
