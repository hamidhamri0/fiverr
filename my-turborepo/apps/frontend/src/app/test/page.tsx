"use client";
// import { getUser } from "@/lib/auth/getUser";
// import { notFound } from "next/navigation";
// import WelcomeModal from "./components/WelcomeModal";
// import WelcomeContent from "./components/WelcomeContent";
// import HeroBanner from "./components/HeroBanner";

// export const reviews = [
//   {
//     reviewer: {
//       username: "john_doe",
//       image: "/smallImages/data-science.webp",
//       country: "USA",
//     },
//     rating: {
//       "1": 0,
//       "2": 0,
//       "3": 1,
//       "4": 2,
//       "5": 3,
//     },
//     review: "Great product, highly recommend!",
//     duration: "2 weeks",
//     price: 49.99,
//     date: "2021-09-01",
//   },
//   {
//     reviewer: {
//       username: "jane_smith",
//       image: "/smallImages/data-science.webp",
//       country: "Canada",
//     },
//     rating: {
//       "1": 0,
//       "2": 1,
//       "3": 0,
//       "4": 3,
//       "5": 1,
//     },
//     review: "Good value for the price.",
//     duration: "1 month",
//     price: 39.99,
//     date: "2021-09-01",
//   },
//   {
//     reviewer: {
//       username: "alice_jones",
//       image: "/smallImages/data-science.webp",
//       country: "UK",
//     },
//     rating: {
//       "1": 0,
//       "2": 0,
//       "3": 2,
//       "4": 1,
//       "5": 2,
//     },
//     review: "Satisfied with the purchase.",
//     duration: "3 weeks",
//     price: 59.99,
//     date: "2021-02-05",
//   },
//   {
//     reviewer: {
//       username: "bob_brown",
//       image: "/smallImages/data-science.webp",
//       country: "Australia",
//     },
//     rating: {
//       "1": 1,
//       "2": 0,
//       "3": 1,
//       "4": 2,
//       "5": 1,
//     },
//     review: "Average quality, could be better.",
//     duration: "2 months",
//     price: 29.99,
//     date: "2021-07-04",
//   },
//   {
//     reviewer: {
//       username: "charlie_davis",
//       image: "/smallImages/data-science.webp",
//       country: "Germany",
//     },
//     rating: {
//       "1": 0,
//       "2": 0,
//       "3": 0,
//       "4": 4,
//       "5": 1,
//     },
//     review: "Exceeded my expectations!",
//     duration: "1 week",
//     price: 69.99,
//     date: "2021-08-01",
//   },
// ];

// const AspectRatioImage = ({ src, alt, ratio = "16:9" }) => {
//   // Calculate padding percentage based on aspect ratio
//   const getPaddingPercentage = (ratio) => {
//     const [width, height] = ratio.split(":").map(Number);
//     return (height / width) * 100;
//   };

//   const paddingPercentage = getPaddingPercentage(ratio);

//   return (
//     <div className="relative w-full">
//       <img
//         src={src}
//         alt={alt}
//         style={{
//           aspectRatio: "16/9",
//         }}
//         className="h-full w-full object-cover"
//       />
//     </div>
//   );
// };

// export default async function Home() {
//   const user = await getUser();

//   return (
//     <div>
//       {user?.isNew && <WelcomeModal />}
//       {user ? <WelcomeContent /> : <HeroBanner />}
//     </div>
//   );
// }

"use client";

import CategoryBanner from "../components/CategoryBanner";
import GigOverview from "../components/GigOverview";
import GigSlides from "../components/GigSlides";
import HeroBanner from "../components/HeroBanner";
import SavedGigsForYou from "../components/GigsWithTitle";
import SlideShow from "../components/SlideShow";
import VerifiedProServices from "../components/VerifiedProServices";

//bg-[url('/bigImages/ProgrammingBanner.webp')

