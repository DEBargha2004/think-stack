import { create } from "zustand";
import { produce } from "immer";
import { IIdea } from "../../schema/idea";

type State = {
  ideas: null | IIdea[];
};
type Action = {
  setIdeas: (ideas: IIdea[]) => void;
  deleteIdea: (id: string) => void;
  addIdea: (idea: IIdea) => void;
  getIdea: (id: string) => IIdea | undefined;
  mofidyIdea: (fn: (idea: IIdea[]) => void) => void;
};

export const useGlobalAppStore = create<State & Action>((set) => ({
  ideas: null,
  initializeIdeas(ideas: IIdea[]) {
    set(
      produce((state: State) => {
        state.ideas = ideas;
      }),
    );
  },
  setIdeas(ideas) {
    set(
      produce((state: State) => {
        state.ideas = ideas;
      }),
    );
  },
  deleteIdea(id: string) {
    set(
      produce((state: State) => {
        if (!state.ideas) return;
        state.ideas = state.ideas.filter((idea) => idea._id !== id);
      }),
    );
  },
  addIdea(idea) {
    set(
      produce((state: State) => {
        if (!state.ideas) return;
        state.ideas.unshift(idea);
      }),
    );
  },
  getIdea(id) {
    if (!this.ideas) return;
    return this.ideas.find((idea) => idea._id === id);
  },
  mofidyIdea(fn) {
    set(
      produce((state: State) => {
        fn(state.ideas || []);
      }),
    );
  },
}));
