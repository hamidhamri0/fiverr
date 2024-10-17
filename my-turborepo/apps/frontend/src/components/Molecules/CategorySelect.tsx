import { useGigStore } from "@/stores/GigStore";
import { useEffect } from "react";
import { useController, useFormContext } from "react-hook-form";
import toast from "react-hot-toast";
import { Category } from "@fiverr/shared";
import { get } from "@/lib/utils/customFetch";

export default function CategorySelect() {
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
  const categories = useGigStore((state) => state.categories);
  const setCategories = useGigStore((state) => state.setCategories);
  useEffect(() => {
    async function fetchCategories() {
      try {
        const data = await get<Category[]>("/category/getAllCategories");
        setCategories(data);
      } catch (err) {
        toast.error("Something went wrong");
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
      {categories.map((category: Category) => (
        <option key={category.id} value={category.id}>
          {category.name}
        </option>
      ))}
    </select>
  );
}
