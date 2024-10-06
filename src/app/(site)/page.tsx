import { getIdeasOfUserFromDB } from "@/actions/idea";
import { isActionError } from "@/lib/utils";
import IdeasCollection from "@/components/custom/ideas-collection";

export default async function Home() {
  const ideas = await getIdeasOfUserFromDB();

  if (isActionError(ideas) || !ideas) {
    return null;
  }

  return (
    <main className="py-5">
      <IdeasCollection initialValue={ideas.ideas} />
    </main>
  );
}