const reviews = [
  {
    reviewer: {
      username: "john_doe",
      image: "/smallImages/data-science.webp",
      country: "USA",
    },
    rating: {
      "1": 0,
      "2": 0,
      "3": 1,
      "4": 2,
      "5": 3,
    },
    review: "Great product, highly recommend!",
    duration: "2 weeks",
    price: 49.99,
    date: "2021-09-01",
  },
  {
    reviewer: {
      username: "jane_smith",
      image: "/smallImages/data-science.webp",
      country: "Canada",
    },
    rating: {
      "1": 0,
      "2": 1,
      "3": 0,
      "4": 3,
      "5": 1,
    },
    review: "Good value for the price.",
    duration: "1 month",
    price: 39.99,
    date: "2021-09-01",
  },
  {
    reviewer: {
      username: "alice_jones",
      image: "/smallImages/data-science.webp",
      country: "UK",
    },
    rating: {
      "1": 0,
      "2": 0,
      "3": 2,
      "4": 1,
      "5": 2,
    },
    review: "Satisfied with the purchase.",
    duration: "3 weeks",
    price: 59.99,
    date: "2021-02-05",
  },
  {
    reviewer: {
      username: "bob_brown",
      image: "/smallImages/data-science.webp",
      country: "Australia",
    },
    rating: {
      "1": 1,
      "2": 0,
      "3": 1,
      "4": 2,
      "5": 1,
    },
    review: "Average quality, could be better.",
    duration: "2 months",
    price: 29.99,
    date: "2021-07-04",
  },
  {
    reviewer: {
      username: "charlie_davis",
      image: "/smallImages/data-science.webp",
      country: "Germany",
    },
    rating: {
      "1": 0,
      "2": 0,
      "3": 0,
      "4": 4,
      "5": 1,
    },
    review: "Exceeded my expectations!",
    duration: "1 week",
    price: 69.99,
    date: "2021-08-01",
  },
];

export default function Home() {
  return (
    <div className="mx-auto max-w-[1450px] text-[#74767e] dark:bg-gray-800 dark:text-gray-200">
      {/* <MainHeader /> */}
      {/* <GigOverview /> */}
      {/* <SlideShow
        images={[
          "/images/KITCHEN VIEW 02 copy 2.webp",
          "/images/KITCHEN VIEW 02 copy 3.webp",
          "/images/D1.webp",
          "/images/E1.webp",
          "/images/E1.webp",
          "/images/E1.webp",
          "/images/E1.webp",
          "/images/E1.webp",
          "/images/E1.webp",
          "/images/E1.webp",
          "/images/E1.webp",
          "/images/E1.webp",
          "/images/E1.webp",
          "/images/E1.webp",
        ]}
      /> */}
      {/* <ReviewsCarousel /> */}
      {/* <UserProfileCard /> */}
      {/* <Reviews
        allRatings={600}
        eachRating={{
          "1": 150,
          "2": 20,
          "3": 80,
          "4": 50,
          "5": 300,
        }}
        reviews={reviews}
      /> */}
      {/* <RelatedTags /> */}
      {/* <ActionToolbar /> */}
      {/* <PricingPackageCard /> */}
      {/* <PackagesTable /> */}
      {/* <UserProfile /> */}
      {/* <RoundedCategoryCarousel /> */}
      {/* <FiltersComponent /> */}
      {/* <SelectedFilters /> */}
      {/* <SearchResults /> */}
      {/* <CategoryBanner
        className="min-h-[500px] from-green-700 to-green-900 bg-cover bg-no-repeat xl:h-[400px] lg:bg-gradient-to-tl"
        // bgImage="bg-[url('/bigImages/hero.webp')]"
        bgImage="bg-[url('/bigImages/hero.webp')]"
        mobileBgImage="sm:bg-[url('/bigImages/ProgrammingBannerSmall.webp')]"
      >
        <CategoryBannerContent
          category="Programming & Tech"
          description="You think it. A programmer develops it."
        />
        <HeroBanner />
      </CategoryBanner> */}
      {/* <CategoryGrid /> */}
      {/* <DrowDownFAQ /> */}
      {/* <CategoryCarouselCard /> */}
      {/* <CategoriesContainer /> */}
      {/* <Services /> */}
      {/* <ServicesOverview /> */}
      {/* <WelcomeContent /> */}
      {/* <GigSlides /> */}
      <SavedGigsForYou />
      {/* <VerifiedProServices /> */}
      {/* <VerifiedProServices /> */}
      {/* <GalleryLayout /> */}
      {/* <Footer /> */}
    </div>
  );
}