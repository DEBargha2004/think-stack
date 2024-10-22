import { cn } from "@/lib/utils";
import { RendererProps } from "@/types/content";
import { forwardRef, HTMLProps } from "react";

const Renderer = forwardRef<
  HTMLIFrameElement,
  RendererProps<HTMLProps<HTMLIFrameElement>>
>(({ value, className, ...props }, ref) => {
  return (
    <iframe
      src={value}
      className={cn("w-full aspect-[2/1]", className)}
      ref={ref}
      {...props}
    />
  );
});

Renderer.displayName = "Renderer";

export default Renderer;
