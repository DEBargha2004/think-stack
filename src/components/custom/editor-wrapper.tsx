import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";

export default function EditorWrapper({
  children,
  onDelete,
}: {
  children: React.ReactNode;
  onDelete: () => void;
}) {
  return (
    <div className="relative group">
      <div className="flex justify-end mb-2">
        <Button
          className={cn(
            "h-8 px-0 aspect-square",
            "bg-destructive/80 hover:bg-destructive",
            "md:hidden invisible group-focus-within:visible md:group-focus-within:invisible",
          )}
          onClick={onDelete}
        >
          <Trash2 className="text-destructive-foreground h-4 w-4" />
        </Button>
      </div>
      {children}
      <Button
        className={cn(
          "h-8 px-0 aspect-square absolute -right-10 top-2",
          "hidden md:group-focus-within:inline-flex bg-destructive/80 hover:bg-destructive",
          "",
        )}
        onClick={onDelete}
      >
        <Trash2 className="text-destructive-foreground h-4 w-4" />
      </Button>
    </div>
  );
}
