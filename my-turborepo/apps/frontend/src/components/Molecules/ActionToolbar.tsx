import React from "react";
import Share from "@/Components/Atoms/ShareButton";
import ShowMore from "@/Components/Atoms/ShowMoreButton";
import CommentCounter from "@/Components/Atoms/CommentCounter";
import AddToList from "@/Components/Molecules/AddToList";

export default function ActionToolbar() {
  return (
    <div className="flex gap-2 p-2">
      <AddToList />
      <CommentCounter count={541} />
      <Share />
      <ShowMore />
    </div>
  );
}
