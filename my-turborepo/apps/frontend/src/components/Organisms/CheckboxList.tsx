import CheckboxItem from "@/Components/Atoms/CheckboxItem";
import { useState } from "react";

export default function CheckboxList({ options }: { options: string[] }) {
  const [showMore, setShowMore] = useState<boolean>(false);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const languages = showMore
    ? options
    : options.slice(0, Math.min(options.length, 6));
  const buttonText = showMore
    ? "Show less"
    : "+" + (options.length - 6) + " more";

  const handleCheckboxChange = (language: string) => {
    setSelectedLanguages((prevSelected) =>
      prevSelected.includes(language)
        ? prevSelected.filter((lang) => lang !== language)
        : [...prevSelected, language],
    );
  };

  return (
    <div className="mx-auto mb-6 w-[90%] border-b border-gray-200 p-4 text-gray-900">
      <h4 className="mb-5 text-lg font-semibold">Programming language</h4>
      <div className="grid grid-cols-2">
        {languages.map((el) => (
          <CheckboxItem key={el} label={el} />
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
