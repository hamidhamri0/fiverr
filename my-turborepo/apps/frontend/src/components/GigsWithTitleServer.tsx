import { getAllGigs } from "@/lib/gig/getGig";
import React from "react";
import { sleep } from "@/lib/utils";
import Gigs from "./Organisms/Gigs";

export default async function GigsWithTitleServer() {
  const gigs = await getAllGigs(["user", "reviews", "startingPrice"]);
  // await sleep(4000);

  return (
    <div className="mb-24">
      <h2 className="mb-4 ml-2 text-2xl font-semibold text-gray-800">
        Popular Services
      </h2>
      <Gigs
        carouselButtons={true}
        carouselItemClassName="basis-1/4 xl:basis-1/3 lg:basis-1/2 md:basis-full"
        gigs={gigs}
      />
    </div>
  );
}
