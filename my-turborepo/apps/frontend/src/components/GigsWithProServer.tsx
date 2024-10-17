import { getAllGigs } from "@/lib/gig/getGig";
import { sleep } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import React from "react";
import Gigs from "./Organisms/Gigs";

export default async function GigsWithProServer() {
  const gigs = await getAllGigs(["user", "reviews", "startingPrice"], 5);
  // await sleep(8000);
  return (
    <div className="mb-24 rounded-sm bg-gray-100 bg-opacity-50 p-6">
      <h2 className="mb-1 text-2xl font-semibold text-gray-800">
        Verified Pro services in Logo Design
      </h2>
      <div className="mb-8 flex flex-wrap justify-between">
        <p className="text-sm text-gray-500">
          Hand-vetted talent for all your professional needs.
        </p>
        <Link href="/search?q=logo">
          <button className="flex items-center text-gray-800 underline">
            <span>Show All</span> <ChevronRight size={22} strokeWidth={1} />
          </button>
        </Link>
      </div>
      <Gigs
        carouselButtons={true}
        carouselItemClassName="basis-1/4 px-2 xl:basis-1/3 lg:basis-1/2 sm:basis-full"
        carouselButtonClassName="hidden xl:flex"
        gigs={gigs}
      />
    </div>
  );
}
