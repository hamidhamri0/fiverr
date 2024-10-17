"use client";
import React, { useState } from "react";
import { GigReviews } from "types/gig-reviews";
import { ReviewCard } from "./Reviews";
import { Button } from "@/Components/ui/button";
import { get } from "@/lib/utils/customFetch";

export default function PaginationReviews({
  initialReviews,
  next,
  offset,
  gigId,
}: {
  initialReviews: GigReviews[];
  next: boolean;
  offset: number;
  gigId: string;
}) {
  const [reviews, setReviews] = useState<{
    reviews: GigReviews[];
    next: boolean;
    offset: number;
  }>({ reviews: initialReviews, next, offset });
  async function handleShowMoreReviews() {
    if (next) {
      const reviewsData = await get<{
        reviews: GigReviews[];
        next: boolean;
        offset: number;
      }>(
        `/gig-reviews/getGigReviews/${gigId}?limit=${1}&offset=${reviews.offset}`,
      );
      console.log(reviewsData, reviews.offset);
      setReviews({
        reviews: [...reviews.reviews, ...reviewsData.reviews],
        next: reviewsData.next,
        offset: reviewsData.offset,
      });
    }
  }
  return (
    <div className="mb-12">
      <div className="mb-6 flex flex-col gap-4">
        {reviews?.reviews?.map((review, index) => {
          return <ReviewCard key={index} reviews={review} />;
        })}
      </div>
      <Button
        disabled={!reviews.next}
        onClick={handleShowMoreReviews}
        className="font-semibold"
        variant="outline"
      >
        Show More Reviews
      </Button>
    </div>
  );
}
