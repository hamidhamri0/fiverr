"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  useFormContext,
  useWatch,
  useController,
  Control,
  FieldErrors,
} from "react-hook-form";
import { useOutsideClick } from "../Hooks/useOutsideClick";
import debounce from "./utils/debounce";

export default function GigOverviewForm() {
  const methods = useFormContext();
  const {
    formState: { errors },
  } = methods;

  const onSubmit = (data: any) => {
    console.log(data, "SUBMITTED");
  };

  console.log(methods.formState.errors, "ERRORS FROM PARENT");
  // console.log(useWatch(), "DATA FROM PARENT");

  return (
    <div className="mx-auto max-w-[800px] rounded-lg border border-gray-300 bg-white p-6 shadow-md">
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <TitleInput />
        <CategorySelect />
        <ServiceTypeSelect />
        <Metadata />
        <TagsInput control={methods.control} />
        <button
          type="submit"
          className={`w-full rounded-md bg-green-500 px-4 py-2 text-white transition duration-300 hover:bg-green-600`}
        >
          Save & Continue
        </button>
      </form>
      <p className="mt-1 text-xs text-red-500">
        {errors.root && (errors.root.message as string)}
      </p>
    </div>
  );
}

const TitleInput = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

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
          {...register("title", {
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
          })}
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
};

function LettersCount() {
  const watchTitle = useWatch({
    name: "title",
  });
  return (
    <p className="mt-1 text-xs text-gray-500">
      {watchTitle?.length || 0}/80 max
    </p>
  );
}

type categoryType = {
  id: string;
  name: string;
};

const CategorySelect = () => {
  return (
    <div className="mb-6 grid grid-cols-[1fr_2fr] gap-6">
      <label
        htmlFor="category"
        className="mb-1 block font-semibold text-gray-700"
      >
        Category
        <p className="mb-2 text-sm text-gray-500">
          Choose the category and sub-category most suitable for your Gig.
        </p>
      </label>
      <div className="flex self-start">
        <div className="flex w-full gap-4">
          <Category />
          <Subcategory />
        </div>
      </div>
    </div>
  );
};

function Category() {
  const {
    register,
    formState: { errors },
    setError,
  } = useFormContext();

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const data = await (
          await fetch("http://localhost:3001/category/getAllCategories", {
            credentials: "include",
          })
        ).json();
        if (data.error) throw new Error(data.message);
        setCategories(data);
      } catch (err) {
        setError("root", {
          type: "manual",
          message: err instanceof Error ? err?.message : "Something went wrong",
        });
      }
    }
    fetchCategories();
  }, [setError]);
  return (
    <select
      {...register("category", { required: "Category is required" })}
      id="category"
      className={`flex-1 rounded-md border p-2 text-sm ${errors.category ? "border-red-500" : "border-gray-300"}`}
    >
      <option value="">Select a category</option>
      {categories.map((category: categoryType) => (
        <option key={category.id} value={category.id}>
          {category.name}
        </option>
      ))}
    </select>
  );
}

function Subcategory() {
  const [subCategories, setSubCategories] = useState([]);

  const {
    register,
    setValue,
    setError,
    formState: { errors },
  } = useFormContext();

  const category = useWatch({
    name: "category",
  });

  useEffect(() => {
    setValue("subCategory", "");
    if (!category) return;
    async function fetchSubCategories() {
      try {
        const data = await (
          await fetch(
            `http://localhost:3001/subcategory/getSubcategoriesByCategoryId?categoryId=${category}`,
            {
              credentials: "include",
            },
          )
        ).json();
        if (data.error) throw new Error(data.message);
        setSubCategories(data);
      } catch (err) {
        setError("root", {
          type: "manual",
          message:
            (err instanceof Error && err?.message) || "Something went wrong",
        });
        console.log(err);
      }
    }
    fetchSubCategories();
  }, [category, setValue, setError]);

  return (
    <select
      {...register("subCategory", {
        required: "Sub-category is required",
      })}
      id="subCategory"
      className={`flex-1 rounded-md border p-2 text-sm ${errors.category ? "border-red-500" : "border-gray-300"}`}
    >
      <option value="">Select a sub-category</option>
      {subCategories.map((subCategory: categoryType) => (
        <option key={subCategory.id} value={subCategory.id}>
          {subCategory.name}
        </option>
      ))}
    </select>
  );
}

