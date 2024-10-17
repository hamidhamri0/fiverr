import RadioItem  from "@/Components/Atoms/RadioItem";
import { useRef } from "react";

export default function PriceRangeItem({ value }: { value: string }) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFocus = () => {
    inputRef.current?.focus();
  };

  return (
    <div className="flex flex-col">
      <RadioItem onClick={handleFocus} value="Custom" />
      <div className="ml-6">
        <input
          type="text"
          id="first_name"
          ref={inputRef}
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-black focus:ring-black dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-white dark:focus:ring-white"
          placeholder="Enter budget"
          required
          onClick={handleFocus}
        />
      </div>
    </div>
  );
}
