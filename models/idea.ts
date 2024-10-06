import mongoose from "mongoose";
import { IdeasSchema, IIdea } from "../schema/idea";

const Idea: mongoose.Model<IIdea> =
  mongoose.models.Idea || mongoose.model<IIdea>("Idea", IdeasSchema);

export { Idea };
