import Link from "next/link";
import { ThemeController } from "./ThemeController";

export const Header = () => {
  return (
    <header className="flex gap-4 border-b border-base-300 py-2 px-4">
      <Link href="/" className="text-xl font-bold flex-1">
        BeginReact
      </Link>

      <ThemeController />
    </header>
  );
};
