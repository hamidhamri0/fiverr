import { twMerge } from "tailwind-merge";

const MAX_RATING = 3;

type BoxLevelRatingProps = {
  rating: number;
  className?: string;
};

export default function LevelRatingCard({
  rating,
  className,
}: BoxLevelRatingProps) {
  className = twMerge(
    `flex items-center justify-center gap-1 rounded-lg ${rating == 3 ? "bg-[#FFE0B3]" : "bg-transparent"} px-2`,
    className,
  );
  return (
    <div className={className}>
      <span
        className={`text-sm font-bold ${rating == 3 ? "text-[#804317]" : "text-black"}`}
      >
        {rating == 3 ? "Top Rated" : "Level " + rating}
      </span>
      {Array.from({ length: rating }, (_, index) => {
        return (
          <span
            key={index}
            className={`${rating == 3 ? "text-[#804317]" : "text-black"} `}
          >
            &#9830;
          </span>
        );
      })}
    </div>
  );
}
