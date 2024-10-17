import React from "react";
import LevelRatingCard from "./Molecules/LevelRatingCard";
import RatingStarsCard from "./Molecules/RatingStarsCard";

export default function GigOverview() {
  return (
    <div className="flex flex-col gap-4 p-2">
      <h2 className="text-2xl font-semibold text-gray-900">
        I will design highly modern minimal impactful business logo and brand
        identity
      </h2>
      <div className="flex gap-4">
        <div className="h-16 w-16 rounded-full">
          <img
            className="h-full w-full rounded-full"
            src="https://fiverr-res.cloudinary.com/image/upload/t_profile_original,q_auto,f_auto/v1/attachments/profile/photo/507347b5968f7e1bc3ea45cae4d53673-1714236122926/bae44460-0987-44b8-8b8a-2b924a71fa42.jpg"
          />
        </div>
        <div className="flex flex-col gap-2 text-gray-900">
          <div className="flex items-center gap-3">
            <span className="font-semibold">Kimberly R</span>
            <span className="h-[90%] w-[0.5px] bg-gray-200"></span>
            <div>
              <LevelRatingCard rating={3} />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <RatingStarsCard count={47} rating={4.9} />
            <span className="h-[90%] w-[0.5px] bg-gray-200"></span>
            <span className="text-sm text-gray-500">4 orders in queue</span>
          </div>
        </div>
      </div>
    </div>
  );
}
