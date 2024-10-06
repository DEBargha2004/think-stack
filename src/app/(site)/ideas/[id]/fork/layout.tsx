import { cn } from "@/lib/utils";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={cn(
        "h-[calc(100svh-5em)] flex flex-col justify-center items-center p-2",
      )}
    >
      <div className="md:w-[600px] sm:w-[400px] w-full">{children}</div>
    </div>
  );
}
