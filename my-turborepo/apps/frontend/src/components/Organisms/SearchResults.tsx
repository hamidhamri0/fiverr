"use client";
import Pagination from "@/Components/Molecules/Pagination";
import Gig from "@/Components/Organisms/Gig";
import React from "react";

let PRODUCTS = 250;

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
                totalReviews={100}
                userLevel={1}
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
