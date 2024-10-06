import mongoose from "mongoose";

const visibility = [
  {
    value: "private",
    label: "Private",
  },
  {
    value: "public",
    label: "Public",
  },
] as const;

type TTextContent = {
  _id: string;
  type: "text";
  data: string;
};

type TSnippetContent = {
  _id: string;
  type: "snippet";
  language: string;
  data: string;
};

type TEmbedContent = {
  _id: string;
  type: "embed";
  data: string;
};

type TContent = TTextContent | TEmbedContent | TSnippetContent;

/**
 * TIdeas is basically the type of notes created by a user
 */
interface IIdea extends mongoose.Document {
  _id: string;
  userId: string;
  visibility: string;
  title: string;
  isForked: boolean;
  content: TContent[];
  createdAt: Date;
}

const ContentSchema = new mongoose.Schema<TContent>({
  type: { type: String, required: true, enum: ["text", "snippet", "embed"] },
  data: { type: String, required: true },
  language: {
    type: String,
    required() {
      return this.type === "snippet";
    },
  },
});

const IdeasSchema: mongoose.Schema<IIdea> = new mongoose.Schema({
  userId: { type: String, ref: "User", required: true },
  title: { type: String },
  visibility: {
    type: String,
    enum: visibility.map((v) => v.value),
    default: "private",
  },
  isForked: { type: Boolean, default: false },
  createdAt: { type: Date, required: true, default: Date.now },
  content: [ContentSchema],
});

export {
  IdeasSchema,
  type IIdea,
  type TContent,
  type TTextContent,
  type TEmbedContent,
  type TSnippetContent,
  visibility,
};
