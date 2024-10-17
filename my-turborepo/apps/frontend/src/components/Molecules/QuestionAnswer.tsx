import OpenArrowButton from "@/Components/Atoms/OpenArrowButton";
import { useRef, useState } from "react";

export default function QuestionAnswer({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  const [open, setOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  return (
    <div
      onClick={() => setOpen((p) => !p)}
      className={`flex cursor-pointer flex-col border-b border-gray-100 py-2`}
    >
      <div className="flex items-center">
        <h3 className="mb-3 text-lg font-semibold text-gray-600">{question}</h3>
        <OpenArrowButton className="block" isOpen={open} />
      </div>
      <div
        ref={contentRef}
        className={`overflow-hidden transition-all duration-300`}
        style={{
          maxHeight: open ? `${contentRef.current?.scrollHeight}px` : "0px",
        }}
      >
        <p className="text-gray-600">{answer}</p>
      </div>
    </div>
  );
}
