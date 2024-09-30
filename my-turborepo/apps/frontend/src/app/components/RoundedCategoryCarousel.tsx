import React from "react";
import GridSlider from "./GridSlider";
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

function RoundedCategory({ name, img }: { name: string; img: string }) {
  return (
    <div className="flex items-center gap-2 whitespace-nowrap rounded-full border border-gray-200 bg-white p-3 text-xl font-semibold text-gray-900 shadow-md lg:p-2">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-100 p-3 lg:h-12 lg:w-12">
        <img src={img} alt={name} className="h-8 w-8" />
      </div>
      <span className="px-2">{name}</span>
    </div>
  );
}
{
}

export default function RoundedCategoryCarousel() {
  return (
    <GridSlider gap={16}>
      <GridSlider.Container className="mb-12 p-2">
        <GridSlider.SlidersNav color="gray" className="mb-4 justify-end" />
        <GridSlider.Grid className="border-b border-gray-200 py-6">
          <div className="mb-2 flex gap-4">
            {categories.map((category) => (
              <RoundedCategory
                key={category.name}
                name={category.name}
                img={category.img}
              />
            ))}
          </div>
        </GridSlider.Grid>
      </GridSlider.Container>
    </GridSlider>
  );
}
