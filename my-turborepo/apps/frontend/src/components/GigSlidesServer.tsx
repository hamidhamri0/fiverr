import React from "react";
import GigSlides from "./GigSlides";
import { findUsersGigs } from "@/lib/gig/getGig";

export default async function GigSlidesServer() {
  const userGigs = await findUsersGigs(["reviews", "user", "startingPrice"]);
  // await sleep(1000);
  return <GigSlides userGigs={userGigs} />;
}
