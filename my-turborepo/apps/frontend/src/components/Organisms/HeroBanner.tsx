import Google from "@/Components/Icons/Google";
import Meta from "@/Components/Icons/Meta";
import Netflix from "@/Components/Icons/Netflix";
import Payoneer from "@/Components/Icons/Payoneer";
import Pg from "@/Components/Icons/Pg";
import React from "react";

import { FaSearch } from "react-icons/fa";

export default function HeroBanner() {
  return (
    <>
      <div className="flex max-w-[616px] flex-col gap-8 text-center text-white xl:max-w-[500px] lg:max-w-full">
        <h1 className="text-5xl font-medium leading-[4rem] xl:text-4xl xl:leading-[3.5rem] sm:xl:text-3xl">
          Find the right <i className="text-green-500">freelance</i> service,
          right away
        </h1>
        <div className="relative flex w-full gap-4 p-2">
          <input
            placeholder="What service are you looking for?"
            className="w-full rounded-md p-4 outline-none"
          />
          <button className="absolute right-4 top-1/2 -translate-y-1/2 transform rounded-md bg-green-900 p-3 text-white xs:hidden">
            <FaSearch size={20} />
          </button>
        </div>
      </div>
      <div className="flex items-center justify-between gap-8 text-gray-500 lg:hidden">
        <span className="text-sm">Trusted by</span>
        <div className="flex gap-4 text-gray-200">
          <Meta color="#6f746f99" />
          <Google color="#6f746f99" />
          <Netflix color="#6f746f99" />
          <Pg color="#6f746f99" />
          <Payoneer color="#6f746f99" />
        </div>
      </div>
    </>
  );
}
