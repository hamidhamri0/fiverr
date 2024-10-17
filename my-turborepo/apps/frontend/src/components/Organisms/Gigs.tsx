"use client";
import React from "react";
import { GigWithAvgRatingAndTotalReviews as GigType } from "@fiverr/shared";

import Gig from "./Gig";
import Link from "next/link";
import {
  Carousel,
  CarouselSliders,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/Components/Organisms/Carousal";

type GigsProps = {
  carouselClassName?: string;
  carouselContentClassName?: string;
  carouselItemClassName?: string;
  carouselButtonClassName?: string;
  carouselSlidersClassName?: string;
  carouselSliders?: boolean;
  carouselButtons?: boolean;
  gigs: GigType[];
};

export default function Gigs({
  carouselClassName,
  carouselContentClassName,
  carouselItemClassName,
  carouselButtonClassName,
  carouselSlidersClassName,
  gigs,
  carouselSliders,
  carouselButtons,
}: GigsProps) {
  return (
    <Carousel className={carouselClassName}>
      {carouselSliders && (
        <CarouselSliders className={carouselSlidersClassName} />
      )}
      <CarouselContent className={carouselContentClassName}>
        {gigs.map((gig: GigType) => (
          <CarouselItem className={carouselItemClassName} key={gig.id}>
            <Link href={`/${gig?.user?.username}/${gig.id}`} key={gig.id}>
              <Gig
                key={gig.id}
                profileImage={gig?.user?.picture || ""}
                gigImages={gig.imageUrls}
                username={gig?.user?.username || ""}
                description={gig.title}
                hasVideo={gig?.videoUrl?.videoUrl ? true : false}
                pro={gig?.user?.pro || false}
                rating={gig.averageRating}
                totalReviews={gig.totalReviews}
                startingPrice={gig?.startingPrice || 0}
                userLevel={gig?.user?.level || 0}
              />
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
      {carouselButtons && (
        <>
          <CarouselPrevious className={carouselButtonClassName} />
          <CarouselNext className={carouselButtonClassName} />
        </>
      )}
    </Carousel>
  );
}
