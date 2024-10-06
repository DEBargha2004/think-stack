import mongoose from "mongoose";

/**
 * TUser is the type of a user
 */
interface IUser extends mongoose.Document {
  _id: string;
  userId: String;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: Date;
}

const UserSchema = new mongoose.Schema<IUser>({
  userId: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String },
  email: { type: String, required: true, unique: true },
  createdAt: { type: Date, required: true, default: Date.now },
});

export { UserSchema, type IUser };
