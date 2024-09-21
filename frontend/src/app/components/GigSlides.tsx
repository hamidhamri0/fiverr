"use client";
import React, { useState } from "react";
import { MdVerified } from "react-icons/md";
import { FaStar } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
import { HiOutlineVideoCamera } from "react-icons/hi2";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import useSlide from "../../Hooks/useSlide";
import { ArrowLeftRight } from "./WelcomeContent";
// import Categories from "./Categories";
import { IoCloudyNight } from "react-icons/io5";
import GridSlider from "./GridSlider";
import { twMerge } from "tailwind-merge";
import Gig from "./Gig";

type GigParam = {
  profileImage: string;
  gigImages: string[];
  username: string;
  description: string;
  hasVideo: boolean;
  startingPrice: number;
  rating: number;
  pro: boolean;
};

export function Gigs({
  maxLength,
  className = "",
}: {
  maxLength: number;
  className?: string;
}) {
  let data = Array.from({ length: maxLength || 10 });
  className = twMerge(
    "flex gap-6 before:absolute before:right-0 before:z-10 before:h-full before:w-16 before:bg-[linear-gradient(90deg,hsla(0,0%,100%,0),#ffffff)] before:content-['']",
    className,
  );
  return (
    <div className={className}>
      {data.map((_, index) => {
        return (
          <Gig
            className="min-w-[270px]"
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

          <GridSlider.Container>
            <GridSlider.Grid>
              <Gigs maxLength={10} />
            </GridSlider.Grid>
          </GridSlider.Container>
        </div>
      </div>
    </GridSlider>
  );
}
