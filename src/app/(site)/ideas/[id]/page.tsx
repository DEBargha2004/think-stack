import { getIdeaFromDB } from "@/actions/idea";
import IdeaContentContainer from "@/components/custom/idea-content-container";
import { IdeaPreview } from "@/components/custom/idea-preview";
import { isActionError } from "@/lib/utils";
import { IdeaPlaygroundProvider } from "@/providers/idea-playground";
import { auth } from "@clerk/nextjs/server";

export default async function Page({ params }: { params: { id: string } }) {
  const resp = await getIdeaFromDB(params.id);
  const { userId } = auth();

  if (isActionError(resp)) {
    return <h1 className="text-center text-base">{resp.error}</h1>;
  }

  if (!resp) return <p className="text-center">Idea not found</p>;

  return (
    <IdeaPlaygroundProvider idea={resp.idea}>
      <IdeaContentContainer>
        <IdeaPreview
          idea={resp.idea}
          previewOnly={false}
          userId={userId ?? ""}
        />
      </IdeaContentContainer>
    </IdeaPlaygroundProvider>
  );
}
