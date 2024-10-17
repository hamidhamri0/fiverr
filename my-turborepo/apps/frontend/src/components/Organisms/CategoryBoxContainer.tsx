"use client";
import React, { useEffect, useState, useRef } from "react";
import { HiOutlineComputerDesktop } from "react-icons/hi2";
import OpenArrowButton from "@/Components/Atoms/OpenArrowButton";
import CategoryBox from "@/Components/Molecules/CategoryBox";

const categories = [
  "Programming & Tech",
  "Digital Marketing",
  "Video & Animation",
  "Writing & Translation",
  "Music & Audio",
  "Business",
  "Consulting",
  "Dev",
  "JavaScript",
  "Business",
];
export default function CategoryBoxContainer() {
  const [showAll, setShowAll] = useState(false);
  const [visibleItems, setVisibleItems] = useState(categories.length);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const calculateRows = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.clientWidth;
        const itemWidth = containerRef.current.children[0].clientWidth + 12;
        const itemsPerRow = Math.floor(containerWidth / itemWidth);
        setVisibleItems(itemsPerRow);
        setShowAll(itemsPerRow >= categories.length);
        console.log(
          itemsPerRow >= categories.length,
          itemsPerRow,
          categories.length,
          containerWidth,
          itemWidth,
        );
      }
    };

    calculateRows();
    window.addEventListener("resize", calculateRows);
    return () => window.removeEventListener("resize", calculateRows);
  }, []);

  return (
    <div className="relative mb-12 px-4">
      <div className="overflow-hidden">
        <div ref={containerRef} className={`mb-4 flex flex-wrap gap-3 p-2`}>
          {categories
            .slice(0, showAll ? categories.length : visibleItems)
            .map((category, index) => (
              <CategoryBox
                key={index}
                icon={<HiOutlineComputerDesktop size={30} />}
                title={category}
              />
            ))}
        </div>
        {/* {!isFirstElementVisible && (
          <button
            onClick={scrollLeftHandler}
            className={`absolute left-0 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 cursor-pointer rounded-full bg-white p-6 shadow-md xs:hidden`}
          >
            <FaChevronLeft
              size={20}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            />
          </button>
        )}
        {!isLastElementVisible && (
          <button
            onClick={scrollRightHandler}
            className={`absolute right-0 top-1/2 z-50 -translate-y-1/2 translate-x-1/2 cursor-pointer rounded-full bg-white p-6 shadow-md xs:hidden`}
          >
            <FaChevronRight
              size={20}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            />
          </button>
        )} */}
      </div>
      {visibleItems < categories.length && (
        <div>
          <div className="mb-2 flex h-[1px] w-full justify-center bg-gray-200"></div>
          <div
            onClick={() => setShowAll(!showAll)}
            className="mb-2 flex w-full cursor-pointer items-center justify-center rounded-md p-2 hover:bg-gray-100"
          >
            <div className="flex items-center gap-4">
              <span>{showAll ? "Show less" : "Show more"}</span>
              <OpenArrowButton className="block" isOpen={showAll} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
