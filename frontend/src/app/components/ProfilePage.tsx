"use client";
import React, { useState } from "react";
import Gig from "./Gig";
import {
  Input,
  ReviewBar,
  ReviewCard,
  ReviewProgressBarWithReviewsCard,
  SortBy,
} from "./Reviews";
import { reviews } from "../page";
import Button from "./ui/Btn";
import { FiMessageSquare } from "react-icons/fi";
import { AddToList } from "./ActionToolbar";
import UserCard from "../smallComponents/UserCard";

export default function ProfilePage() {
  const [show, setShow] = useState(false);
  const [showGigs, setShowGigs] = useState(false);
  const skills = [
    "React",
    "Node",
    "Express",
    "MongoDB",
    "PostgreSQL",
    "Nextjs",
    "TailwindCSS",
    "GraphQL",
    "Apollo",
    "TypeScript",
  ];
  const gigs = Array.from({ length: 9 });

  const skillsToDisplay = skills.slice(0, show ? skills.length : 6);
  const gigsToDisplay = gigs.slice(0, showGigs ? gigs.length : 4);
  const eachRating = { 1: 150, 2: 20, 3: 80, 4: 50, 5: 300 };
  const allRatings = 600;

  return (
    <div className="mx-auto max-w-[1450px] p-4">
      <div className="flex justify-between gap-4">
        <UserCard
          imageClassName="h-36 w-36"
          Image={<UserCard.Image />}
          Name={<UserCard.Name className="text-2xl" />}
          RatingBox={<UserCard.Rating />}
          Username={<UserCard.Username />}
          ProTag={<UserCard.ProTag />}
          Languages={<UserCard.Languages />}
          Location={<UserCard.Location />}
        />
        <div className="lg:hidden">
          <div className="mb-4 flex items-center justify-end gap-2">
            <Button color="white">More about me</Button>
            <span className="rounded-lg border border-gray-100 bg-gray-50 p-2 shadow-sm">
              <AddToList />
            </span>
          </div>
          <div className="border border-gray-100 px-8 py-6 shadow-md">
            <div className="mb-4 flex gap-4">
              <img
                src="/images/yacine.png"
                alt="profile"
                className="h-12 w-12 rounded-full"
              />
              <div className="flex flex-col">
                <h2 className="text-xl font-bold text-gray-900">David</h2>
                <p>Offline 11:19 PM local time</p>
              </div>
            </div>
            <Button className="mb-6" grow={true} color="black">
              Contact me
            </Button>
            <p className="text-center">Average response time: 1 hour</p>
          </div>
        </div>
      </div>
      <div>
        <div className="mb-4">
          <h2 className="mb-2 text-2xl font-bold text-gray-900">About me</h2>
          <p className="text-gray-800">
            I am a software developer with 5 years of experience in the field. I
            have worked with various technologies and have a good understanding
            of the software development life cycle. I am a software developer
            with 5 years of experience in the field. I have worked with various
            technologies and have a good understanding of the software
            development life cycle.
          </p>
        </div>
        <div className="mb-12">
          <h2 className="mb-2 text-2xl font-bold text-gray-900">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {skillsToDisplay.map((skill) => (
              <span
                key={skill}
                className="cursor-pointer rounded-full border border-gray-200 bg-white px-4 py-1 text-gray-800 transition-all hover:bg-gray-100"
              >
                {skill}
              </span>
            ))}
            {!show && (
              <button
                onClick={() => setShow((p) => !p)}
                className="rounded-full border border-gray-200 bg-white px-4 py-1 text-gray-800 transition-all hover:bg-gray-100"
              >
                {skills.length - skillsToDisplay.length}+
              </button>
            )}
          </div>
        </div>
        <div className="mb-8">
          <h2 className="mb-4 text-2xl font-bold text-gray-900">My Gigs</h2>
          <div className="mb-6 grid w-full grid-cols-4 gap-8 1150:grid-cols-3 md:grid-cols-2 xs:grid-cols-1">
            {gigsToDisplay.map((_, index) => (
              <Gig
                includeImageText={false}
                key={index}
                hasVideo={true}
                description="I will create a professional website for you"
                profileImage="/images/yacine.png"
                gigImages={[
                  "/images/KITCHEN VIEW 02 copy 2.webp",
                  "/images/KITCHEN VIEW 02 copy 3.webp",
                  "/images/D1.webp",
                  "/images/E1.webp",
                ]}
                username="Yacine"
                startingPrice={200}
                rating={4.8}
                pro={true}
              />
            ))}
          </div>
          {!showGigs && (
            <button
              onClick={() => setShowGigs((p) => !p)}
              className="rounded-full border border-gray-200 bg-white px-4 py-1 text-gray-800 transition-all hover:bg-gray-100"
            >
              {"show "}
              {gigs.length - gigsToDisplay.length}+
            </button>
          )}
        </div>
      </div>
      <ReviewProgressBarWithReviewsCard
        allRatings={allRatings}
        eachRating={eachRating}
        reviews={reviews}
        averageRating={4.8}
        isGig={false}
      />
    </div>
  );
}
