import { twMerge } from "tailwind-merge";

const MAX_RATING = 3;

type BoxLevelRatingProps = {
  userLevel: number;
  className?: string;
};

export default function LevelRatingCard({
  userLevel,
  className,
}: BoxLevelRatingProps) {
  className = twMerge(
    `px-2 flex items-center justify-center gap-1 rounded-lg ${userLevel == 3 ? "bg-[#FFE0B3]" : "bg-transparent"}`,
    className,
  );
  return (
    <div className={className}>
      <span
        className={`whitespace-nowrap ${userLevel == 3 ? "text-xs" : "text-sm"} font-bold ${userLevel == 3 ? "text-[#804317]" : "text-black"}`}
      >
        {userLevel == 3 ? "Top Rated" : "Level " + userLevel}
      </span>
      {Array.from({ length: userLevel }, (_, index) => {
        return (
          <span
            key={index}
            className={`${userLevel == 3 ? "text-[#804317]" : "text-black"} `}
          >
            &#9830;
          </span>
        );
      })}
      {Array.from({ length: 3 - userLevel }, (_, index) => {
        return (
          <span key={index} className={`text-gray- opacity-50`}>
            &#9830;
          </span>
        );
      })}
    </div>
  );
}
