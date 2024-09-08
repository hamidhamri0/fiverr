import WelcomeContent from "./components/WelcomeContent";
import GigSlides from "./components/GigSlides";
import SavedGigsForYou from "./components/SavedGigsForYou";
import VerifiedProServices from "./components/VerifiedProServices";
import GalleryLayout from "./components/GalleryLayout";
import Footer from "./components/Footer";
import Menu from "./components/Menu";
import MainHeader from "./components/MainHeader";
import HeroBanner from "./components/HeroBanner";
import CategoriesContainer from "./components/CategoriesContainer";
import Services from "./components/Services";
import ServicesOverview from "./components/ServicesOverview";
import CategoryBanner, {
  CategoryBannerContent,
} from "./components/CategoryBanner";
import CategoryCarouselCard from "./components/CategoryCarousel";
import CategoryGrid from "./components/CategoryGrid";
import DrowDownFAQ from "./components/DrowDownFAQ";
import { FaSearch } from "react-icons/fa";
import Meta from "./components/smallComponents/Icons/Meta";
import Google from "./components/smallComponents/Icons/Google";
import Netflix from "./components/smallComponents/Icons/Netflix";
import Pg from "./components/smallComponents/Icons/Pg";
import Payoneer from "./components/smallComponents/Icons/Payoneer";
import RoundedCategoryCarousel from "./components/RoundedCategoryCarousel";
import FiltersComponent from "./components/FiltersComponent";
import SelectedFilters from "./components/SelectedFilters";
import SearchResults from "./components/SearchResults";
import GigOverview from "./components/GigOverview";
import SlideShow from "./components/SlideShow";
import ReviewsCarousel from "./components/ReviewsCarousel";
import UserProfileCard from "./components/UserProfileCard";
import Reviews from "./components/Reviews";
import RelatedTags from "./components/smallComponents/RelatedTags";
import ActionToolbar from "./components/ActionToolbar";
import PricingPackageCard from "./components/PricingPackageCard";
import PackagesTable from "./components/PackagesTable";
import UserProfile from "./components/UserProfile";
import LoginCard from "./components/LoginCard";
import GigCreationPage from "./components/GigCreationPage";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import ProfilePage from "./components/ProfilePage";
import { create } from "domain";
import {
  createStateStore,
  initCounterStore,
  State,
  StateStore,
} from "./components/zustand";
import { useStore } from "zustand";
import UserInfoStoreProvider from "./components/stores/UserInfoStore";

//bg-[url('/bigImages/ProgrammingBanner.webp')

