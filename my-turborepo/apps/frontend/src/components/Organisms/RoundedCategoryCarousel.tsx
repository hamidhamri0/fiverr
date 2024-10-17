"use client";

import React from "react";
import RoundedCategory from "@/Components/Molecules/RoundedCategory";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/Components/Organisms/Carousal";
const categories = [
  {
    name: "Web Application",
    img: "https://fiverr-res.cloudinary.com/image/upload/v1584948052/general_assets/categories/nsc_01/2041.svg",
  },
  {
    name: "Desktop Applications",
    img: "https://fiverr-res.cloudinary.com/image/upload/v1584948052/general_assets/categories/nsc_01/2703.svg",
  },
  {
    name: "API & Integrations",
    img: "https://fiverr-res.cloudinary.com/image/upload/v1584948052/general_assets/categories/nsc_01/2704.svg",
  },
  {
    name: "Convert PSD",
    img: "https://fiverr-res.cloudinary.com/image/upload/v1584948052/general_assets/categories/nsc_01/2044.svg",
  },
  {
    name: "Bug Fixes",
    img: "https://fiverr-res.cloudinary.com/image/upload/v1584948052/general_assets/categories/nsc_01/2042.svg",
  },
  {
    name: "Scripting",
    img: "https://fiverr-res.cloudinary.com/image/upload/v1584948052/general_assets/categories/nsc_01/2045.svg",
  },
  {
    name: "Help/Consultation",
    img: "https://fiverr-res.cloudinary.com/image/upload/v1584948052/general_assets/categories/nsc_01/2047.svg",
  },
  {
    name: "Email Template",
    img: "https://fiverr-res.cloudinary.com/image/upload/v1584948052/general_assets/categories/nsc_01/2043.svg",
  },
  {
    name: "Browser Extensions",
    img: "https://fiverr-res.cloudinary.com/image/upload/v1584948052/general_assets/categories/nsc_01/2306.svg",
  },
  {
    name: "Plugins Development",
    img: "https://fiverr-res.cloudinary.com/image/upload/v1584948052/general_assets/categories/nsc_01/2740.svg",
  },
];

export default function RoundedCategoryCarousel() {
  return (
    <Carousel>
      <CarouselContent className="mb-12 p-2">
        <div className="mb-2 flex gap-4">
          {categories.map((category) => (
            <CarouselItem key={category.name}>
              <RoundedCategory name={category.name} img={category.img} />
            </CarouselItem>
          ))}
        </div>
      </CarouselContent>
      <CarouselNext color="gray" className="mb-4 justify-end" />
      <CarouselPrevious color="gray" className="mb-4 justify-end" />
    </Carousel>
  );
}
