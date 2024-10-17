
export default function RatingBox({
  rating,
  totalReviews,
  className
}: {
  rating: number;
  totalReviews: number;
  className?: string;
}) {
  className = cn("mb-3 flex items-center gap-1 text-gray-900", className);
  if (!totalReviews == null) return <div className="mb-2 min-h-6"></div>;
  return <div className={className}>
      <span>
        <FaStar fill="black" />
      </span>
      <span className="font-bold">{rating}</span>
      <span>({formatRating(totalReviews)})</span>
    </div>;
}
  