export const reviews = [
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

// function Test() {
//   return (
//     <div className="mx-auto grid max-w-[1450px] grid-cols-4 gap-4 p-4">
//       {[1, 2, 3, 4].map((_, index) => (
//         <div key={index} className="flex flex-col">
//           <div className="mb-2 max-w-[200px] overflow-hidden rounded-md">
//             <img
//               src="/images/KITCHEN VIEW 02 copy 2.webp"
//               alt="Description of the image"
//               className="block max-h-full max-w-full object-cover"
//             />
//           </div>
//           <div>
//             <h2 className="p-2 font-semibold">@hamidharmi</h2>
//           </div>
//         </div>
//       ))}
//     </div>
// <div className="mx-auto mt-8 grid w-full max-w-[1450px] grid-cols-4 gap-6 p-5">
//   <div className="grid grid-cols-4">
//     <AspectRatioImage
//       src="/images/KITCHEN VIEW 02 copy 2.webp"
//       alt="Description of the image"
//       ratio="16:9"
//     />
//     <AspectRatioImage
//       src="/images/KITCHEN VIEW 02 copy 2.webp"
//       alt="Description of the image"
//       ratio="16:9"
//     />
//     <AspectRatioImage
//       src="/images/KITCHEN VIEW 02 copy 2.webp"
//       alt="Description of the image"
//       ratio="16:9"
//     />
//   </div>
// {
/* <AspectRatioImage
        src="/images/KITCHEN VIEW 02 copy 2.webp"
        alt="Description of the image"
        ratio="16:9"
      />
      <AspectRatioImage
        src="/images/KITCHEN VIEW 02 copy 2.webp"
        alt="Description of the image"
        ratio="16:9"
      />
      <AspectRatioImage
        src="/images/KITCHEN VIEW 02 copy 2.webp"
        alt="Description of the image"
        ratio="16:9"
      /> */
// }
// </div>
//   );
// }

// export const StateStoreContext = createContext<StateStoreApi | undefined>(
//   undefined,
// );
// export type StateStoreApi = ReturnType<typeof createStateStore>;

// const contextAPI = createContext(null);

// const Provider = ({ children }: { children: React.ReactNode }) => {
//   const storeRef = useRef<StateStoreApi>();
//   if (!storeRef.current) {
//     storeRef.current = createStateStore(initCounterStore());
//   }

//   return (
//     <StateStoreContext.Provider value={storeRef.current}>
//       {children}
//     </StateStoreContext.Provider>
//   );
// };

// const useCounterStore = <T,>(selector: (store: StateStore) => T): T => {
//   const StaterStoreContext = useContext(StateStoreContext);

//   if (!StaterStoreContext) {
//     throw new Error(`useCounterStore must be used within CounterStoreProvider`);
//   }

//   return useStore(StaterStoreContext, selector);
// };

// function GetUsers() {
//   const users = useCounterStore((state) => state.users);
//   const setUsers = useCounterStore((state) => state.setUsers);
//   function getUsers() {
//     fetch("http://localhost:3001/user/getAllUsers", {
//       credentials: "include",
//     })
//       .then((res) => res.json())
//       .then((data) => setUsers(data));
//   }
//   console.log("GetUsers ", "rendering..");

//   return (
//     <div>
//       <h1>Users</h1>
//       {users.length > 0 && (
//         <ul>
//           {users.map((user) => (
//             <li key={user?.id}>{user?.name}</li>
//           ))}
//         </ul>
//       )}
//       <button onClick={getUsers}>Get Users</button>
//     </div>
//   );
// }

// function Test() {
//   const email = useCounterStore((state) => state.email);
//   const setEmail = useCounterStore((state) => state.setEmail);
//   console.log("Test ", "rendering..");

//   return (
//     <div>
//       <p>{email}</p>
//       <input
//         className="bg-gray-500"
//         type="text"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//       />
//     </div>
//   );
// }
// function Test2() {
//   const username = useCounterStore((state) => state.username);
//   console.log("Test2 ", "rendering..");
//   return (
//     <div>
//       <p>{username}</p>
//     </div>
//   );
// }
import { cookies } from "next/headers";
import AdminPage from "./components/AdminPage";
import GigOverviewCreation from "./components/GigOverviewManager";

export default async function Home() {
  //access cookies in nextjs server component
  const cookieStore = cookies();
  const sessionCookie = cookieStore.get("connect.sid");
  let userSession = null;
  if (sessionCookie) {
    try {
      userSession = await (
        await fetch("http://localhost:3001/auth/session", {
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Cookie: `connect.sid=${sessionCookie.value}`,
          },
        })
      ).json();
      if (userSession?.error) userSession = null;
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div className="text-[#74767e] dark:bg-gray-800 dark:text-gray-200">
      <UserInfoStoreProvider initialState={{ user: userSession }}>
        <MainHeader />
      </UserInfoStoreProvider>
      {/* <AdminPage /> */}
      <GigCreationPage />
      {/* <Provider>
        <GetUsers />
        <Test />
        // <Test2 />
      </Provider> */}
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
      {/* <ProfilePage /> */}
      {/* <LoginCard isModal={false} /> */}
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
      {/* <Test /> */}
      {/* <SearchResults /> */}
      {/* <CategoryBanner
        // className="min-h-[500px] from-green-700 to-green-900 bg-cover bg-no-repeat xl:h-[400px] lg:bg-gradient-to-tl"
        // bgImage="bg-[url('/bigImages/hero.webp')]"
        bgImage="bg-[url('/bigImages/ProgrammingBanner.webp')]"
        mobileBgImage="sm:bg-[url('/bigImages/ProgrammingBannerSmall.webp')]"
      >
        <CategoryBannerContent
          category="Programming & Tech"
          description="You think it. A programmer develops it."
        /> */}
      {/* <HeroBanner /> */}
      {/* </CategoryBanner> */}
      {/* <CategoryGrid /> */}
      {/* <DrowDownFAQ /> */}
      {/* <CategoryCarouselCard /> */}
      {/* <CategoriesContainer /> */}
      {/* <Services /> */}
      {/* <ServicesOverview /> */}
      {/* <WelcomeContent /> */}
      {/* <GigSlides /> */}
      {/* <SavedGigsForYou /> */}
      {/* <VerifiedProServices /> */}
      {/* <GalleryLayout /> */}
      {/* <LoginCard isModal={false} /> */}
      {/* <Footer /> */}
    </div>
  );
}
