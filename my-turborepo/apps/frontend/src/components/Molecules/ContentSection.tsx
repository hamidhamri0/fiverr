import OpenArrowButton from "@/Components/Atoms/OpenArrowButton";
import { useState } from "react";

export default function ContentSection({
  title,
  content,
}: {
  title: string;
  content: string[];
}) {
  const [isOpen, setOpen] = useState(false);

  return (
    <div className="flex w-full max-w-[260px] flex-col gap-4 sm:max-w-full">
      <div onClick={() => setOpen((p) => !p)} className="flex">
        <h2 className="font-bold">{title}</h2>
        <OpenArrowButton isOpen={isOpen} />
      </div>
      <div
        className={`flex flex-col gap-4 ${isOpen ? "sm:flex" : "sm:hidden"}`}
      >
        {content.map((el) => {
          return (
            <a
              className="cursor-pointer text-gray-500 hover:underline"
              key={el}
            >
              {el}
            </a>
          );
        })}
      </div>
    </div>
  );
}
