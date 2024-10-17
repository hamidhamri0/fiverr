"use client";
import React from "react";
import CategoryCarouselCard from "@/Components/Molecules/CategoryCarouselCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselSliders,
} from "@/Components/Organisms/Carousal";
const subCategories = [
  {
    subcategory: "Python Developers",
    image:
      "https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto/v1/attachments/generic_asset/asset/b6701ed1ebb288b30d0a845b6b87c071-1626182044812/Python%20Developers_2x.png",
  },
  {
    subcategory: "HTML & CSS Developers",
    image:
      "https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto/v1/attachments/generic_asset/asset/d10b2d17b529a4f9e4fcea0cc4036259-1627221464843/Html%20and%20Css.png",
  },
  {
    subcategory: "JavaScript Developers",
    image:
      "https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto/v1/attachments/generic_asset/asset/b6701ed1ebb288b30d0a845b6b87c071-1626182044826/JavaScript%20Developers_2x.png",
  },
  {
    subcategory: "WordPress Developers",
    image:
      "https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto/v1/attachments/generic_asset/asset/b6701ed1ebb288b30d0a845b6b87c071-1626182044816/WordPress%20Developers_2x.png",
  },
  {
    subcategory: "Shopify Developers",
    image:
      "https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto/v1/attachments/generic_asset/asset/b6701ed1ebb288b30d0a845b6b87c071-1626182044812/Shopify%20Developers_2x.png",
  },
  {
    subcategory: "Wix Developers",
    image:
      "https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto/v1/attachments/generic_asset/asset/b6701ed1ebb288b30d0a845b6b87c071-1626182044829/Wix%20Developers_2x.png",
  },
  {
    subcategory: "IOS App Development",
    image:
      "https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto/v1/attachments/generic_asset/asset/b6701ed1ebb288b30d0a845b6b87c071-1626182044806/iOS%20Developers_2x.png",
  },
  {
    subcategory: "Android App Development",
    image:
      "https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto/v1/attachments/generic_asset/asset/b6701ed1ebb288b30d0a845b6b87c071-1626182044823/Android%20Developers_2x.png",
  },
  {
    subcategory: "Unity Developers",
    image:
      "https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto/v1/attachments/generic_asset/asset/b6701ed1ebb288b30d0a845b6b87c071-1626182044819/Unity%20Developers_2x.png",
  },
];

export default function ServicesCardCarousel() {
  return (
    <Carousel>
      <div className="mb-6 flex items-center gap-4 sm:flex-col">
        <h2 className="text-2xl font-semibold text-gray-800 sm:text-xl">
          Most Popular in Programming & Tech
        </h2>
        <CarouselSliders />
      </div>
      <CarouselContent>
        <CarouselItem>
          <div className="mb-6 flex gap-4">
            {subCategories.map((subCategory, index) => (
              <CategoryCarouselCard
                key={index}
                image={subCategory.image}
                title={subCategory.subcategory}
              />
            ))}
          </div>
        </CarouselItem>
      </CarouselContent>
    </Carousel>
  );
}
