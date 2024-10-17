type ReviewBarProp = {
  totalReviews: number;
  star: number;
  totalReviewsForStart: number;
};
export default function ReviewBar({
  totalReviews,
  star,
  totalReviewsForStart,
}: ReviewBarProp) {
  let percentage = ((totalReviewsForStart / totalReviews) * 100).toFixed(2);
  return (
    <div className="flex h-4 items-center gap-2 text-gray-700">
      <span className="whitespace-nowrap font-semibold">
        {star} {star !== 1 ? "stars" : "star"}{" "}
      </span>
      <div className="h-full w-full rounded-full bg-gray-200 dark:bg-gray-700">
        <div
          style={{
            width: `${percentage}%`,
          }}
          className="h-full rounded-full bg-black p-0.5 text-center text-xs font-medium leading-none text-blue-100"
        ></div>
      </div>
      <span>{percentage}%</span>
      <span>({totalReviewsForStart})</span>
    </div>
  );
}
