import RatingStarsCard from "@/Components/Molecules/RatingStarsCard";
import { countriesWithPhoneCode } from "@/lib/utils/countriesWithPhoneCode";
import { formatDistanceToNow } from "date-fns";
import Image from "next/image";
import { useState } from "react";
import { GigReviews } from "types/gig-reviews";

export default function ReviewItem({
  createdAt,
  review,
  user: { username, country, picture },
  rating,
}: GigReviews) {
  const [showMore, setShowMore] = useState(false);
  return (
    <div className="flex gap-4 self-start rounded-md border border-gray-200 px-6 py-4">
      <div className="relative max-h-10 min-h-10 min-w-10 max-w-10 rounded-full">
        <Image
          fill
          alt={username}
          src={picture}
          className="h-full w-full rounded-full"
        />
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <h3 className="whitespace-nowrap font-bold text-gray-900">
            {username}
          </h3>
          <div className="flex items-center gap-2">
            <div>
              <Image
                width={16}
                height={16}
                alt={country}
                src={`https://flagcdn.com/48x36/${countriesWithPhoneCode.find((c) => c.country === country)?.iso.toLocaleLowerCase()}.png`}
              />
            </div>
            <p className="text-sm">{country}</p>
          </div>
          <span className="h-[90%] w-[0.5px] bg-gray-200"></span>
          <RatingStarsCard size={17} rating={rating} />
        </div>
        <div>
          <p className="text-gray-900">
            {showMore ? review : review.slice(0, 200)}
            {review.length > 200 && (
              <span
                onClick={() => setShowMore((p) => !p)}
                className="text-blue-500"
              >
                {showMore ? " Show less" : "... Show more"}
              </span>
            )}
          </p>

          <p className="text-sm font-medium text-gray-400">
            {formatDistanceToNow(new Date(createdAt))} ago
          </p>
        </div>
      </div>
    </div>
  );
}
