import React from "react";
import GridSlider from "./GridSlider";
import { FaStar } from "react-icons/fa";
import { formatDistanceToNow } from "date-fns";
import RatingStarsCard from "./smallComponents/RatingStarsCard";

const reviews: ReviewItemProps[] = [
  {
    name: "John Doe",
    image: "/smallImages/architecture-design.webp",
    country: "USA",
    rating: 4.5,
    descrition:
      "lorem ipsum dolor sit amet, consectetur adipiscing elit. lorem ipsum dolor sit amet, consectetur adipiscing elit. lorem ipsum dolor sit amet, consectetur adipiscing elit. lorem ipsum dolor sit amet, consectetur adipiscing elit.lorem ipsum dolor sit amet, consectetur adipiscing elit. lorem ipsum dolor sit amet, consectetur adipiscing elit.lorem ipsum dolor sit amet, consectetur adipiscing elit. lorem ipsum dolor sit amet, consectetur adipiscing elit.lorem ipsum dolor sit amet, consectetur adipiscing elit. lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    dateOfReview: "2023-09-15",
  },
  {
    name: "Jane Smith",
    image: "/smallImages/data-science.webp",
    country: "Canada",
    rating: 4.0,
    descrition: "Good experience overall.",
    dateOfReview: "2023-08-20",
  },
  {
    name: "Carlos Martinez",
    image: "/smallImages/html.webp",
    country: "Mexico",
    rating: 5.0,
    descrition: "Excellent! Highly recommend.",
    dateOfReview: "2023-07-10",
  },
  {
    name: "Anna Müller",
    image: "/smallImages/javaScript.webp",
    country: "Germany",
    rating: 3.5,
    descrition: "Average experience, could be better.",
    dateOfReview: "2023-06-05",
  },
  {
    name: "Yuki Tanaka",
    image: "/smallImages/architecture-design.webp",
    country: "Japan",
    rating: 4.8,
    descrition: "Fantastic service and quality!",
    dateOfReview: "2023-05-25",
  },
  {
    name: "Yuki Tanaka",
    image: "/smallImages/architecture-design.webp",
    country: "Japan",
    rating: 4.8,
    descrition: "Fantastic service and quality!",
    dateOfReview: "2023-05-25",
  },
  {
    name: "Yuki Tanaka",
    image: "/smallImages/architecture-design.webp",
    country: "Japan",
    rating: 4.8,
    descrition: "Fantastic service and quality!",
    dateOfReview: "2023-05-25",
  },
];

type ReviewItemProps = {
  name: string;
  image: string;
  country: string;
  rating: number;
  descrition: string;
  dateOfReview: string;
};

function ReviewItem({
  name,
  image,
  country,
  rating,
  descrition,
  dateOfReview,
}: ReviewItemProps) {
  const [showMore, setShowMore] = React.useState(false);
  return (
    <div className="flex w-full max-w-[700px] flex-shrink-0 gap-4 self-start rounded-md border border-gray-200 px-6 py-4">
      <div className="max-h-10 min-h-10 min-w-10 max-w-10 rounded-full">
        <img src={image} alt={name} className="h-full w-full rounded-full" />
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <h3 className="whitespace-nowrap font-bold text-gray-900">{name}</h3>
          <p className="text-sm">{country}</p>
          <span className="h-[90%] w-[0.5px] bg-gray-200"></span>
          <RatingStarsCard rating={rating} />
        </div>
        <div>
          <p className="text-gray-900">
            {showMore ? descrition : descrition.slice(0, 200)}
            {descrition.length > 200 && (
              <span
                onClick={() => setShowMore((p) => !p)}
                className="text-blue-500"
              >
                {showMore ? " Show less" : "... Show more"}
              </span>
            )}
          </p>

          <p>{formatDistanceToNow(new Date(dateOfReview))} ago</p>
        </div>
      </div>
    </div>
  );
}

export default function ReviewsCarousel() {
  return (
    <div className="mx-auto max-w-[700px] px-4">
      <div className="mb-12 flex justify-between text-gray-900">
        <h2 className="text-2xl font-semibold">
          What people loved about this freelancer
        </h2>
        <a className="font-semibold transition-all hover:underline" href="#">
          See all reviews
        </a>
      </div>
      <GridSlider>
        <GridSlider.Container>
          <GridSlider.SlidersNav className="mb-4 justify-end" color="gray" />
          <GridSlider.Grid>
            <div className="flex gap-6">
              {reviews.map((review, index) => {
                return <ReviewItem key={index} {...review} />;
              })}
            </div>
          </GridSlider.Grid>
        </GridSlider.Container>
      </GridSlider>
    </div>
  );
}
