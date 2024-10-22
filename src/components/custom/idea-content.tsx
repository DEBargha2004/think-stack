"use client";

import { HTMLProps } from "react";
import { TContent } from "../../../schema/idea";

import TextRenderer from "@/components/custom/content/textarea/renderer";
import EmbedRenderer from "@/components/custom/content/embed/renderer";
import CodeRenderer from "@/components/custom/content/code/renderer";

export default function IdeaContent({
  ideaContent,
  className,
}: HTMLProps<HTMLDivElement> & { ideaContent: TContent }) {
  switch (ideaContent.type) {
    case "text":
      return <TextRenderer value={ideaContent.data} className={className} />;
    case "embed":
      return <EmbedRenderer value={ideaContent.data} className={className} />;
    case "snippet":
      return <CodeRenderer value={ideaContent.data} className={className} />;
    default:
      return <></>;
  }
}
