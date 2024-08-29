import React from "react";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import Gig from "./Gig";

let PRODUCTS = 250;
let COUNT = 10;

function Pagination({ pages }: { pages: number }) {
  let [start, setStart] = React.useState(1);
  let [end, setEnd] = React.useState(Math.min(pages, COUNT));
  let [currentPage, setCurrentPage] = React.useState(1);

  return (
    <div className="item flex items-center justify-center gap-3">
      <button
        onClick={() => {
          if (currentPage == 1) return;
          let newCurrent = currentPage - 1;
          setCurrentPage(newCurrent);
          if (newCurrent >= start) return;
          setStart((p) => p - 1);
          setEnd((p) => p - 1);
        }}
        disabled={currentPage == 1}
        className="rounded-full bg-gray-100 p-4"
      >
        <BsArrowLeft />
      </button>
      <div className="flex gap-4 md:gap-2 sm:hidden">
        {Array(end - start + 1)
          .fill(0)
          .map((_, index) => {
            const page = start + index;
            return (
              <button
                onClick={() => {
                  if (page > end - 5 && end < pages) {
                    const newStart = Math.min(end - 5, pages - 9);
                    const newEnd = Math.min(end + 4, pages);
                    setStart(newStart);
                    setEnd(newEnd);
                  } else if (page < start + 5 && start > 1) {
                    const newStart = Math.max(start - 4, 1);
                    const newEnd = Math.max(start + 5, 10);
                    setStart(newStart);
                    setEnd(newEnd);
                  }
                  setCurrentPage(page);
                }}
                key={index}
                className={`h-10 w-10 rounded-full p-2 ${currentPage === index + start ? "bg-black text-white" : "bg-gray-100"}`}
              >
                {page}
              </button>
            );
          })}
      </div>
      <button
        disabled={currentPage === pages}
        onClick={() => {
          if (currentPage === pages) return;
          let newCurrent = currentPage + 1;
          setCurrentPage(newCurrent);
          if (newCurrent <= end) return;
          setStart((p) => p + 1);
          setEnd((p) => p + 1);
        }}
        className="rounded-full bg-gray-100 p-4"
      >
        <BsArrowRight />
      </button>
    </div>
  );
}

export default function SearchResults() {
  return (
    <div className="mx-auto max-w-[1450px] px-4 xs:px-8">
      <div className="grid grid-cols-4 gap-x-6 gap-y-8 1150:grid-cols-3 md:grid-cols-2 xs:grid-cols-1">
        {Array(PRODUCTS)
          .fill(0)
          .map((_, index) => {
            return (
              <Gig
                classNameForImage="h-44 xs:h-52"
                key={index}
                profileImage={"/images/yacine.png"}
                gigImages={["/images/olympic.webp", "/images/paywatch.webp"]}
                username={"Abdul Rehman"}
                description={
                  "I will do professional modern minimalist business logo design"
                }
                hasVideo={true}
                pro={Boolean(index % 2)}
                rating={4.8}
                startingPrice={100}
              />
            );
          })}
      </div>
      <div className="mb-4 mt-8 flex justify-center">
        <Pagination pages={PRODUCTS} />
      </div>
    </div>
  );
}
