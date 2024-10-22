import { getIdeaFromDB } from "@/actions/idea";
import IdeaForkForm from "@/components/custom/forms/fork-idea-form";
import { isActionError } from "@/lib/utils";
import { auth } from "@clerk/nextjs/server";

export default async function Page({ params }: { params: { id: string } }) {
  const { userId } = auth();

  const resp = await getIdeaFromDB(params.id);

  if (isActionError(resp)) {
    return <h1 className="text-center text-base">{resp.error}</h1>;
  }

  if (!resp) return <p className="text-center">Idea not found</p>;

  if (resp.idea.userId === userId) {
    return <p className="text-center">You cannot fork your own idea</p>;
  }

  if (resp.idea.visibility === "private") {
    return <p className="text-center">You cannot fork a private idea</p>;
  }

  if (resp.idea.userId !== userId && resp.idea.visibility === "public") {
    return <IdeaForkForm idea={resp.idea} />;
  }
}
