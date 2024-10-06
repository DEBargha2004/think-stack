import { cn } from "@/lib/utils";
import { HTMLProps } from "react";
import AppLogo from "./app-logo";
import { UserButton } from "@clerk/nextjs";
import { ModeTogglerSelect } from "./mode-toggler";
import Link from "next/link";
import CreateIdeaButton from "./create-idea-button";

export default function Navbar({
  className,
  ...props
}: HTMLProps<HTMLDivElement>) {
  return (
    <nav
      className={cn(
        "h-16 p-2 shadow shadow-muted bg-blur",
        "flex justify-between items-center",
        className,
      )}
      {...props}
    >
      <Link href="/">
        <AppLogo size={"sm"} />
      </Link>
      <div className="flex justify-start items-center gap-4">
        <CreateIdeaButton />
        <UserButton />
        <ModeTogglerSelect />
      </div>
    </nav>
  );
}
