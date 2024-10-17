import { Subcategory } from "@fiverr/shared";
import { usePathname } from "next/navigation";
import Link from "next/link";
import OpenArrowButton from "@/Components/Atoms/OpenArrowButton";

export default function SubcategoryGridCard({
  image,
  title,
  open,
  toggleOpen,
  subCategories,
}: {
  image: string;
  title: string;
  open: boolean;
  toggleOpen: () => void;
  subCategories: Subcategory[];
}) {
  const pathname = usePathname();

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-4 border-gray-200 p-1 sm:rounded-md xs:flex-row xs:items-center xs:border-b">
        <div className="rounded-md xs:h-14 xs:w-20">
          <img
            src={image}
            alt={title}
            className="h-full w-full rounded-md bg-cover"
          />
        </div>
        <span className="text-xl font-semibold text-gray-800">{title}</span>
        <div
          onClick={toggleOpen}
          className="ml-auto hidden cursor-pointer pr-4 xs:block"
        >
          <OpenArrowButton isOpen={open} />
        </div>
      </div>
      <div className={`flex-col gap-4 sm:px-4 ${open ? "flex" : "hidden"}`}>
        {subCategories?.map((subCategory) => {
          return (
            <Link
              key={subCategory.name}
              href={`${pathname}/${subCategory?.slug}`}
            >
              <span className="cursor-pointer text-lg text-gray-500 hover:bg-green-50">
                {subCategory.name}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
