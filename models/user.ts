import mongoose from "mongoose";
import { type IUser, UserSchema } from "../schema/user";

const User: mongoose.Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export { User };