const ServiceTypeSelect = () => {
  const {
    register,
    formState: { errors },
    setValue,
    setError,
  } = useFormContext();

  const [services, setServices] = useState([]);
  const subCategory = useWatch({
    name: "subCategory",
  });

  useEffect(() => {
    setValue("serviceType", "");
    if (!subCategory) return;
    async function fetchServices() {
      try {
        const data = await (
          await fetch(
            `http://localhost:3001/service/getServicesBySubcategoryId?subcategoryId=${subCategory}`,
            {
              credentials: "include",
            },
          )
        ).json();
        if (data.error) throw new Error(data.message);
        setServices(data);
      } catch (err) {
        setError("root", {
          type: "manual",
          message:
            (err instanceof Error && err?.message) || "Something went wrong",
        });
        console.log(err);
      }
    }
    fetchServices();
  }, [subCategory, setValue, setError]);

  if (!subCategory) return null;

  return (
    <div className="mb-6 grid grid-cols-[1fr_2fr]">
      <label
        htmlFor="serviceType"
        className="mb-1 block font-semibold text-gray-700"
      >
        Service type
      </label>

      <select
        {...register("serviceType", {
          required: "Service type is required",
        })}
        id="serviceType"
        className={`w-full rounded-md border p-2 text-sm ${errors.serviceType ? "border-red-500" : "border-gray-300"}`}
      >
        <option className="text-sm" value="">
          SELECT A SERVICE TYPE
        </option>
        {services.map((service: any) => (
          <option key={service.id} value={service.id}>
            {service.name}
          </option>
        ))}
      </select>
    </div>
  );
};

type MetadataTagsDefaultValues = {
  [key: string]: string | string[];
};

const Metadata = () => {
  const {
    setValue,
    control,
    register,
    unregister,
    setError,
    formState: { errors },
  } = useFormContext();

  const registeredFieldsRef = useRef<Record<string, boolean>>({});

  const [metadata, setMetadata] = useState<MetadataType[]>([]);
  const [selectedMetadata, setSelectedMetadata] = useState(0);

  const service = useWatch({
    name: "serviceType",
    control,
  });

  useEffect(() => {
    setValue("metadataTag", {});
    if (!service) return;
    async function fetchServiceMetadata() {
      try {
        const data = await (
          await fetch(
            `http://localhost:3001/metadata/getMetadataByServiceIdAndTheirTags?serviceId=${service}`,
            {
              credentials: "include",
            },
          )
        ).json();
        if (data.error) throw new Error(data.message);
        let values: MetadataTagsDefaultValues = {};
        data.forEach((meta: MetadataType) => {
          if (!registeredFieldsRef.current[meta.name]) {
            register(`metadataTag.${meta.name}`, {
              required:
                meta.type === "multi_select"
                  ? "Select at least one tag"
                  : "Select a tag",
            });
            registeredFieldsRef.current[meta.name] = true;
          }
          values[meta.name] = meta.type === "multi_select" ? [] : "";
        });
        setMetadata(data);
      } catch (err) {
        setError("root", {
          type: "manual",
          message:
            (err instanceof Error && err?.message) || "Something went wrong",
        });
        console.log(err);
      }
    }
    fetchServiceMetadata();
  }, [service, setValue, register, unregister, setError]);

  if (!service || !metadata.length) return null;
  return (
    <div className="mb-6 grid grid-cols-[1fr_2fr]">
      <h3 className="mb-2 font-semibold text-gray-700">Gig metadata</h3>
      <div className="grid grid-cols-[1fr_2fr] border border-gray-300">
        <div className="border-r border-gray-200 bg-slate-50">
          {metadata.map((meta: MetadataType, index: number) => {
            const metadataName = meta.name;
            const selectedMeta = metadata[selectedMetadata];
            const hasError = (
              errors as FieldErrors<{ metadataTag: Record<string, any> }>
            ).metadataTag?.[metadataName];
            return (
              <div
                key={meta.name}
                className={`cursor-pointer whitespace-nowrap p-4 text-sm font-semibold ${hasError ? "text-red-500" : ""} ${selectedMeta.id == meta.id && index !== 0 ? "border-y border-gray-300 bg-white" : selectedMeta.id == meta.id ? "border-t-0 bg-white" : ""}`}
                onClick={(e) => {
                  setSelectedMetadata(index);
                }}
              >
                {meta.name}
              </div>
            );
          })}
        </div>

        <div className="p-2">
          <p className="mb-4 text-sm font-semibold text-gray-500">
            Select the features you support
          </p>
          <MetadataFactory metadata={metadata[selectedMetadata]} />
        </div>
      </div>
    </div>
  );
};

