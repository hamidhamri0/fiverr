import RenderFilter, {
  RenderFilterProps,
} from "@/Components/Molecules/RenderFilter";
import { useState } from "react";

type FilterRadioProps = {
  options: RenderFilterProps[];
};
export default function RadioList({ options }: FilterRadioProps) {
  const [showMore, setShowMore] = useState<boolean>(false);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const radios = showMore
    ? options
    : options.slice(0, Math.min(options.length, 6));
  const buttonText = showMore
    ? "Show less"
    : "+" + (options.length - 6) + " more";

  const handleCheckboxChange = (language: string) => {
    setSelectedLanguages((prevSelected) =>
      prevSelected.includes(language)
        ? prevSelected.filter((lang) => lang !== language)
        : [language],
    );
  };

  return (
    <div className="mx-auto mb-6 w-[90%] border-b border-gray-200 p-4 text-gray-900">
      <h4 className="mb-5 text-lg font-semibold">Programming language</h4>
      <div className="flex flex-col">
        {options.map((el) => (
          <RenderFilter
            key={el.value}
            suffix={el.suffix}
            type={el.type}
            value={el.value}
          />
        ))}
      </div>
      {options.length - 6 > 0 && (
        <button
          onClick={() => setShowMore((prev) => !prev)}
          className="cursor-pointer text-sm font-bold text-gray-500"
        >
          {buttonText}
        </button>
      )}
    </div>
  );
}
