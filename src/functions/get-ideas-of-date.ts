import { IIdea } from "../../schema/idea";

export function getIdeasOfDate(ideas: IIdea[], date: Date) {
  return ideas.filter(
    (idea) => idea.createdAt.toDateString() === date.toDateString(),
  );
}