type MetadataTag = {
  id: number;
  name: string;
};

type MetadataType = {
  id: number;
  name: string;
  type: string;
  metadataTags: MetadataTag[];
};

type MetadataProps = {
  metadata: MetadataType;
};

function MultiSelect({ metadata }: MetadataProps) {
  const { register, control } = useFormContext();

  // Watch the specific field
  const metadataTags = useWatch({
    control,
    name: `metadataTag.${metadata.name}`,
  });

  function isDisabled(id: string) {
    if (!metadataTags || metadataTags.length < 3) return false;
    return !metadataTags.includes(id);
  }

  return (
    <div className={`bg-white p-4`}>
      <div className="grid grid-cols-2">
        {metadata.metadataTags.map((tag) => (
          <div key={tag.id} className="mb-2 flex items-center">
            <input
              type="checkbox"
              id={String(tag.id)}
              value={tag.id}
              className={`mr-2 h-4 w-4 rounded-3xl border-gray-300 accent-black focus:ring-black ${isDisabled(String(tag.id)) ? "cursor-not-allowed text-gray-500" : "cursor-pointer text-black"}`}
              disabled={isDisabled(String(tag.id))}
              {...register(`metadataTag.${metadata.name}`, {
                validate: (value) => {
                  if (!value) return "You need to select at least one tag";
                  if (value.length > 5) return "You can only select 5 tags";
                  return true;
                },
              })}
            />
            <label htmlFor={tag.name} className="text-sm text-gray-700">
              {tag.name}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}

function Select({ metadata }: MetadataProps) {
  const { register } = useFormContext();

  return (
    <div className={`p-2`}>
      <select
        {...register(`metadataTag.${metadata.name}`, {
          required: "Select a tag",
        })}
        className="w-full rounded-md border border-gray-300 p-2 focus:outline-none"
      >
        <option value="">Select a {metadata.name}</option>
        {metadata.metadataTags.map((tag) => (
          <option key={tag.id} value={tag.name}>
            {tag.name}
          </option>
        ))}
      </select>
    </div>
  );
}

function MetadataFactory({ metadata }: MetadataProps) {
  switch (metadata.type) {
    case "multi_select":
      return <MultiSelect key={Math.random() * 1000} metadata={metadata} />;
    case "select":
      return <Select key={Math.random() * 1000} metadata={metadata} />;
    default:
      return null;
  }
}

type TagsType = {
  id: number;
  name: string;
};

type TagInputProps = {
  control: Control<any>;
  maxTags?: number;
};

const TagsInput: React.FC<TagInputProps> = ({ control, maxTags = 5 }) => {
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
      inputRef.current.focus();
      adjustInputWidth();
    }
  }, [tags, inputValue]);

  const suggestionsRef = useOutsideClick(() => {
    setActiveSuggestions([]);
  });

  const handleInputChange = useCallback(
    debounce(async (value: string) => {
      if (value.length > 0) {
        let data = await (
          await fetch(`http://localhost:3001/tags/getOneByName?name=${value}`, {
            credentials: "include",
          })
        ).json();
        if (data.error) throw new Error(data.message);
        setActiveSuggestions(data);
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
        className={`flex flex-wrap items-center gap-2 rounded-lg border bg-white p-2 shadow-sm transition-all duration-300 ${
          errors.tags ? "border-red-500" : "border-gray-300"
        }`}
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
          style={{ width: "2px" }}
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
};
