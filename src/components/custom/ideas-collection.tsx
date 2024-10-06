"use client";

import { useMemo } from "react";
import { IIdea } from "../../../schema/idea";
import { useGlobalAppStore } from "@/store/global-app-store";
import parseDate from "@/functions/parse-date";
import Idea from "./idea";

export default function IdeasCollection({
  initialValue,
}: {
  initialValue: IIdea[];
}) {
  const { ideas, setIdeas } = useGlobalAppStore();

  const formattedIdeasByDate = useMemo(() => {
    const ideasByDate: { date: Date; ideas: IIdea[] }[] = [];

    let collection = initialValue;

    if (ideas) collection = [...ideas];
    if (ideas === null) setIdeas(initialValue);

    collection?.forEach((idea) => {
      const date = new Date(idea.createdAt);
      const found = ideasByDate.find(
        (i) => i.date.toDateString() === date.toDateString(),
      );
      if (found) found.ideas.push(idea);
      else
        ideasByDate.push({
          date,
          ideas: [idea],
        });
    });

    return ideasByDate;
  }, [ideas]);

  return (
    <>
      {formattedIdeasByDate.map((ideaOfDate) => (
        <section key={ideaOfDate.date.toDateString()} className="space-y-6">
          <h1 className="text-3xl">{parseDate(ideaOfDate.date)}</h1>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
            {ideaOfDate.ideas.map((idea) => (
              <Idea key={idea._id} idea={idea} />
            ))}
          </div>
        </section>
      ))}
    </>
  );
}
