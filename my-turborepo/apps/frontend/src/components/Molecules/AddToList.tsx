import { useState } from "react";
import { FaHeart } from "react-icons/fa";

export default function AddToList() {
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
