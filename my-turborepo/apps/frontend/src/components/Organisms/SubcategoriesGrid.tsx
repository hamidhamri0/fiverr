"use client";
import React, { useEffect, useState } from "react";
import debounce from "@/lib/utils/debounce";
import { Category } from "@fiverr/shared";
import SubcategoryGridCard from "@/Components/Molecules/SubcategoryGridCard";

export default function SubcategoriesGrid({
  category,
}: {
  category: Category;
}) {
  const [openStates, setOpenStates] = useState<boolean[]>(
    category?.subcategoryGroups?.map(() => true) || [],
  );
  useEffect(() => {
    const handleResize = () => {
      setOpenStates(
        category?.subcategoryGroups?.map(() => window.innerWidth > 640) || [],
      );
    };
    const debouncedHandleResize = debounce(handleResize, 200);

    // Set initial state based on current screen size
    handleResize();

    // Add event listener
    window.addEventListener("resize", debouncedHandleResize);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("resize", debouncedHandleResize);
    };
  }, [category?.subcategoryGroups]);

  const toggleOpen = (index: number) => {
    setOpenStates((prevOpenStates) =>
      prevOpenStates.map((state, i) => (i === index ? !state : state)),
    );
  };

  return (
    <div className="mx-auto mb-12 max-w-[1450px]">
      <h2 className="mb-2 px-2 text-3xl font-semibold text-gray-800">
        Explore {category.name}
      </h2>
      <div className="grid grid-cols-[repeat(4,_minmax(200px,_1fr))] gap-x-4 gap-y-16 lg:grid-cols-[repeat(3,_minmax(200px,_1fr))] sm:grid-cols-[repeat(2,_minmax(200px,_1fr))] sm:gap-y-8 xs:grid-cols-[repeat(1,_1fr)]">
        {category?.subcategoryGroups?.map((subcategoryGroup, index) => {
          return (
            <SubcategoryGridCard
              key={index}
              image={subcategoryGroup.picture}
              title={subcategoryGroup.name}
              open={openStates[index]}
              toggleOpen={() => toggleOpen(index)}
              subCategories={subcategoryGroup.subcategories}
            />
          );
        })}
      </div>
    </div>
  );
}
