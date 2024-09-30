import React from "react";
import { BiArrowToRight } from "react-icons/bi";
import GridSlider from "./GridSlider";
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

function CategoryCarouselCard({
  image,
  title,
}: {
  image: string;
  title: string;
}) {
  return (
    <div className="flex items-center gap-2 whitespace-nowrap rounded-md border border-gray-200 bg-white p-3 shadow-md">
      <div className="h-10 w-10">
        <img className="h-full w-full" src={image} />
      </div>
      <h2 className="font-semibold">{title}</h2>
      <BiArrowToRight size={20} />
    </div>
  );
}

export default function CategoryCarousel() {
  return (
    <GridSlider>
      <GridSlider.Container className="p-2">
        <div className="mb-6 flex items-center gap-4 sm:flex-col">
          <h2 className="text-2xl font-semibold text-gray-800 sm:text-xl">
            Most Popular in Programming & Tech
          </h2>
          <GridSlider.SlidersNav color="gray" className="ml-auto" />
        </div>
        <GridSlider.Grid>
          <div className="flex gap-4">
            {subCategories.map((subCategory, index) => (
              <CategoryCarouselCard
                key={index}
                image={subCategory.image}
                title={subCategory.subcategory}
              />
            ))}
          </div>
        </GridSlider.Grid>
      </GridSlider.Container>
    </GridSlider>
  );
}
