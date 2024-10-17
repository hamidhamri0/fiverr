"use client";
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselSliders,
} from "./Carousal";
import { Gig } from "@fiverr/shared";
import ReviewItem from "@/Components/Molecules/ReviewItem";

export default function ReviewsCarousel({
  reviews,
}: {
  reviews: Gig["reviews"];
}) {
  if (!reviews || reviews.length === 0) return null;
  return (
    <div className="mb-16">
      <div className="mb-2 flex justify-between text-gray-900">
        <h2 className="text-2xl font-semibold">
          What people loved about this freelancer
        </h2>
        <a className="font-semibold transition-all hover:underline" href="#">
          See all reviews
        </a>
      </div>
      <Carousel>
        <CarouselSliders className="mb-4 ml-auto" color="gray" />
        <CarouselContent>
          {reviews.map((review, index) => {
            return (
              <CarouselItem className="basis-full" key={review.user.name}>
                <ReviewItem {...review} />
              </CarouselItem>
            );
          })}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
