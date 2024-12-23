import React from "react";
import { FaStar } from "react-icons/fa";

type RatingStarsCardProps = {
  rating: number;
  size?: number;
};

export default function RatingStarsCard({
  rating,
  size = 20,
}: RatingStarsCardProps) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: Math.round(rating) }).map((_, index) => {
        return (
          <span key={index}>
            <FaStar color="black" size={size} />
          </span>
        );
      })}
      <p className="font-bold">{rating}</p>
    </div>
  );
}
