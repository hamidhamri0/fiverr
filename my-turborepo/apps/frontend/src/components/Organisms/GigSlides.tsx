"use client";
import React, { useEffect } from "react";
import { IoCloudyNight } from "react-icons/io5";
import {
  GigWithAvgRatingAndTotalReviews as GigType,
  userFeedGigs,
} from "@fiverr/shared";
import { get } from "@/lib/utils/customFetch";
import Gigs from "@/Components/Organisms/Gigs";

export default function GigSlides({
  userGigs: initialGigs,
}: {
  userGigs: userFeedGigs;
}) {
  const [userGigs, setUserGigs] = React.useState(initialGigs);
  const [selected, setSelected] = React.useState("explore");

  async function handleOnChangeSubcategory(selected: string) {
    setSelected(selected);
    const gigs = await get<GigType[]>(
      `/gig/findRandomGigsBySubcategoryName?include=reviews,user,category,subcategory&subcategory=${selected}`,
    );
    setUserGigs((prev) => ({ ...prev, [selected]: gigs }));
  }

  return (
    <div>
      <h2 className="mb-[-2rem] text-2xl font-bold text-gray-700">
        Based on your browsing history
      </h2>
      <div className="mb-28 flex md:flex-col md:gap-4">
        <div className="mt-12 flex flex-col gap-2 px-1">
          {Object.keys(userGigs).map((key) => {
            return (
              <button key={key}>
                <div
                  onClick={() => handleOnChangeSubcategory(key)}
                  className={`flex w-[280px] cursor-pointer items-center gap-4 rounded-md px-8 py-3 ${selected === key ? "border border-gray-500 bg-gray-100" : "hover:bg-gray-100"}`}
                >
                  <IoCloudyNight size={30} />
                  <p className="whitespace-nowrap text-lg font-semibold text-gray-800">
                    {key}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
        {Object.keys(userGigs).map((key) => {
          return (
            <Gigs
              carouselSliders={true}
              carouselClassName={`flex-grow overflow-hidden ${selected == key ? "block" : "hidden"}`}
              carouselSlidersClassName="mb-2 ml-auto"
              carouselItemClassName="w-[280px]"
              key={key}
              gigs={userGigs[selected]}
            />
          );
        })}
      </div>
    </div>
  );
}
