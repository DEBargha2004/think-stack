import Link from "next/link";
import { MakePublicButton } from "./make-public";
import { Button } from "../ui/button";

export default function IdeaControls({
  id,
  controls = {},
}: {
  id: string;
  controls?: { edit?: boolean; visibility?: boolean; fork?: boolean };
}) {
  return (
    <>
      {controls.visibility && <MakePublicButton id={id} />}
      {controls.fork && (
        <Link href={`/ideas/${id}/fork`}>
          <Button variant={"outline"}>
            <span>Fork</span>
          </Button>
        </Link>
      )}
      {controls.edit && (
        <Link href={`/ideas/${id}/edit`}>
          <Button variant={"ghost"}>
            <span>Edit</span>
          </Button>
        </Link>
      )}
    </>
  );
}
