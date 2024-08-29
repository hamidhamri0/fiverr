import { useState } from "react";
import { FaChevronLeft, FaChevronRight, FaHeart, FaStar } from "react-icons/fa";
import { HiOutlineVideoCamera } from "react-icons/hi2";
import { twMerge } from "tailwind-merge";
import LevelRatingCard from "./smallComponents/LevelRatingCard";

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
};

const formatNumber = (num: number): string => {
  if (num >= 1_000_000) {
    return (num / 1_000_000).toFixed(1) + "mil+";
  } else if (num >= 1_000) {
    return (num / 1_000).toFixed(1) + "k+";
  } else {
    return num.toString();
  }
};

export function RatingBox({
  rating,
  reviewsCount,
  className,
}: {
  rating: number;
  reviewsCount: number;
  className?: string;
}) {
  className = twMerge("mb-3 flex items-center gap-1 text-gray-900", className);
  return (
    <div className={className}>
      <span>
        <FaStar fill="black" />
      </span>
      <span className="font-bold">{rating}</span>
      <span>({formatNumber(reviewsCount)})</span>
    </div>
  );
}

const ImageSlider = ({
  gigImages,
  classNameForImage,
}: {
  gigImages: string[];
  classNameForImage?: string;
}) => {
  const images = ["/images/paywatch.webp", "/images/paywatch.webp"];

  const [addedToList, setAddedToList] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => prevIndex - 1);
  };

  classNameForImage = twMerge(
    "relative group mb-4 cursor-pointer rounded-md overflow-hidden border border-gray-200 shadow-md",
    classNameForImage,
  );

  return (
    <div className={classNameForImage}>
      <div
        className="flex transform transition-transform duration-500"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
          transition: "transform 0.5s ease",
        }}
      >
        {gigImages.map((image: string, index: number) => (
          <img
            key={index}
            src={image}
            alt={`Slide ${index + 1}`}
            style={{
              aspectRatio: "16/10",
            }}
            className="block max-w-full object-cover"
          />
        ))}
      </div>
      <span
        onClick={() => setAddedToList((p) => !p)}
        className="absolute right-4 top-4 cursor-pointer"
      >
        {addedToList ? (
          <FaHeart className="opacity-20" size={25} color="black" fill="red" />
        ) : (
          <FaHeart size={25} color="black" fill="#ec3131" />
        )}
      </span>
      {currentIndex > 0 && (
        <button
          className="absolute left-0 top-1/2 -translate-y-1/2 transform rounded-full bg-gray-800 p-4 text-white opacity-0 transition-opacity group-hover:opacity-100"
          onClick={handlePrev}
        >
          <FaChevronLeft className="absolute right-0 top-1/2 -translate-x-1/2 -translate-y-1/2" />
        </button>
      )}
      {currentIndex + 1 < images.length && (
        <button
          className="absolute right-0 top-1/2 -translate-y-1/2 transform rounded-full bg-gray-800 p-4 text-white opacity-0 transition-opacity group-hover:opacity-100"
          onClick={handleNext}
        >
          <FaChevronRight className="absolute right-0 top-1/2 -translate-x-1/2 -translate-y-1/2" />
        </button>
      )}
    </div>
  );
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
  pro,
  classNameForImage = "",
  includeImageText,
}: GigParam) {
  className = twMerge("group", className);
  return (
    <div className={className}>
      <ImageSlider
        classNameForImage={classNameForImage}
        gigImages={gigImages}
      />
      {includeImageText && (
        <div className="flex gap-2">
          <div className="h-6 w-6 rounded-full">
            <img
              className="h-full w-full rounded-full"
              alt="yacine"
              src={profileImage}
            />
          </div>
          <h3 className="line-clamp-2 cursor-pointer font-semibold hover:underline">
            {username}
          </h3>

          <LevelRatingCard rating={3} />
        </div>
      )}
      <p className="mb-4 line-clamp-2 cursor-pointer overflow-hidden font-medium transition-all group-hover:underline">
        {description}
      </p>
      <RatingBox rating={4.8} reviewsCount={451} />
      <p className="mb-2 font-bold text-gray-900">From {startingPrice}$ </p>
      <div className="flex items-center gap-2 text-sm font-semibold text-gray-900">
        <HiOutlineVideoCamera size={18} />
        {hasVideo && <span>Offers video consultations</span>}
      </div>
    </div>
  );
}
