import React from "react";
import { CiCircleRemove } from "react-icons/ci";
import { IoIosRemoveCircleOutline } from "react-icons/io";

function SelectedItem() {
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

export default function SelectedFilters() {
  return (
    <div className="mx-auto mb-6 flex max-w-[1450px] flex-wrap items-center gap-4 px-2">
      <SelectedItem />
      <SelectedItem />
      <SelectedItem />
      <SelectedItem />
      <SelectedItem />
      <SelectedItem />
      <SelectedItem />
      <SelectedItem />
      <SelectedItem />
    </div>
  );
}
