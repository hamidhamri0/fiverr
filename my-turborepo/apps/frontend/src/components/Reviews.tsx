"use client";
import React from "react";
import RatingStarsCard from "./Molecules/RatingStarsCard";
import Menus from "./Organisms/Menu";
import { formatDistanceToNow } from "date-fns";
import Button from "./Atoms/Btn";
import { Gig } from "types/gig";
import { GigReviews } from "types/gig-reviews";
import { countriesWithPhoneCode } from "@/lib/utils/countriesWithPhoneCode";
import Image from "next/image";
import ReviewBar from "@/Components/Molecules/ReviewBar";

// export function ReviewProgressBarWithReviewsCard({
//   reviewsChart,
//   totalRatings,
//   eachRating,
//   averageRating,
//   isGig,
// }: {
//   isGig: boolean;
//   reviews: reviewProp[];
//   allRatings: number;
//   eachRating: rating;
//   averageRating: number;
// }) {
//   return (
//     <>
//       <div className="mb-4">
//         {isGig && (
//           <h2 className="mb-4 text-xl font-bold text-gray-900">Reviews</h2>
//         )}{" "}
//         <div className="flex justify-between gap-2 xs:flex-col">
//           <p className="font-semibold text-gray-700">
//             {totalRatings} reviews {isGig && "for this Gig"}
//           </p>
//           <div className="flex gap-2 text-gray-700">
//             <RatingStarsCard rating={averageRating} />
//             <span>
//               {averageRating.toFixed(1)} ({allRatings})
//             </span>
//           </div>
//         </div>
//       </div>
//       <div className="mb-6 flex flex-col gap-4">
//         <ReviewBar rating={eachRating[1]} star={5} allRatings={allRatings} />
//         <ReviewBar rating={eachRating[2]} star={4} allRatings={allRatings} />
//         <ReviewBar rating={eachRating[3]} star={3} allRatings={allRatings} />
//         <ReviewBar rating={eachRating[4]} star={2} allRatings={allRatings} />
//         <ReviewBar rating={eachRating[5]} star={1} allRatings={allRatings} />
//       </div>
//       <div className="flex w-1/2 flex-col gap-6 xs:w-full">
//         <Input />
//         <SortBy />
//       </div>
//       <div className="mb-6 flex flex-col gap-4">
//         {reviews.map((review, i) => (
//           <ReviewCard key={i} {...review} />
//         ))}
//       </div>
//       <Button color="white">Show More Reviews</Button>
//     </>
//   );
// }

export function ReviewCard({ reviews }: { reviews: GigReviews }) {
  const [showMore, setShowMore] = React.useState(false);
  const { user: reviewer, rating, review, createdAt: date } = reviews;

  return (
    <div className="rounded-xl border border-gray-200 px-6 py-4 shadow-sm">
      <div className="mb-4 flex gap-4 border-b border-gray-300 pb-4">
        <div className="h-12 w-12 rounded-full">
          <img
            className="h-full w-full rounded-full"
            src={reviewer.picture}
            alt={reviewer.username}
          />
        </div>
        <div className="flex flex-col gap-1">
          <h3 className="font-bold text-gray-900">{reviewer.username}</h3>
          <div className="flex items-center gap-2">
            <div>
              <Image
                width={16}
                height={16}
                alt={reviewer.country}
                src={`https://flagcdn.com/48x36/${countriesWithPhoneCode
                  .find((country) => country.country === reviewer.country)
                  ?.iso.toLocaleLowerCase()}.png`}
              />
            </div>
            <p className="text-xs font-medium text-gray-600">
              {reviewer.country} {reviewer.level && `(${reviewer.level})`}
            </p>
          </div>
        </div>
      </div>
      <div className="">
        <div className="mb-2 flex gap-4">
          <div className="flex items-center gap-2">
            <RatingStarsCard size={17} rating={rating} />
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
        {/* <div className="mb-4 flex gap-4 border-b border-gray-200 pb-6">
          <div className="flex flex-col">
            <span className="font-semibold text-gray-900">${price}</span>
            <span className="text-sm">Price</span>
          </div>
          <span className="w-[0.5px] bg-gray-200"></span>
          <div className="flex flex-col">
            <span className="font-semibold text-gray-900">${price}</span>
            <span className="text-sm">Price</span>
          </div>
        </div> */}
        {/* <div
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
        </div> */}
      </div>
    </div>
  );
}

// type Reviews = {
//   reviews: reviewProp[];
//   allRatings: number;
//   eachRating: rating;
// };
// export function Input() {
//   return (
//     <div className="relative w-full">
//       <input
//         type="search"
//         id="location-search"
//         className="z-20 block w-full rounded border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 outline-none dark:border-gray-600 dark:border-s-gray-700 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
//         placeholder={`Search for a review`}
//         required
//       />
//       <button
//         type="submit"
//         className="absolute end-0 top-0 h-full rounded-e-lg border border-black bg-black p-2.5 text-sm font-medium text-white hover:bg-opacity-80"
//       >
//         <svg
//           className="h-4 w-4"
//           aria-hidden="true"
//           xmlns="http://www.w3.org/2000/svg"
//           fill="none"
//           viewBox="0 0 20 20"
//         >
//           <path
//             stroke="currentColor"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth="2"
//             d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
//           />
//         </svg>
//         <span className="sr-only">Search</span>
//       </button>
//     </div>
//   );
// }

// export function SortBy() {
//   return (
//     <div className="mb-6 flex items-center gap-2">
//       <span className="whitespace-nowrap">Sort By</span>
//       <Menus>
//         <Menus.Toggle id="SortReviews">
//           <Menus.DropDown
//             className="whitespace-nowrap"
//             id="SortReviews"
//             label="Most Recent"
//           ></Menus.DropDown>
//           <Menus.List
//             className="rounded-md border border-gray-200 bg-white p-2 shadow-md"
//             id="SortReviews"
//           >
//             <Menus.Button>Most Recent</Menus.Button>
//             <Menus.Button>Most Helpful</Menus.Button>
//             <Menus.Button>Top Reviews</Menus.Button>
//           </Menus.List>
//         </Menus.Toggle>
//       </Menus>
//     </div>
//   );
// }

export default function Reviews() {
  return <div className="p-4"></div>;
}

export function ReviewsProgressBar({
  totalReviews,
  averageRating,
  reviewsChart,
}: {
  totalReviews: number;
  averageRating: number;
  reviewsChart: Gig["reviewsChart"];
}) {
  if (!reviewsChart) return <div>No reviews</div>;
  return (
    <div className="mb-16">
      <div className="mb-8 flex justify-between gap-2 xs:flex-col">
        <p className="font-semibold text-gray-700">
          {totalReviews} reviews for this Gig
        </p>
        <div className="flex gap-2 text-gray-700">
          <RatingStarsCard rating={averageRating} />
        </div>
      </div>
      <div className="mb-6 flex flex-col gap-4">
        {[1, 2, 3, 4, 5].map((_, rate) => {
          const totalReviewsForStart =
            reviewsChart[rate]?.["totalReviews"] || 0;
          const rating = reviewsChart[rate]?.["rating"] || 0;
          return (
            <ReviewBar
              key={rate}
              totalReviews={totalReviews}
              star={rating}
              totalReviewsForStart={totalReviewsForStart}
            />
          );
        })}
      </div>
    </div>
  );
}
