"use client";

import React, { useEffect, useRef, useState } from "react";

const SlideShow = ({ images }: { images: string[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);

  const [lastImage, setLastImage] = useState(false);
  const [firstImage, setFirstImage] = useState(true);

  let ref = useRef<HTMLDivElement>(null);

  const handleNext = () => {
    let container = ref.current;
    if (!container || isScrolling) return;
    let scrollBy = Math.min(
      container.clientWidth,
      container.scrollWidth - container.clientWidth - container.scrollLeft,
    );

    container.scrollBy({
      left: scrollBy,
      behavior: "smooth",
    });
    setFirstImage(false);
    const scrollEnd = function () {
      setIsScrolling(false);
      if (
        container.scrollLeft + container.clientWidth ===
        container.scrollWidth
      ) {
        setLastImage(true);
      }
      container?.removeEventListener("scrollend", scrollEnd);
    };
    container.addEventListener("scrollend", scrollEnd);
  };

  const handlePrevious = () => {
    let container = ref.current;
    if (!container || isScrolling) return;
    let scrollBy = Math.min(container.clientWidth, container.scrollLeft);

    container.scrollBy({
      left: -scrollBy,
      behavior: "smooth",
    });
    setLastImage(false);
    const scrollEnd = function () {
      setIsScrolling(false);
      if (container.scrollLeft === 0) {
        setFirstImage(true);
      }
      container?.removeEventListener("scrollend", scrollEnd);
    };
    container.addEventListener("scrollend", scrollEnd);
  };

  const selectImage = (index: number) => {
    setCurrentIndex(index);
    const container = ref.current;
    if (!container) return;
    const firstChild = container.firstChild as HTMLElement;
    const image = firstChild.childNodes[index] as HTMLElement;

    const computedStyles = getComputedStyle(firstChild);
    const gap = Number(computedStyles.gap.replace("px", ""));

    if (
      container.getBoundingClientRect()?.right -
        image?.getBoundingClientRect()?.right <=
      gap
    ) {
      handleNext();
    } else if (
      image?.getBoundingClientRect()?.left -
        container.getBoundingClientRect()?.left <=
      gap
    ) {
      handlePrevious();
    }
  };

  return (
    <div className="mb-12 flex aspect-[16/9] flex-col gap-4">
      <div className="flex max-h-[400px] overflow-hidden rounded-md">
        {images.map((_, index) => {
          return (
            <div
              key={index}
              style={{
                transform: `translateX(-${currentIndex * 100}%)`,
                transition: "transform 0.5s ease",
              }}
              className="max-h-full min-h-full min-w-full bg-gray-200"
            >
              <img
                src={images[index]}
                alt="Selected"
                className="h-full w-full object-contain"
              />
            </div>
          );
        })}
      </div>

      {/* Thumbnail Carousel */}
      <div className="flex w-full">
        <button
          disabled={firstImage}
          onClick={handlePrevious}
          className={`w-full max-w-5 bg-gray-100 text-gray-950 focus:outline-none ${
            firstImage ? "opacity-30" : ""
          }`}
        >
          &#10094;
        </button>
        <div
          ref={ref}
          className="flex w-full items-center space-x-2 overflow-hidden"
        >
          <div className="flex gap-2">
            {images.map((image, index) => (
              <a
                key={index}
                className={`h-16 w-28 ${currentIndex == index ? "opacity-100" : "opacity-30"}`}
              >
                <img
                  src={image}
                  alt={`Thumbnail ${index}`}
                  onClick={() => selectImage(index)}
                  className="h-full w-full cursor-pointer object-cover"
                />
              </a>
            ))}
          </div>
        </div>
        <button
          disabled={lastImage}
          className={`w-full max-w-5 bg-gray-100 text-gray-950 focus:outline-none ${
            lastImage ? "opacity-30" : ""
          }`}
          onClick={handleNext}
        >
          &#10095;
        </button>
      </div>
    </div>
  );
};

export default SlideShow;
