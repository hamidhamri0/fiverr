"use client";
import React from "react";
import { IoCloudyNight } from "react-icons/io5";
import GridSlider from "./GridSlider";
import { twMerge } from "tailwind-merge";
import Gig from "./Gig";

// type GigParam = {
//   profileImage: string;
//   gigImages: string[];
//   username: string;
//   description: string;
//   hasVideo: boolean;
//   startingPrice: number;
//   rating: number;
//   pro: boolean;
// };

type GigsProps<T> = {
  items: T[];
  render: (item: T, index: number) => React.ReactNode;
  className?: string;
};

export function Gigs<T>({ items, render, className = "" }: GigsProps<T>) {
  className = twMerge(
    "flex gap-5 px-3 before:absolute before:right-0 before:z-10 before:h-full before:w-16 before:bg-[linear-gradient(90deg,hsla(0,0%,100%,0),#ffffff)] before:content-['']",
    className,
  );

  return (
    <div className={className}>
      {items.map((item, index) => {
        return render(item, index);
      })}
    </div>
  );
}

export default function GigSlides() {
  return (
    <GridSlider>
      <div className="mx-auto mb-12 flex max-w-[1450px] flex-col gap-4 p-6">
        <div className="mb-6 flex md:gap-8 sm:hidden">
          <h2 className="text-2xl font-bold text-gray-900">
            Based on your browsing history
          </h2>
          <GridSlider.SlidersNav color="gray" className="ml-auto" />
        </div>
        <div className="relative flex items-start gap-8 md:gap-8 sm:flex-col">
          <div className="flex w-full flex-col gap-2 px-1">
            {Array(4)
              .fill(0)
              .map((_, index) => {
                return (
                  <div
                    key={index}
                    className="flex items-center gap-4 rounded-md border border-gray-500 bg-gray-100 px-8 py-3"
                  >
                    <IoCloudyNight size={30} />
                    <p className="whitespace-nowrap text-lg font-semibold text-gray-800">
                      Keep Exploring
                    </p>
                  </div>
                );
              })}
          </div>

          {/* <GridSlider.Container>
            <GridSlider.Grid>
              <Gigs
                // data={}
              />
            </GridSlider.Grid>
          </GridSlider.Container> */}
        </div>
      </div>
    </GridSlider>
  );
}
