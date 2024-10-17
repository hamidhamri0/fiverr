import React from "react";
import { Tag } from "@fiverr/shared";
export default function TagButton({ tag }: { tag: Tag }) {
  return (
    <button
      key={tag.name}
      className="rounded border border-gray-200 bg-gray-100 px-2 py-1 text-sm transition-all hover:text-green-400 hover:underline"
    >
      {tag.name}
    </button>
  );
}
