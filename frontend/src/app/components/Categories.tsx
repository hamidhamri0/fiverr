"use client";
import { useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import useSlide from "../Hooks/useSlide";

const categories = [
  "Graphics & Design",
  "Programming & Tech",
  "Digital Marketing",
  "Video & Animation",
  "Writing & Translation",
  "Music & Audio",
  "Business",
  "Consulting",
  "Dev",
  "JavaScript",
  "React",
  "Cpp and Assembly",
  "Cpp and Assembly as",
  "Cpp and Assembly asz",
];

export default function Categories() {
  const {
    scrollRef,
    scrollLeftHandler,
    scrollRightHandler,
    onMouseDown,
    onMouseMove,
    onMouseUp,
    onMouseLeave,
  } = useSlide();

  return (
    <div className="border border-b bg-white px-4">
      <div className="relative mx-auto max-w-[1450px] px-6">
        <nav
          ref={scrollRef}
          className="cursor-pointer overflow-hidden"
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseLeave}
        >
          <ul className="flex items-center gap-4">
            {categories.map((category: string) => {
              return (
                <li
                  className="whitespace-nowrap border-b-4 border-transparent py-2 transition-all hover:border-green-500"
                  key={category}
                >
                  {category}
                </li>
              );
            })}
          </ul>
          <span
            onClick={scrollLeftHandler}
            className="absolute left-0 top-1/2 -translate-y-1/2 cursor-pointer"
          >
            <FaChevronLeft />
          </span>
          <span
            onClick={scrollRightHandler}
            className="absolute right-0 top-1/2 z-10 -translate-y-1/2 cursor-pointer"
          >
            <FaChevronRight />
          </span>
        </nav>
      </div>
    </div>
  );
}
