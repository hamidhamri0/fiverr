import { HiDotsHorizontal } from "react-icons/hi";

export default function ShowMore() {
  return (
    <button className="flex items-center rounded-md border border-gray-200 bg-white p-1 px-2">
      <HiDotsHorizontal size={20} color="black" />
    </button>
  );
}
