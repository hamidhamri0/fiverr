import { IoIosRemoveCircleOutline } from "react-icons/io";

export default function SelectedFilter() {
  return (
    <div className="flex items-center justify-between gap-2 rounded-full bg-gray-200 px-4 py-2">
      <span className="text-sm font-bold text-gray-900">
        Programming & Tech
      </span>
      <span className="cursor-pointer text-sm font-semibold">
        <IoIosRemoveCircleOutline size={20} />
      </span>
    </div>
  );
}
