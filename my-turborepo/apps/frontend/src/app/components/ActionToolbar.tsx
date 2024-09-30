import React, { useState } from "react";
import { FaHeart } from "react-icons/fa";
import { HiDotsHorizontal } from "react-icons/hi";
import { IoShareSocialSharp } from "react-icons/io5";

function ShowMore() {
  return (
    <button className="flex items-center rounded-md border border-gray-200 bg-white p-1 px-2">
      <HiDotsHorizontal size={20} color="black" />
    </button>
  );
}

function Share() {
  return (
    <button className="flex items-center rounded-md border border-gray-200 bg-white p-1 px-2">
      <IoShareSocialSharp size={20} color="black" />
    </button>
  );
}

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

const CommentCounter = ({ count }: { count: number }) => {
  return (
    <div className="flex items-center rounded-md border border-gray-200 bg-white p-1 px-2">
      <span>{count}</span>
    </div>
  );
};

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
