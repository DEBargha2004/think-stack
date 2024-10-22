import { cn } from "@/lib/utils";
import { RendererProps } from "@/types/content";
import { forwardRef, HTMLProps } from "react";

const Renderer = forwardRef<
  HTMLDivElement,
  RendererProps<HTMLProps<HTMLDivElement>>
>(({ value, className, ...props }, ref) => {
  return (
    <div
      className={cn("text-foreground w-full overflow-x-auto", className)}
      {...props}
      ref={ref}
    >
      {value}
    </div>
  );
});

Renderer.displayName = "Renderer";

export default Renderer;
