"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { IIdea } from "@/../schema/idea";
import { produce } from "immer";
import { useGlobalAppStore } from "@/store/global-app-store";

type TIdeaPlaygroundContext = {
  ideaState: IIdea;
  setIdea: (recipe: (idea: IIdea) => void) => void;
};

const IdeaPlaygroundContext = createContext<TIdeaPlaygroundContext | null>(
  null,
);

function useIdeaPlaygroundContext() {
  const context = useContext(IdeaPlaygroundContext);

  if (!context) {
    throw new Error(
      "useIdeaPlaygroundContext must be used within an IdeaPlaygroundProvider",
    );
  }

  return context;
}

function IdeaPlaygroundProvider({
  children,
  idea,
}: {
  children: React.ReactNode;
  idea: IIdea;
}) {
  const [ideaState, setIdeaState] = useState<IIdea>(idea);
  const { mofidyIdea } = useGlobalAppStore();

  const setIdea: TIdeaPlaygroundContext["setIdea"] = (fn) => {
    setIdeaState(
      produce((state: IIdea) => {
        fn(state);
      }),
    );
  };

  useEffect(() => {
    mofidyIdea((ideas) => {
      const ideaIndex = ideas?.findIndex((i) => i._id === ideaState._id);
      if (ideaIndex === -1) return;

      ideas[ideaIndex] = ideaState;
    });
  }, [ideaState]);
  return (
    <IdeaPlaygroundContext.Provider value={{ ideaState, setIdea }}>
      {children}
    </IdeaPlaygroundContext.Provider>
  );
}

export {
  IdeaPlaygroundContext,
  useIdeaPlaygroundContext,
  IdeaPlaygroundProvider,
  type TIdeaPlaygroundContext,
};
