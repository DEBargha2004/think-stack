import { useIdeaPlaygroundContext } from "@/providers/idea-playground";
import EditorWrapper from "./editor-wrapper";

import TextareaEditor from "@/components/custom/content/textarea/editor";
import CodeEditor from "@/components/custom/content/code/editor";
import EmbedEditor from "@/components/custom/content/embed/editor";

function IdeaContentEditor({ value, index }: { value: string; index: number }) {
  const { setIdea, ideaState } = useIdeaPlaygroundContext();

  const defaultChangeHandler = (value: string) => {
    setIdea((idea) => {
      idea.content[index].data = value;
    });
  };

  const handleDelete = () => {
    setIdea((idea) => {
      idea.content.splice(index, 1);
    });
  };

  return (
    <EditorWrapper onDelete={handleDelete}>
      {ideaState.content[index].type === "text" && (
        <TextareaEditor value={value} onChange={defaultChangeHandler} />
      )}
      {ideaState.content[index].type === "snippet" && (
        <CodeEditor value={value} onChange={defaultChangeHandler} />
      )}
      {ideaState.content[index].type === "embed" && (
        <EmbedEditor value={value} onChange={defaultChangeHandler} />
      )}
    </EditorWrapper>
  );
}

export { IdeaContentEditor };
