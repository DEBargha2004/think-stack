"use server";

import { ServerActionResponse } from "@/lib/utils";
import { auth } from "@clerk/nextjs/server";
import { Idea } from "../../models/idea";
import { IIdea, TContent } from "../../schema/idea";
import { connectDB } from "@/lib/db";
import { TIdeaSchema } from "@/schema/idea";
import { TIdeaForkSchema } from "@/schema/idea-fork";

type TDataWithId<T = Record<string, unknown>> = { _id: string } & T;

function removeId<T>(data: TDataWithId<T>[]) {
  return data.map((d) => {
    const { _id, ...rest } = d;
    return rest;
  });
}

async function createIdeaIntoDB(
  data?: TIdeaSchema,
): Promise<ServerActionResponse<{ idea: IIdea }>> {
  const { userId, sessionId } = auth();

  if (!userId || !sessionId)
    return {
      error: "Not logged in",
    };

  try {
    await connectDB();

    const content: Omit<TContent, "_id">[] = data?.description
      ? [{ type: "text", data: data.description }]
      : [];

    const idea = new Idea({
      userId,
      title: data?.title,
      content: content,
      visibility: data?.visibility ?? "private",
    });

    console.log(idea.toObject());

    await idea.save();

    return {
      idea: idea.toObject(),
    };
  } catch (error) {
    return {
      error: "Failed to create idea",
    };
  }
}

async function getIdeaFromDB(
  id: string,
): Promise<ServerActionResponse<{ idea: IIdea }>> {
  const { userId, sessionId } = auth();

  if (!userId || !sessionId)
    return {
      error: "Not logged in",
    };

  try {
    await connectDB();
    const idea = await Idea.findById(id).lean();

    if (!idea)
      return {
        error: "Idea not found",
      };

    if (idea.userId === userId)
      return {
        idea,
      };

    if (idea.visibility === "public")
      return {
        idea,
      };
    else
      return {
        error: "Access denied",
      };
  } catch (error) {
    return {
      error: "Failed to get idea",
    };
  }
}

async function getIdeasOfUserFromDB(options?: {
  endDate: string;
  startDate: string;
}): Promise<ServerActionResponse<{ ideas: IIdea[] }>> {
  const { userId, sessionId } = auth();

  if (!userId || !sessionId)
    return {
      error: "Not logged in",
    };

  try {
    await connectDB();

    const ideas = await Idea.find({ userId }).lean();

    const sortedIdeas = ideas.sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    return {
      ideas: sortedIdeas,
    };
  } catch (error) {
    return {
      error: "Failed to get ideas",
    };
  }
}

async function updateIdeaIntoDB(data: IIdea): Promise<ServerActionResponse> {
  const { userId, sessionId } = auth();

  if (!userId || !sessionId)
    return {
      error: "Not logged in",
    };

  try {
    await connectDB();
    const idea = await Idea.findById(data._id);
    if (idea?.userId !== userId)
      return {
        error: "Access denied",
      };
    await Idea.findByIdAndUpdate(data._id, {
      ...data,
      content: removeId(data.content),
    });
    return {
      message: "Idea updated successfully",
    };
  } catch (error) {
    return {
      error: "Failed to update idea",
    };
  }
}

async function updateIdeaVisibilityIntoDB(
  id: string,
  visibility: "public" | "private",
): Promise<ServerActionResponse> {
  const { userId, sessionId } = auth();

  if (!userId || !sessionId)
    return {
      error: "Not logged in",
    };

  try {
    await connectDB();
    const idea = await Idea.findOne({ _id: id });
    if (idea?.userId !== userId)
      return {
        error: "Access denied",
      };

    await Idea.updateOne(
      { _id: id },
      {
        $set: { visibility },
      },
    );
    return {
      message: "Idea visibility updated successfully",
    };
  } catch (error) {
    return {
      error: "Failed to update idea visibility",
    };
  }
}

async function forkIdeaIntoDB(
  id: string,
  data: TIdeaForkSchema,
): Promise<ServerActionResponse<{ idea: IIdea }>> {
  const { userId, sessionId } = auth();

  if (!userId || !sessionId)
    return {
      error: "Not logged in",
    };

  try {
    await connectDB();
    const idea = await Idea.findById(id);
    if (!idea) {
      return {
        error: "Idea not found",
      };
    }
    if (idea?.userId === userId) {
      return {
        error: "You cannot fork your own idea",
      };
    }
    if (idea?.visibility === "private") {
      return {
        error: "You cannot fork a private idea",
      };
    }

    const newIdea = new Idea({
      title: data.title,
      content: removeId(idea.content),
      visibility: data.visibility,
      userId,
      isForked: true,
    });

    await newIdea.save();
    return {
      idea: newIdea.toObject(),
    };
  } catch (error) {
    return {
      error: "Failed to fork idea",
    };
  }
}

async function deleteIdeaFromDB(id: string): Promise<ServerActionResponse> {
  const { userId, sessionId } = auth();

  if (!userId || !sessionId)
    return {
      error: "Not logged in",
    };

  try {
    await connectDB();
    await Idea.findByIdAndDelete(id);
    return {
      message: "Idea deleted successfully",
    };
  } catch (error) {
    return {
      error: "Failed to delete idea",
    };
  }
}

export {
  createIdeaIntoDB,
  getIdeaFromDB,
  getIdeasOfUserFromDB,
  updateIdeaIntoDB,
  updateIdeaVisibilityIntoDB,
  forkIdeaIntoDB,
  deleteIdeaFromDB,
};
