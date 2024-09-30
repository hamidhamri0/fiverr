import React from "react";
import { Gigs } from "./GigSlides";

export default function VerifiedProServices() {
  return (
    <div className="mb-8 overflow-hidden bg-gray-100 bg-opacity-50 px-6 pb-12 pt-8">
      <h3 className="px-4 py-2 text-2xl font-bold text-gray-900 sm:text-xl">
        Verified Pro services in Logo Design
      </h3>
      <div className="flex">
        <h4 className="text-md mb-6 px-4">
          Hand-vetted talent for all your professional needs.
        </h4>
        <a className="ml-auto cursor-pointer pb-2 font-medium text-gray-900">
          <span className="whitespace-nowrap p-2 underline">Show All </span>
          <span>&gt;</span>
        </a>
      </div>
      <Gigs className="xs:flex-col" maxLength={5} />
    </div>
  );
}
