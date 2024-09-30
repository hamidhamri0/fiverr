import React from "react";
import RatingStarsCard from "./ui/RatingStarsCard";
import Menus from "./Menu";
import { formatDistanceToNow } from "date-fns";
import { OpenArrow } from "./Footer";
import { de } from "date-fns/locale";
import Button from "./ui/Btn";

type rating = {
  "1": number;
  "2": number;
  "3": number;
  "4": number;
  "5": number;
};

type reviewer = {
  username: string;
  image: string;
  country: string;
};

type reviewProp = {
  reviewer: reviewer;
  rating: rating;
  review: string;
  duration: string;
  date: string;
  price: number;
};

type ReviewBarProp = {
  allRatings: number;
  star: number;
  rating: number;
};

export function ReviewBar({ allRatings, star, rating }: ReviewBarProp) {
  // take only two decimal points
  let percentage = ((rating / allRatings) * 100).toFixed(2);
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
      <span>({rating})</span>
    </div>
  );
}

export function ReviewProgressBarWithReviewsCard({
  reviews,
  allRatings,
  eachRating,
  averageRating,
  isGig,
}: {
  isGig: boolean;
  reviews: reviewProp[];
  allRatings: number;
  eachRating: rating;
  averageRating: number;
}) {
  return (
    <>
      <div className="mb-4">
        {isGig && (
          <h2 className="mb-4 text-xl font-bold text-gray-900">Reviews</h2>
        )}{" "}
        <div className="flex justify-between gap-2 xs:flex-col">
          <p className="font-semibold text-gray-700">
            {allRatings} reviews {isGig && "for this Gig"}
          </p>
          <div className="flex gap-2 text-gray-700">
            <RatingStarsCard rating={averageRating} />
            <span>
              {averageRating.toFixed(1)} ({allRatings})
            </span>
          </div>
        </div>
      </div>
      <div className="mb-6 flex flex-col gap-4">
        <ReviewBar rating={eachRating[1]} star={5} allRatings={allRatings} />
        <ReviewBar rating={eachRating[2]} star={4} allRatings={allRatings} />
        <ReviewBar rating={eachRating[3]} star={3} allRatings={allRatings} />
        <ReviewBar rating={eachRating[4]} star={2} allRatings={allRatings} />
        <ReviewBar rating={eachRating[5]} star={1} allRatings={allRatings} />
      </div>
      <div className="flex w-1/2 flex-col gap-6 xs:w-full">
        <Input />
        <SortBy />
      </div>
      <div className="mb-6 flex flex-col gap-4">
        {reviews.map((review, i) => (
          <ReviewCard key={i} {...review} />
        ))}
      </div>
      <Button color="white">Show More Reviews</Button>
    </>
  );
}

export function ReviewCard({
  reviewer,
  rating,
  review,
  duration,
  price,
  date,
}: reviewProp) {
  const [showMore, setShowMore] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  return (
    <div className="rounded-xl border border-gray-200 px-6 py-4 shadow-sm">
      <div className="mb-4 flex gap-4 border-b border-gray-300 pb-4">
        <div className="h-12 w-12 rounded-full">
          <img
            className="h-full w-full rounded-full"
            src={reviewer.image}
            alt={reviewer.username}
          />
        </div>
        <div>
          <h3 className="font-bold text-gray-900">{reviewer.username}</h3>
          <p className="text-sm">{reviewer.country}</p>
        </div>
      </div>
      <div className="">
        <div className="mb-2 flex gap-4">
          <div className="flex items-center gap-2">
            <RatingStarsCard size={17} rating={calculateRating(rating)} />
            <span className="font-semibold text-gray-700">
              {calculateRating(rating).toFixed(1)}
            </span>
          </div>
          <span className="w-[0.5px] bg-gray-200"></span>
          <span className="text-sm">{formatDistanceToNow(date)}</span>
        </div>
        <p className="mb-2 text-gray-700">
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
        <div className="mb-4 flex gap-4 border-b border-gray-200 pb-6">
          <div className="flex flex-col">
            <span className="font-semibold text-gray-900">${price}</span>
            <span className="text-sm">Price</span>
          </div>
          <span className="w-[0.5px] bg-gray-200"></span>
          <div className="flex flex-col">
            <span className="font-semibold text-gray-900">${price}</span>
            <span className="text-sm">Price</span>
          </div>
        </div>
        <div
          onClick={() => setOpen((p) => !p)}
          className="flex cursor-pointer items-center gap-4"
        >
          <div className="h-10 w-10 rounded-full">
            <img
              className="h-full w-full rounded-full"
              src="/smallImages/data-science.webp"
              alt="hero"
            />
          </div>
          <div className="flex w-full justify-between">
            <span className="font-semibold text-gray-900">
              Seller&apos;s Response
            </span>
            <OpenArrow className="!flex" isOpen={open} />
          </div>
        </div>
        <div
          className={`ml-[52px] max-w-full transition-all duration-200 ease-in-out ${open ? "h-auto translate-y-0 opacity-100" : "h-0 -translate-y-4 opacity-0"}`}
        >
          <p className="max-w-full break-words">{review}</p>
        </div>
      </div>
    </div>
  );
}

type Reviews = {
  reviews: reviewProp[];
  allRatings: number;
  eachRating: rating;
};

const calculateRating = (reviews: rating) => {
  let totalReviews = 0;
  let weightedSum = 0;

  for (const [star, count] of Object.entries(reviews)) {
    totalReviews += count;
    weightedSum += Number(star) * count;
  }

  return weightedSum / totalReviews;
};

export function Input() {
  return (
    <div className="relative w-full">
      <input
        type="search"
        id="location-search"
        className="z-20 block w-full rounded border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 outline-none dark:border-gray-600 dark:border-s-gray-700 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
        placeholder={`Search for a review`}
        required
      />
      <button
        type="submit"
        className="absolute end-0 top-0 h-full rounded-e-lg border border-black bg-black p-2.5 text-sm font-medium text-white hover:bg-opacity-80"
      >
        <svg
          className="h-4 w-4"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 20"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
          />
        </svg>
        <span className="sr-only">Search</span>
      </button>
    </div>
  );
}

export function SortBy() {
  return (
    <div className="mb-6 flex items-center gap-2">
      <span className="whitespace-nowrap">Sort By</span>
      <Menus>
        <Menus.Toggle id="SortReviews">
          <Menus.DropDown
            className="whitespace-nowrap"
            id="SortReviews"
            label="Most Recent"
          ></Menus.DropDown>
          <Menus.List
            className="rounded-md border border-gray-200 bg-white p-2 shadow-md"
            id="SortReviews"
          >
            <Menus.Button>Most Recent</Menus.Button>
            <Menus.Button>Most Helpful</Menus.Button>
            <Menus.Button>Top Reviews</Menus.Button>
          </Menus.List>
        </Menus.Toggle>
      </Menus>
    </div>
  );
}

export default function Reviews({ reviews, allRatings, eachRating }: Reviews) {
  const averageRating = calculateRating(eachRating);

  return (
    <div className="mx-auto max-w-[700px] p-4">
      <ReviewProgressBarWithReviewsCard
        isGig={true}
        averageRating={averageRating}
        reviews={reviews}
        allRatings={allRatings}
        eachRating={eachRating}
      />
    </div>
  );
}
