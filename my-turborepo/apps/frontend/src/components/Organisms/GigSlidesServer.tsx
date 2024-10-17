import React from "react";
import GigSlides from "@/Components/Organisms/GigSlides";
import { findUsersGigs } from "@/lib/gig/getGig";

export default async function GigSlidesServer() {
  const userGigs = await findUsersGigs(["reviews", "user", "startingPrice"]);
  return <GigSlides userGigs={userGigs} />;
}
