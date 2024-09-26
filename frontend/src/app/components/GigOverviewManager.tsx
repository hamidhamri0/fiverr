"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  useFormContext,
  useWatch,
  useController,
  Control,
  FieldErrors,
} from "react-hook-form";
import { useOutsideClick } from "../../Hooks/useOutsideClick";
import debounce from "@/lib/utils/debounce";
import { get, post } from "@/lib/utils/customFetch";
import {
  Categories,
  Services,
  Subcategories,
  Tag,
  Service,
  Metadata as MetadataType,
  Category as CategoryType,
  GigData,
} from "../../types/gig.interface";
import { useGigStore } from "../../stores/GigStore";
import { useUserInfoStore } from "../../stores/UserInfoStore";
import SpinnerCenterWithBlur from "./ui/SpinnerCenterWithBlur";
import { useRouter, usePathname } from "next/navigation";

export default function GigOverviewForm({
  onClick,
}: {
  onClick: (cb: (wizard: number) => number, b: boolean) => void;
}) {
  const user = useUserInfoStore((state) => state.user);

  const [loading, setLoading] = useState(false);
  const methods = useFormContext();
  const pathname = usePathname();
  const router = useRouter();

  const {
    formState: { errors },
    watch,
    getValues,
    handleSubmit,
    setError,
    setValue,
  } = methods;

  async function createGig() {
    const values = getValues();
    let metadata: { [key: number]: number[] | number } = {};
    for (const meta in values.metadataTag) {
      if (typeof values.metadataTag[meta] == "string") {
        metadata[Number(meta)] = Number(values.metadataTag[meta]);
      } else {
        metadata[Number(meta)] = values.metadataTag[meta].map((e: string) =>
          Number(e),
        );
      }
    }
    let body = {
      title: values.title,
      metadata: metadata,
      categoryId: +values.category,
      subcategoryId: +values.subcategory,
      serviceId: +values.serviceType,
      tagIds: values.tags.map((e: Tag) => Number(e.id)),
      userId: user && user.id,
    };
    const url = values?.id
      ? `/gig/saveGig?gigId=${values?.id}`
      : "/gig/saveGig";
    return post(url, body);
  }

  const onSubmit = async () => {
    const values = getValues();

    try {
      if (
        values.initialSubcategory !== values.subcategory &&
        values.initialSubcategory
      ) {
        onClick((p) => p + 1, false);
        return;
      }
      setLoading(true);
      const gig = (await createGig()) as GigData;
      setValue("id", gig.id);
      if (pathname.startsWith("/manage_gigs/new")) {
        router.push(`/manage_gigs/${gig.id}/edit?wizard=1`);
      } else {
        onClick((p) => p + 1, true);
      }
    } catch (err) {
      setError("root", {
        type: "manual",
        message: err instanceof Error ? err?.message : "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
  };
  console.log(watch());

  function fillwithData() {
    methods.setValue("title", "I will do something I'm really good at");
    methods.setValue("category", "1");
    methods.setValue("subcategory", "1");
    methods.setValue("serviceType", "1");
    methods.setValue("metadataTag", { 1: "1", 2: ["5", "7"] });
    methods.setValue("tags", [{ id: 1, name: "Web Development" }]);
  }

  return (
    <div className="mx-auto max-w-[800px] rounded-lg border border-gray-300 bg-white p-6 shadow-md">
      <div>
        <TitleInput />
        <CategorySelect />
        <ServiceTypeSelect />
        <Metadata />
        <TagsInput control={methods.control} />
        <button
          type="button"
          onClick={handleSubmit(onSubmit)}
          className={`w-full rounded-md bg-green-500 px-4 py-2 text-white transition duration-300 hover:bg-green-600`}
        >
          Save & Continue
        </button>
        <button
          type="button"
          onClick={fillwithData}
          className={`mt-2 w-full rounded-md bg-green-500 px-4 py-2 text-white transition duration-300 hover:bg-green-600`}
        >
          fill with data
        </button>
      </div>
      <p className="mt-1 text-xs text-red-500">
        {errors.root && (errors.root.message as string)}
      </p>
      {loading && <SpinnerCenterWithBlur />}
    </div>
  );
}

const TitleInput = () => {
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
    setValue,
    formState: { errors },
    setError,
    control,
  } = useFormContext();

  const {
    field: { value: category, onChange: setCategory, ref: categoryRef },
  } = useController({
    control,
    name: "category",
    rules: {
      required: "Category is required",
    },
    defaultValue: "",
  });

  // const [categories, setCategories] = useState<Categories>([]);

  const categories = useGigStore((state) => state.categories);
  const setCategories = useGigStore((state) => state.setCategories);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const data = await get<Categories>("/category/getAllCategories");
        setCategories(data);
      } catch (err) {
        setError("root", {
          type: "manual",
          message: err instanceof Error ? err?.message : "Something went wrong",
        });
      }
    }
    fetchCategories();
  }, [setError, setCategories]);
  return (
    <select
      ref={categoryRef}
      id="category"
      value={category}
      onChange={(e) => {
        setCategory(e.target.value);
        setValue("subcategory", "");
      }}
      className={`flex-1 rounded-md border p-2 text-sm ${errors.category ? "border-red-500" : "border-gray-300"}`}
    >
      <option value="">Select a category</option>
      {categories.map((category: CategoryType) => (
        <option key={category.id} value={category.id}>
          {category.name}
        </option>
      ))}
    </select>
  );
}

