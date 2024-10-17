import CategorySelect from "@/Components/Molecules/CategorySelect";
import { SubcategorySelect } from "@/Components/Molecules/SubcategorySelect";

export default function SubAndCategory() {
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
          <CategorySelect />
          <SubcategorySelect />
        </div>
      </div>
    </div>
  );
}
