import { useOutsideClick } from "@/Hooks/useOutsideClick";
import { get } from "@/lib/utils/customFetch";
import debounce from "@/lib/utils/debounce";
import { useCallback, useEffect, useRef, useState } from "react";
import { Control, useController } from "react-hook-form";
import toast from "react-hot-toast";

type TagsType = {
  id: number;
  name: string;
};

type TagInputProps = {
  control: Control<any>;
  maxTags?: number;
};

export default function TagsInput({ control, maxTags = 5 }: TagInputProps) {
  const {
    field: { onChange, value: tags },
    formState: { errors },
  } = useController({
    name: "tags",
    control,
    rules: {
      validate: {
        minLength(value) {
          if (value.length < 1) return "You need to select at least one tag";
          if (value.length > 5) return "You can only select 5 tags";
          return true;
        },
      },
    },
    defaultValue: [],
  });
  const [inputValue, setInputValue] = useState<string>("");
  const [activeSuggestions, setActiveSuggestions] = useState<TagsType[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    const adjustInputWidth = () => {
      if (inputRef.current) {
        inputRef.current.style.width = `${Math.max(20, inputValue.length * 10)}px`;
      }
    };

    if (inputRef.current) {
      adjustInputWidth();
    }
  }, [tags, inputValue]);
  const suggestionsRef = useOutsideClick(() => {
    setActiveSuggestions([]);
  });
  const handleInputChange = useCallback(
    debounce(async (value: string) => {
      if (value.length > 0) {
        try {
          let data = await get<TagsType[]>(`/tags/getOneByName?name=${value}`);
          setActiveSuggestions(data);
        } catch (err) {
          toast.error("Something went wrong");
        }
      } else {
        setActiveSuggestions([]);
      }
    }, 300),
    [tags],
  );
  useEffect(() => {
    handleInputChange(inputValue);
  }, [inputValue, handleInputChange]);

  const addTag = (newTag: TagsType) => {
    // handle duplicates
    const isDuplicates = tags.some((tag: TagsType) => tag.id === newTag.id);
    if (isDuplicates) return;
    const newTags = [...tags, newTag];
    onChange(newTags);
    setInputValue("");
    setActiveSuggestions([]);
  };

  const removeTag = (id: number) => {
    const newTags = tags.filter((tag: TagsType, i: number) => tag.id !== id);
    onChange(newTags);
  };

  const removeWithBackspace = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && inputValue === "") {
      const newTags = tags.slice(0, tags.length - 1);
      onChange(newTags);
    }
  };

  const handleClickParentDiv = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div
      onClick={handleClickParentDiv}
      className="relative mb-16 w-full max-w-md"
    >
      <div
        className={`flex flex-wrap items-center gap-2 rounded-lg border bg-white p-2 shadow-sm transition-all duration-300 ${errors.tags ? "border-red-500" : "border-gray-300"}`}
      >
        {tags.map((tag: TagsType, index: number) => (
          <span
            key={tag.id}
            className="flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-800"
          >
            {tag.name}
            <button
              onClick={() => removeTag(tag.id)}
              className="ml-2 text-blue-600 hover:text-blue-800 focus:outline-none"
            >
              &times;
            </button>
          </span>
        ))}
        <input
          onKeyDown={removeWithBackspace}
          disabled={tags.length >= maxTags}
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="ml-2 bg-transparent text-sm outline-none"
          style={{
            width: "2px",
          }}
        />
      </div>
      {activeSuggestions.length > 0 && (
        <div
          ref={suggestionsRef}
          className="absolute z-50 mt-1 w-full rounded-md border border-gray-300 bg-white shadow-lg"
        >
          {activeSuggestions.map((suggestion, index) => (
            <div
              key={suggestion.id}
              className="cursor-pointer px-4 py-2 text-sm hover:bg-blue-100"
              onClick={() => addTag(suggestion)}
            >
              {suggestion.name}
            </div>
          ))}
        </div>
      )}
      {typeof errors ? (
        <p className="mt-1 text-xs text-red-500">
          {typeof errors.tags?.message === "string" && errors.tags.message}
        </p>
      ) : (
        <p className="mt-1 text-xs text-gray-500">
          {maxTags} tags maximum. Use letters and numbers only.
        </p>
      )}
    </div>
  );
}
