import { FaStar } from "react-icons/fa";

export default function BoxRating({
  rating,
  count,
}: {
  rating: number;
  count: number;
}) {
  return (
    <div className="flex items-center gap-1">
      <FaStar className="text-gray-900" size={17} />
      <span className="font-bold text-gray-900">{rating} </span>
      <span className="text-gray-500 underline">({count})</span>
    </div>
  );
}
