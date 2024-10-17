"use client";
import React from "react";
import { Tag } from "@fiverr/shared";
import TagButton from "@/Components/Atoms/tagButton";

export default function RelatedTags({ tags }: { tags: Tag[] }) {
  return (
    <div className="p-2">
      <h2 className="mb-2 text-xl font-semibold text-gray-800">Related Tags</h2>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <TagButton tag={tag} key={tag.name} />
        ))}
      </div>
    </div>
  );
}
