import { cn } from "@/lib/utils";
import { HTMLProps } from "react";

export default function IdeaContentContainer({
  className,
  children,
  ...props
}: HTMLProps<HTMLDivElement> & {}) {
  return (
    <div
      className={cn("flex justify-center items-start p-4", className)}
      {...props}
    >
      <div className="w-full md:w-[700px] lg:w-[900px]">{children}</div>
    </div>
  );
}
