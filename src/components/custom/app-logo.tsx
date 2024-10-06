import Image, { ImageProps } from "next/image";
import applogo from "@/../public/app-logo.webp";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const appLogoVariants = cva("h-10 w-10 object-contain", {
  variants: {
    size: {
      default: "",
      sm: "h-8 w-8",
      base: "h-10 w-10",
      lg: "h-12 w-12",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

interface AppLogoProps
  extends Partial<ImageProps>,
    VariantProps<typeof appLogoVariants> {}

export default function AppLogo({
  className,
  src,
  alt,
  size,
  ...props
}: AppLogoProps) {
  return (
    <Image
      src={src || applogo}
      alt={alt || "logo"}
      title="ThinkStack"
      width={100}
      height={100}
      className={cn("", appLogoVariants({ size, className }))}
      {...props}
    />
  );
}
