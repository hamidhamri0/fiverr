"use client";
import { cloneElement } from "react";
import { MdOutlineNotifications } from "react-icons/md";
import { LuHeart } from "react-icons/lu";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import GridSlider from "./GridSlider";
import { twMerge } from "tailwind-merge";

function RecommendedBox({
  children,
  titles,
  className = "",
}: {
  children: React.ReactElement;
  titles: {
    h3: string;
    h4: string;
    h5: string;
    buttonAction: string;
  };
  className?: string;
}) {
  className = twMerge("w-7 h-7", className);
  return (
    <div className="flex min-w-[660px] cursor-pointer flex-col gap-4 rounded-2xl bg-gray-100 p-4 text-[#222325] shadow-md sm:min-w-[400px] sm:max-w-full">
      <h3 className="text-sm font-semibold uppercase text-[#74767e]">
        {titles.h3}
      </h3>
      <div className="flex gap-4 sm:flex-wrap">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-200">
          {cloneElement(children, { className })}
        </span>
        <div className="flex flex-col">
          <h4 className="font-bold">{titles.h4}</h4>
          <h5 className="text-sm">{titles.h5}</h5>
        </div>
        <button className="text-md ml-auto whitespace-nowrap rounded-lg border border-gray-800 px-6 font-semibold transition-all hover:bg-gray-900 hover:text-gray-100 sm:ml-0 sm:basis-full sm:py-2">
          {titles.buttonAction}
        </button>
      </div>
    </div>
  );
}

export function ArrowLeftRight({
  scrollLeftHandler,
  scrollRightHandler,
  className = "",
  background = "bg-gray-200",
  color = "white",
  isLastElementVisible = false,
  isFirstElementVisible,
}: {
  scrollLeftHandler: (e: React.MouseEvent) => void;
  scrollRightHandler: (e: React.MouseEvent) => void;
  className?: string;
  background?: string;
  color?: string;
  isLastElementVisible: boolean;
  isFirstElementVisible: boolean;
}) {
  className = "ml-auto flex gap-2 " + className;
  return (
    <div className={className}>
      <button
        onClick={scrollLeftHandler}
        disabled={isFirstElementVisible}
        className={`z-1000 relative cursor-pointer rounded-full bg-opacity-20 p-4 shadow-md hover:bg-opacity-30 ${background} ${isFirstElementVisible ? "opacity-45" : ""} `}
      >
        <FaChevronLeft
          className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2"
          color={color}
        />
      </button>

      <button
        disabled={isLastElementVisible}
        onClick={scrollRightHandler}
        className={`z-1000 relative cursor-pointer rounded-full bg-opacity-20 p-4 shadow-md hover:bg-opacity-30 ${background} ${isLastElementVisible ? "opacity-45" : ""}`}
      >
        <FaChevronRight
          className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2"
          color={color}
        />
      </button>
    </div>
  );
}

export default function WelcomeContent() {
  return (
    <div className="] relative mb-16">
      <div className="absolute z-0 h-[220px] w-full bg-[url('/images/olympic.webp')] bg-cover bg-center bg-no-repeat brightness-50"></div>
      <div className="relative mx-auto flex max-w-[1450px] justify-between">
        <p className="ml-8 py-6 text-3xl font-semibold text-gray-100 xs:text-2xl">
          Welcome back, Kazi
        </p>
        <p className="px-1 py-6 text-lg font-semibold text-gray-300">
          Made on Fiverr
        </p>
      </div>
      <WelcomeContentGridSlides />
    </div>
  );
}

function WelcomeContentGridSlides() {
  return (
    <GridSlider>
      <GridSlider.Container>
        <GridSlider.SlidersNav
          color="gray"
          className="mb-4 ml-auto justify-end"
        />
        <GridSlider.Grid>
          <div className="flex gap-4">
            <RecommendedBox
              titles={{
                h3: "recommended for you",
                h4: "Get matched with freelancers",
                h5: "Create a brief and get custom offers.",
                buttonAction: "Create a brief",
              }}
            >
              <MdOutlineNotifications />
            </RecommendedBox>
            <RecommendedBox
              titles={{
                h3: "BUSINESS RECOMMENDATIONS",
                h4: "Tailor Fiverr to your needs",
                h5: "Tell us a bit about your business.",
                buttonAction: "Add your info",
              }}
            >
              <LuHeart />
            </RecommendedBox>
            <RecommendedBox
              titles={{
                h3: "BUSINESS RECOMMENDATIONS",
                h4: "Tailor Fiverr to your needs",
                h5: "Tell us a bit about your business.",
                buttonAction: "Add your info",
              }}
            >
              <LuHeart />
            </RecommendedBox>
            <RecommendedBox
              titles={{
                h3: "BUSINESS RECOMMENDATIONS",
                h4: "Tailor Fiverr to your needs",
                h5: "Tell us a bit about your business.",
                buttonAction: "Add your info",
              }}
            >
              <LuHeart />
            </RecommendedBox>
          </div>
        </GridSlider.Grid>
      </GridSlider.Container>
    </GridSlider>
  );
}
