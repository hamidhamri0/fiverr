"use client";

import React, { useState } from "react";
import { FaHeart } from "react-icons/fa";
import Share from "@/Components/Atoms/ShareButton";
import ShowMore from "@/Components/Atoms/ShowMoreButton";
import CommentCounter from "@/Components/Atoms/CommentCounter";

export function AddToList() {
  const [addedToList, setAddedToList] = useState(false);
  return (
    <button
      onClick={() => setAddedToList((p) => !p)}
      className="flex items-center"
    >
      {addedToList ? (
        <FaHeart className="opacity-20" size={25} color="black" fill="red" />
      ) : (
        <FaHeart size={25} color="black" fill="#ec3131" />
      )}
    </button>
  );
}

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
