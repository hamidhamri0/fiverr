"use client";
import { HiOutlineVideoCamera } from "react-icons/hi2";
import { twMerge } from "tailwind-merge";
import LevelRatingCard from "@/Components/Molecules/LevelRatingCard";
import { ImageSlider } from "@/Components/Molecules/ImageSlider";
import RatingBox from "@/Components/Molecules/RatingBox";
import Image from "next/image";

type GigParam = {
  profileImage: string;
  gigImages: string[];
  username: string;
  description: string;
  hasVideo: boolean;
  startingPrice: number;
  rating: number;
  pro: boolean;
  classNameForImage?: string;
  includeImageText?: boolean;
  className?: string;
  totalReviews: number;
  userLevel: number;
};

export default function Gig({
  className,
  profileImage,
  gigImages,
  username,
  description,
  hasVideo,
  startingPrice,
  rating,
  totalReviews,
  pro,
  userLevel,
  classNameForImage = "",
  includeImageText = true,
}: GigParam) {
  className = twMerge("group", className);
  return (
    <div className={className}>
      <ImageSlider classNameForImage={classNameForImage} images={gigImages} />
      {includeImageText && (
        <div className="flex gap-2">
          <div className="h-6 w-6 rounded-full">
            <Image
              fill
              className="h-full w-full rounded-full object-cover"
              alt="yacine"
              src={profileImage}
            />
          </div>
          <h3 className="line-clamp-2 cursor-pointer font-semibold hover:underline">
            {username}
          </h3>

          <LevelRatingCard userLevel={userLevel} />
        </div>
      )}
      <p className="mb-4 line-clamp-2 block h-12 max-h-12 cursor-pointer overflow-hidden font-medium transition-all group-hover:underline">
        {description}
      </p>
      <RatingBox rating={rating} totalReviews={totalReviews} />
      <p className="mb-2 font-bold text-gray-900">From {startingPrice}$ </p>
      {hasVideo && (
        <div className="flex items-center gap-2 text-sm font-semibold text-gray-900">
          <HiOutlineVideoCamera size={18} />
          <span>Offers video consultations</span>
        </div>
      )}
    </div>
  );
}
