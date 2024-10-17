"use client";
import React from "react";
import GalleryImage from "@/Components/Molecules/GalleryImage";

export default function GalleryLayout({
  initialImages: images,
}: {
  initialImages: string[];
}) {
  return (
    <div className="mx-auto mb-12 max-w-[1450px] px-4">
      <h2 className="mb-6 p-4 text-2xl font-bold text-gray-900">
        Get inspired by work done in the Logo Design category
      </h2>
      <div className="columns-4 1150:columns-3 md:columns-2 xs:columns-1">
        {images.map((image) => (
          <GalleryImage key={image} image={image} />
        ))}
      </div>
    </div>
  );
}
