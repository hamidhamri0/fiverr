import React, { useEffect, useState } from "react";
import Categories from "./Categories";
import { OpenArrow } from "./Footer";
import debounce from "./utils/debounce";
const categories = [
  {
    name: "Websites",
    image:
      "https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto/v1/attachments/generic_asset/asset/3baf91d2ca0c49f0973f2f9e3e210f86-1682409420385/Website%20Development.png",
    subCategories: [
      { name: "Website Development" },
      { name: "Website Maintenance" },
      { name: "WordPress" },
      { name: "Shopify" },
      { name: "Custom Websites" },
    ],
  },
  {
    name: "Application Development",
    image:
      "https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto/v1/attachments/generic_asset/asset/529ea44f10a2aff520b99859d285b968-1682409451031/Application%20Development.png",
    subCategories: [
      { name: "Web Applications" },
      { name: "Desktop Applications" },
      { name: "Game Development" },
      { name: "Chatbot Development" },
      { name: "Browser Extensions" },
    ],
  },
  {
    name: "Software Development",
    image:
      "https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto/v1/attachments/generic_asset/asset/ef81b98de711dd7acf41673de41d9e68-1698847862069/Software%20Development.png",
    subCategories: [
      { name: "Software Development" },
      { name: "AI Development" },
      { name: "APIs & Integrations" },
      { name: "Scripting" },
      { name: "Plugins Development" },
    ],
  },
  {
    name: "Software Development",
    image:
      "https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto/v1/attachments/generic_asset/asset/ef81b98de711dd7acf41673de41d9e68-1698847862069/Software%20Development.png",
    subCategories: [
      { name: "Software Development" },
      { name: "AI Development" },
      { name: "APIs & Integrations" },
      { name: "Scripting" },
      { name: "Plugins Development" },
    ],
  },
  {
    name: "Software Development",
    image:
      "https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto/v1/attachments/generic_asset/asset/ef81b98de711dd7acf41673de41d9e68-1698847862069/Software%20Development.png",
    subCategories: [
      { name: "Software Development" },
      { name: "AI Development" },
      { name: "APIs & Integrations" },
      { name: "Scripting" },
      { name: "Plugins Development" },
    ],
  },
  {
    name: "Software Development",
    image:
      "https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto/v1/attachments/generic_asset/asset/ef81b98de711dd7acf41673de41d9e68-1698847862069/Software%20Development.png",
    subCategories: [
      { name: "Software Development" },
      { name: "AI Development" },
      { name: "APIs & Integrations" },
      { name: "Scripting" },
      { name: "Plugins Development" },
    ],
  },
  {
    name: "Mobile Apps",
    image:
      "https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto/v1/attachments/generic_asset/asset/2e10aef5cce6986a6b9cf898dd6ac29b-1698847839877/Mobile%20Apps.png",
    subCategories: [
      { name: "Mobile App Development" },
      { name: "Cross-platform Apps" },
      { name: "Android App Development" },
      { name: "IOS App Development" },
      { name: "Mobile App Maintenance" },
    ],
  },
  {
    name: "Website Platforms",
    image:
      "https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto/v1/attachments/generic_asset/asset/b0cb91002a72133eba335482257f618c-1682409435227/Website%20Platforms.png",
    subCategories: [
      { name: "E-commerce Platforms" },
      { name: "CMS Platforms" },
      { name: "Blog Platforms" },
      { name: "Portfolio Platforms" },
      { name: "Landing Page Platforms" },
    ],
  },
];

function CategoryGridCard({
  image,
  title,
  open,
  toggleOpen,
  subCategories,
}: {
  image: string;
  title: string;
  open: boolean;
  toggleOpen: () => void;
  subCategories: { name: string }[];
}) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-4 border-gray-200 p-1 sm:rounded-md xs:flex-row xs:items-center xs:border-b">
        <div className="rounded-md xs:h-14 xs:w-20">
          <img
            src={image}
            alt={title}
            className="h-full w-full rounded-md bg-cover"
          />
        </div>
        <span className="text-xl font-semibold text-gray-800">{title}</span>
        <div
          onClick={toggleOpen}
          className="ml-auto hidden cursor-pointer pr-4 xs:block"
        >
          <OpenArrow isOpen={open} />
        </div>
      </div>
      <div className={`flex-col gap-4 sm:px-4 ${open ? "flex" : "hidden"}`}>
        {subCategories.map((subCategory) => {
          return (
            <span
              key={subCategory.name}
              className="cursor-pointer text-lg text-gray-500"
            >
              {subCategory.name}
            </span>
          );
        })}
      </div>
    </div>
  );
}

export default function CategoryGrid() {
  const [openStates, setOpenStates] = useState<boolean[]>([]);

  useEffect(() => {
    const handleResize = () => {
      setOpenStates(categories.map(() => window.innerWidth > 640));
    };
    const debouncedHandleResize = debounce(handleResize, 200);

    // Set initial state based on current screen size
    handleResize();

    // Add event listener
    window.addEventListener("resize", debouncedHandleResize);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("resize", debouncedHandleResize);
    };
  }, []);

  const toggleOpen = (index: number) => {
    setOpenStates((prevOpenStates) =>
      prevOpenStates.map((state, i) => (i === index ? !state : state)),
    );
  };

  return (
    <div className="mx-auto mb-12 max-w-[1450px]">
      <h2 className="mb-6 px-2 text-3xl font-semibold text-gray-800">
        Explore Programming & Tech
      </h2>
      <div className="grid grid-cols-[repeat(4,_minmax(200px,_1fr))] gap-x-0 gap-y-16 p-6 px-2 lg:grid-cols-[repeat(3,_minmax(200px,_1fr))] sm:grid-cols-[repeat(2,_minmax(200px,_1fr))] sm:gap-y-8 xs:grid-cols-[repeat(1,_1fr)]">
        {categories.map((category, index) => {
          return (
            <CategoryGridCard
              key={index}
              image={category.image}
              title={category.name}
              open={openStates[index]}
              toggleOpen={() => toggleOpen(index)}
              subCategories={category.subCategories}
            />
          );
        })}
      </div>
    </div>
  );
}
