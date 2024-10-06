"use server";

import { ServerActionResponse } from "@/lib/utils";
import { clerkClient } from "@clerk/nextjs/server";
import { User } from "../../models/user";
import { connectDB } from "@/lib/db";
import { IUser } from "../../schema/user";

export async function createUser(
  userId: string,
): Promise<ServerActionResponse<{ user: IUser }>> {
  try {
    await connectDB();

    // Check if user already exists
    const dbUser = await User.findOne({ userId });
    if (dbUser) return { error: "User already exists" };

    // Get User Info from Clerk
    const clerkUser = await clerkClient().users.getUser(userId)!;

    // Create User
    const user = await User.create({
      userId: clerkUser.id,
      firstName: clerkUser.firstName,
      lastName: clerkUser.lastName,
      email: clerkUser.primaryEmailAddress?.emailAddress,
    });

    return {
      user,
    };
  } catch (error) {
    console.error(error);
    return {
      error: "Failed to create user",
    };
  }
}

export async function deleteUser(
  userId: string,
): Promise<ServerActionResponse> {
  try {
    await connectDB();
    await User.findOneAndDelete({ userId });
    return {
      message: "User deleted successfully",
    };
  } catch (error) {
    return {
      error: "Failed to delete user",
    };
  }
}
