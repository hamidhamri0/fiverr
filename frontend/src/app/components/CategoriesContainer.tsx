"use client";
import React, { ReactNode, useEffect, useState, useRef } from "react";
import { FaChevronLeft, FaChevronRight, FaVideo } from "react-icons/fa";
import { HiOutlineComputerDesktop } from "react-icons/hi2";
import { IoIosMusicalNotes, IoMdBusiness } from "react-icons/io";
import { LiaDigitalTachographSolid } from "react-icons/lia";
import { MdGTranslate } from "react-icons/md";
import useSlide from "../../Hooks/useSlide";
import { Button } from "@/components/ui/button";
import { OpenArrow } from "./Footer";

function CategoryBox({ icon, title }: { icon: ReactNode; title: string }) {
  return (
    <div className="flex min-h-[144px] basis-32 cursor-pointer flex-col items-start gap-4 rounded-xl border border-gray-200 bg-white px-2 py-6 font-semibold text-gray-900 shadow-md hover:bg-green-400 hover:bg-opacity-20">
      <div>{icon}</div>
      <p>{title}</p>
    </div>
  );
}
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
export default function CategoriesContainer() {
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
    <div className="relative mx-auto mb-12 max-w-[1450px] px-4">
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
              <OpenArrow className="block" isOpen={showAll} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
