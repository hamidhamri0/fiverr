import { RadioItemProps } from "@/Components/Molecules/RenderFilter";

export default function RadioItem({ suffix, value, onClick }: RadioItemProps) {
  return (
    <div key={value} className="flex items-center">
      <input
        onClick={onClick}
        id={value}
        type="radio"
        value=""
        name="bordered-radio"
        className="h-5 w-5 border-gray-300 bg-gray-100 accent-black dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800"
      />
      <label
        htmlFor={value}
        className="ms-2 w-full py-4 text-sm font-medium text-gray-900 dark:text-gray-300"
      >
        <span className="mr-2 text-base font-bold">{value}</span>

        <span className="text-gray-400">{suffix}</span>
      </label>
    </div>
  );
}