function Subcategory() {
  // const [subCategories, setSubCategories] = useState<Subcategories>([]);
  const subcategories = useGigStore((state) => state.subcategories);
  const setSubcategories = useGigStore((state) => state.setSubcategories);
  const setFeatures = useGigStore((state) => state.setFeatures);

  const {
    setValue,
    setError,
    formState: { errors },
    control,
    getValues,
    reset,
  } = useFormContext();

  const {
    field: {
      value: subcategory,
      onChange: setSubcategory,
      ref: subcategoryRef,
    },
  } = useController({
    control,
    name: "subcategory",
    rules: {
      required: "subcategory is required",
    },
    defaultValue: "",
  });

  const category = useWatch({
    name: "category",
  });

  useEffect(() => {
    if (!category) return;
    async function fetchSubCategories() {
      try {
        const data = await get<Subcategories>(
          `/subcategory/getSubcategoriesByCategoryId?categoryId=${category}`,
        );
        setSubcategories(data);
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
  }, [category, setValue, setError, setSubcategories]);

  return (
    <select
      ref={subcategoryRef}
      value={subcategory}
      onChange={(e) => {
        const values = getValues();
        setFeatures([]);
        reset({
          ...values,
          basic: {},
          standard: {},
          premium: {},
          serviceType: "",
          subcategory: e.target.value,
        });
      }}
      className={`flex-1 rounded-md border p-2 text-sm ${errors.category ? "border-red-500" : "border-gray-300"}`}
    >
      <option value="">Select a sub-category</option>
      {subcategories.map((subcategory: CategoryType) => (
        <option key={subcategory.id} value={subcategory.id}>
          {subcategory.name}
        </option>
      ))}
    </select>
  );
}

const ServiceTypeSelect = () => {
  const {
    formState: { errors },
    setValue,
    setError,
    control,
    getValues,
    unregister,
  } = useFormContext();

  // const [services, setServices] = useState<Services>([]);
  const services = useGigStore((state) => state.services);
  const setServices = useGigStore((state) => state.setServices);
  const setMetadata = useGigStore((state) => state.setMetadata);

  const subcategory = useWatch({
    name: "subcategory",
  });
  const {
    field: { value: service, onChange: setService, ref: serviceRef },
  } = useController({
    control,
    name: "serviceType",
    rules: {
      required: "service is required",
    },
    defaultValue: "",
  });

  useEffect(() => {
    if (!subcategory) return;
    async function fetchServices() {
      try {
        const data = await get<Services>(
          `/service/getServicesBySubcategoryId?subcategoryId=${subcategory}`,
        );
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
  }, [subcategory, setValue, setError]);

  if (!subcategory) return null;

  return (
    <div className="mb-6 grid grid-cols-[1fr_2fr]">
      <label
        htmlFor="serviceType"
        className="mb-1 block font-semibold text-gray-700"
      >
        Service type
      </label>

      <select
        ref={serviceRef}
        value={service}
        onChange={(e) => {
          setService(e.target.value);
          let values = getValues()?.["metadataTag"] || {};
          if (Object.keys(values).length) {
            for (let key of Object.keys(values)) {
              unregister(`metadataTag.${key}`);
            }
          }
          setMetadata([]);
        }}
        className={`w-full rounded-md border p-2 text-sm ${errors.serviceType ? "border-red-500" : "border-gray-300"}`}
      >
        <option className="text-sm" value="">
          SELECT A SERVICE TYPE
        </option>
        {services.map((service: Service) => (
          <option key={service.id} value={service.id}>
            {service.name}
          </option>
        ))}
      </select>
    </div>
  );
};

const Metadata = () => {
  const {
    control,
    setError,
    formState: { errors },
  } = useFormContext();

  // const { metadata, setMetadata } = useGigcontext();

  const metadata = useGigStore((state) => state.metadata);
  const setMetadata = useGigStore((state) => state.setMetadata);

  const [selectedMetadata, setSelectedMetadata] = useState(0);

  const {} = useController({
    control,
    name: "metadataTag",
    defaultValue: {},
  });

  const service = useWatch({
    name: "serviceType",
    control,
  });

  useEffect(() => {
    if (!service) return;
    async function fetchServiceMetadata() {
      try {
        const data = await get<MetadataType[]>(
          `/metadata/getMetadataByServiceIdAndTheirTags?serviceId=${service}`,
        );
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
  }, [service, setError, setMetadata]);

  if (!service || !metadata.length) return null;
  return (
    <div className="mb-6 grid grid-cols-[1fr_2fr]">
      <h3 className="mb-2 font-semibold text-gray-700">Gig metadata</h3>
      <div className="grid grid-cols-[1fr_2fr] border border-gray-300">
        <div className="border-r border-gray-200 bg-slate-50">
          {metadata.map((meta: MetadataType, index: number) => {
            const metadataId = meta.id;
            const selectedMeta = metadata[selectedMetadata];
            const hasError = (
              errors as FieldErrors<{ metadataTag: Record<string, any> }>
            ).metadataTag?.[metadataId];
            return (
              <div
                key={meta.name}
                className={`cursor-pointer whitespace-nowrap p-4 text-sm font-semibold ${hasError ? "text-red-500" : ""} ${selectedMeta.id == meta.id && index !== 0 ? "border-y border-gray-300 bg-white" : selectedMeta.id == meta.id ? "border-t-0 bg-white" : ""}`}
                onClick={(e) => setSelectedMetadata(index)}
              >
                {meta.name}
              </div>
            );
          })}
        </div>

        {metadata.map((metadata, index) => {
          return (
            <div
              key={index}
              className={`p-2 ${index == selectedMetadata ? "block" : "hidden"}`}
            >
              <p className="mb-4 text-sm font-semibold text-gray-500">
                Select the features you support
              </p>
              <MetadataFactory metadata={metadata} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

type MetadataProps = {
  metadata: MetadataType;
};

function MultiSelect({ metadata }: MetadataProps) {
  const { control } = useFormContext();

  const {
    field: { value: metadataTags, onChange: setMetadataTags },
  } = useController({
    control,
    name: `metadataTag.${metadata.id}`,
    defaultValue: [],
    rules: {
      validate: (value) => {
        if (!value.length) return "You need to select at least one tag";
        if (value.length > 5) return "You can only select 5 tags";
        return true;
      },
    },
  });

  function isDisabled(id: string) {
    if (!metadataTags || metadataTags.length < 3) return false;
    return !metadataTags.includes(id);
  }

  return (
    <div className={`bg-white p-4`}>
      <div className="grid grid-cols-2">
        {metadata.metadataTags.map((tag: Tag) => (
          <div key={tag.id} className="mb-2 flex items-center">
            <input
              onChange={(e) =>
                e.target.checked
                  ? setMetadataTags([...metadataTags, e.target.value])
                  : setMetadataTags(
                      metadataTags.filter(
                        (id: string) => id !== e.target.value,
                      ),
                    )
              }
              type="checkbox"
              id={String(tag.id)}
              value={tag.id}
              checked={metadataTags.includes(String(tag.id))}
              className={`mr-2 h-4 w-4 rounded-3xl border-gray-300 accent-black focus:ring-black ${isDisabled(String(tag.id)) ? "cursor-not-allowed text-gray-500" : "cursor-pointer text-black"}`}
              disabled={isDisabled(String(tag.id))}
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
  const { control } = useFormContext();
  const {
    field: { value: metadataTag, onChange: setMetadataTag },
    fieldState: { error },
  } = useController({
    name: `metadataTag.${metadata.id}`,
    control,
    rules: {
      required: "Select a tag",
    },
    defaultValue: "",
  });

  return (
    <div className={`p-2`}>
      <select
        value={metadataTag}
        onChange={(e) => {
          setMetadataTag(e.target.value);
        }}
        className={`w-full rounded-md border p-2 focus:outline-none ${error ? "border-red-500" : "border-gray-300"}`}
      >
        <option value="">Select a {metadata.name}</option>
        {metadata.metadataTags.map((tag) => (
          <option key={tag.id} value={tag.id}>
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
      return <MultiSelect key={Math.random() * 100000} metadata={metadata} />;
    case "select":
      return <Select key={Math.random() * 100000} metadata={metadata} />;
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
      adjustInputWidth();
    }
  }, [tags, inputValue]);

  const suggestionsRef = useOutsideClick(() => {
    setActiveSuggestions([]);
  });

  const handleInputChange = useCallback(
    debounce(async (value: string) => {
      if (value.length > 0) {
        let data = await get<TagsType[]>(`/tags/getOneByName?name=${value}`);
        console.log(data);
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
