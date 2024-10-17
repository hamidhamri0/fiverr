import LettersCount from "@/Components/Molecules/LettersCount";
import { useEffect } from "react";
import { useController, useFormContext } from "react-hook-form";

export default function TitleInput() {
  const {
    formState: { errors },
    setFocus,
  } = useFormContext();
  const {
    field: { value: title, onChange: onChangeTitle, ref: titleRef },
  } = useController({
    name: "title",
    rules: {
      required: "Title is required",
      minLength: {
        value: 15,
        message: "Title should be at least 15 characters",
      },
      maxLength: {
        value: 80,
        message: "Title should be at max 80 characters",
      },
      validate: {
        minWords: (value) => {
          const wordCount = value.trim().split(/\s+/).length;
          return wordCount >= 4 || "Title should have at least 4 words";
        },
      },
    },
  });
  useEffect(() => {
    setFocus("title");
  }, [setFocus]);
  return (
    <div className="mb-6 grid grid-cols-[1fr_2fr] items-center gap-4">
      <label
        htmlFor="title"
        className="mb-1 block text-base font-semibold text-gray-700"
      >
        Gig title
        <p className="mb-2 text-sm text-gray-500">
          As your Gig storefront, your title is the most important place to
          include keywords that buyers would likely use to search for a service
          like yours.
        </p>
      </label>
      <div>
        <textarea
          ref={titleRef}
          value={title}
          onChange={(e) => onChangeTitle(e.target.value)}
          id="title"
          className={`w-full rounded-md border p-2 ${errors.title ? "border-red-500" : "border-gray-300"}`}
          placeholder="I will do something I'm really good at"
        />
        <p className="mt-1 text-sm text-red-500">
          {errors.title && (errors.title.message as string)}
        </p>
        <LettersCount />
      </div>
    </div>
  );
}
