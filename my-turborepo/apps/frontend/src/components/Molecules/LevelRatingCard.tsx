import { cn } from "@/lib/utils";
import { MAX_RATING } from "@/constants";

type BoxLevelRatingProps = {
  userLevel: number;
  className?: string;
};

export default function LevelRatingCard({
  userLevel,
  className,
}: BoxLevelRatingProps) {
  className = cn(
    `px-2 flex items-center justify-center gap-1 rounded-lg ${userLevel == MAX_RATING ? "bg-[#FFE0B3]" : "bg-transparent"}`,
    className,
  );
  return (
    <div className={className}>
      <span
        className={`whitespace-nowrap ${userLevel == MAX_RATING ? "text-xs" : "text-sm"} font-bold ${userLevel == MAX_RATING ? "text-[#804317]" : "text-black"}`}
      >
        {userLevel == MAX_RATING ? "Top Rated" : "Level " + userLevel}
      </span>
      {Array.from({ length: userLevel }, (_, index) => {
        return (
          <span
            key={index}
            className={`${userLevel == MAX_RATING ? "text-[#804317]" : "text-black"} `}
          >
            &#9830;
          </span>
        );
      })}
      {Array.from({ length: MAX_RATING - userLevel }, (_, index) => {
        return (
          <span key={index} className={`text-gray- opacity-50`}>
            &#9830;
          </span>
        );
      })}
    </div>
  );
}
