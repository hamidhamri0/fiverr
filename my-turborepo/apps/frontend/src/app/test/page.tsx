// "use client";
// import {} from "@shared/src";
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

import CategoryBanner from "../../Components/CategoryBanner";
import GigOverview from "../../Components/GigOverview";
import GigSlides from "../../Components/GigSlides";
import HeroBanner from "../../Components/HeroBanner";
import SlideShow from "../../Components/SlideShow";
import VerifiedProServices from "../../Components/VerifiedProServices";
import ReviewsCarousel from "../../Components/Organisms/ReviewsCarousel";
import CarousalGigs from "./CarousalGigs";
import RelatedTags from "../../Components/Molecules/RelatedTags";
import ActionToolbar from "../../Components/ActionToolbar";
import PricingPackageCard from "../../Components/Organisms/PricingPackageCard";
import PackagesTable from "../../Components/Organisms/PackagesTable";
import UserProfile from "../../Components/UserProfile";
import RoundedCategoryCarousel from "../../Components/RoundedCategoryCarousel";
import SelectedFilters from "../../Components/SelectedFilters";
import SearchResults from "../../Components/Organisms/SearchResults";
import GalleryLayout from "../../Components/Organisms/GalleryLayout";
import UserCard, {
  UserCardImage,
  UserCardLanguages,
  UserCardLevelRatingCard,
  UserCardLocation,
  UserCardName,
  UserCardOnlineStatus,
  UserCardProTag,
  UserCardRatingBox,
  UserCardRatingStarsCard,
  UserCardUsername,
} from "../../Components/Organisms/UserCard";
import WelcomeModal from "../../Components/WelcomeModal";

export default async function Home() {
  const images = await fetch("http://localhost:3000/api/images");
  const initialImages = (await images.json()).sort(() => Math.random() - 0.5);
  return (
    <div className="mx-auto max-w-[1450px] text-[#74767e] dark:bg-gray-800 dark:text-gray-200">
      {/* <>
        <UserCard
          imageClassName="h-36 w-36"
          Image={<UserCardImage />}
          Name={<UserCardName className="text-2xl" />}
          RatingBox={<UserCardRatingBox />}
          Username={<UserCardUsername />}
          ProTag={<UserCardProTag />}
          Languages={<UserCardLanguages />}
          Location={<UserCardLocation />}
          LevelRatingCard={<UserCardLevelRatingCard />}
          OnlineStatus={<UserCardOnlineStatus />}
          ProCard={<UserCardProTag />}
          RatingStarsCard={<UserCardRatingStarsCard />}
        />
      </> */}
      {/* <CarousalGigs gigs={gigs} /> */}
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
      {/* <WelcomeModal /> */}
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
      {/* <SearchResults /> when we search on input about gig , this page comes */}
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
      {/* <GigsWithTitle /> */}
      {/* <VerifiedProServices /> */}
      {/* <VerifiedProServices /> */}
      {/* <GalleryLayout initialImages={initialImages} /> */}
      {/* <Footer /> */}
    </div>
  );
}

var gigs = [
  {
    id: "0430f0fb-1480-4e4f-b09d-6e51566a4772",
    title: "I will do something I'm really good at",
    aboutGig: {
      type: "doc",
      content: [
        {
          type: "paragraph",
          content: [
            {
              text: "how are you doing sir :",
              type: "text",
            },
          ],
        },
        {
          type: "orderedList",
          attrs: {
            start: 1,
          },
          content: [
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [
                    {
                      text: "im good",
                      type: "text",
                    },
                  ],
                },
              ],
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [
                    {
                      text: "im hungry",
                      type: "text",
                    },
                  ],
                },
              ],
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [
                    {
                      text: "im mad",
                      type: "text",
                    },
                  ],
                },
              ],
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [
                    {
                      text: "im bad ",
                      type: "text",
                    },
                  ],
                },
              ],
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [
                    {
                      text: "im popo",
                      type: "text",
                    },
                  ],
                },
              ],
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [
                    {
                      text: "im techa",
                      type: "text",
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          type: "paragraph",
          content: [
            {
              text: "as i said everything is good baby girl",
              type: "text",
              marks: [
                {
                  type: "bold",
                },
                {
                  type: "italic",
                },
              ],
            },
          ],
        },
        {
          type: "paragraph",
          content: [
            {
              text: "yes sirrrrrrrrrrrrrrrrrrrrrrrrrrr",
              type: "text",
              marks: [
                {
                  type: "italic",
                },
                {
                  type: "highlight",
                },
              ],
            },
          ],
        },
        {
          type: "paragraph",
        },
        {
          type: "paragraph",
        },
      ],
    },
    isPublished: true,
    step: "7",
    imageUrls: [
      "https://res.cloudinary.com/dnnaq2dbk/image/upload/f_auto,q_auto/c_fill,g_auto,h_1200,w_1200/11691059816?_a=BAMAH2M20",
      "https://res.cloudinary.com/dnnaq2dbk/image/upload/f_auto,q_auto/c_fill,g_auto,h_1200,w_1200/yogeshnegi07?_a=BAMAH2M20",
    ],
    videoUrl: {
      videoUrl:
        "https://res.cloudinary.com/dnnaq2dbk/image/upload/c_limit,w_1280/3C5SGOODANIMATIONVIDEO?_a=BAMAH2M20",
      thumbnail:
        "https://res.cloudinary.com/dnnaq2dbk/video/upload/c_thumb,g_auto,h_300,w_300/so_auto/3C5SGOODANIMATIONVIDEO.webp?_a=BAMAH2M20",
    },
    pdfUrls: [
      "https://res.cloudinary.com/dnnaq2dbk/image/upload/CIVILEXAM22022.pdf?_a=BAMAH2M20",
    ],
    clicks: "0",
    impressions: "0",
    orders: "0",
    cancellations: "0",
    status: "draft",
    totalReviews: "2",
    averageRating: "3.6",
    createdAt: "2024-10-02T14:04:37.203Z",
    updatedAt: "2024-10-04T11:13:31.905Z",
    reviews: [
      {
        id: "ccb8a999-a10f-42e0-b415-6aea9bf79dd4",
        rating: "3",
        review: "this is good",
        createdAt: "2024-10-02T17:21:21.984Z",
        updatedAt: "2024-10-02T17:21:21.984Z",
      },
      {
        id: "f669e722-26ac-4849-a0ea-9bcbf64731cc",
        rating: "4.2",
        review: "this is good",
        createdAt: "2024-10-02T18:40:52.304Z",
        updatedAt: "2024-10-02T18:40:52.304Z",
      },
    ],
    user: {
      id: "965c4b07-d3aa-4525-97e0-1a920d832915",
      name: "Taleb Abdelhamid",
      bio: null,
      email: "hamid.mrid@gmail.com",
      password: null,
      country: null,
      userRating: "0",
      phoneNumber: "+213791501815",
      emailVerificationCode: null,
      isVerifiedPhoneNumber: true,
      isVerifiedEmail: false,
      username: "hamidhamri",
      description: "im web dev that is tryin to find a job",
      picture:
        "https://lh3.googleusercontent.com/a/ACg8ocIJKviM6tTrwGdZcBarrwY6TgUteGDkRMAwjVrlDVajFS-gBaY=s96-c",
      isNew: false,
      googleId: "115053769468963373092",
      appleId: null,
      facebookId: null,
      pro: false,
      lastVisitedGigs: [],
      preferredStartDay: 1,
      skills: [],
      preferredEndDay: 1,
      preferredStartTime: "08:00:00",
      preferredEndTime: "05:00:00",
      timezone: "Africa/Algiers",
      createdAt: "2024-10-02T14:01:11.918Z",
      updatedAt: "2024-10-02T14:20:08.121Z",
    },
    category: {
      id: 1,
      name: "Technology & Programming",
    },
  },
  {
    id: "5cea2450-1855-4cb2-bf49-d2cb9c2cc590",
    title: "SVELTE MASTER CLASS 2.0",
    aboutGig: {
      type: "doc",
      content: [
        {
          type: "paragraph",
          content: [
            {
              text: "how are you doing sir :",
              type: "text",
            },
          ],
        },
        {
          type: "orderedList",
          attrs: {
            start: 1,
          },
          content: [
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [
                    {
                      text: "im good",
                      type: "text",
                    },
                  ],
                },
              ],
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [
                    {
                      text: "im hungry",
                      type: "text",
                    },
                  ],
                },
              ],
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [
                    {
                      text: "im mad",
                      type: "text",
                    },
                  ],
                },
              ],
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [
                    {
                      text: "im bad ",
                      type: "text",
                    },
                  ],
                },
              ],
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [
                    {
                      text: "im popo",
                      type: "text",
                    },
                  ],
                },
              ],
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [
                    {
                      text: "im techa",
                      type: "text",
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          type: "paragraph",
          content: [
            {
              text: "as i said everything is good baby girl",
              type: "text",
              marks: [
                {
                  type: "bold",
                },
                {
                  type: "italic",
                },
              ],
            },
          ],
        },
        {
          type: "paragraph",
          content: [
            {
              text: "yes sirrrrrrrrrrrrrrrrrrrrrrrrrrr",
              type: "text",
              marks: [
                {
                  type: "italic",
                },
                {
                  type: "highlight",
                },
              ],
            },
          ],
        },
        {
          type: "paragraph",
        },
        {
          type: "paragraph",
        },
      ],
    },
    isPublished: true,
    step: "7",
    imageUrls: [
      "https://res.cloudinary.com/dnnaq2dbk/image/upload/f_auto,q_auto/c_fill,g_auto,h_1200,w_1200/image?_a=BAMAH2M20",
    ],
    videoUrl: {},
    pdfUrls: [],
    clicks: "0",
    impressions: "0",
    orders: "0",
    cancellations: "0",
    status: "draft",
    totalReviews: "0",
    averageRating: "0",
    createdAt: "2024-10-04T11:19:35.108Z",
    updatedAt: "2024-10-04T11:27:41.807Z",
    reviews: [],
    user: {
      id: "965c4b07-d3aa-4525-97e0-1a920d832915",
      name: "Taleb Abdelhamid",
      bio: null,
      email: "hamid.mrid@gmail.com",
      password: null,
      country: null,
      userRating: "0",
      phoneNumber: "+213791501815",
      emailVerificationCode: null,
      isVerifiedPhoneNumber: true,
      isVerifiedEmail: false,
      username: "hamidhamri",
      description: "im web dev that is tryin to find a job",
      picture:
        "https://lh3.googleusercontent.com/a/ACg8ocIJKviM6tTrwGdZcBarrwY6TgUteGDkRMAwjVrlDVajFS-gBaY=s96-c",
      isNew: false,
      googleId: "115053769468963373092",
      appleId: null,
      facebookId: null,
      pro: false,
      lastVisitedGigs: [],
      preferredStartDay: 1,
      skills: [],
      preferredEndDay: 1,
      preferredStartTime: "08:00:00",
      preferredEndTime: "05:00:00",
      timezone: "Africa/Algiers",
      createdAt: "2024-10-02T14:01:11.918Z",
      updatedAt: "2024-10-02T14:20:08.121Z",
    },
    category: {
      id: 1,
      name: "Technology & Programming",
    },
  },
  {
    id: "59eb269d-aa88-4f63-a888-fd8802da8763",
    title: "i will 3d model that shit",
    aboutGig: {
      type: "doc",
      content: [
        {
          type: "paragraph",
          content: [
            {
              text: "how are you doing sir :",
              type: "text",
            },
          ],
        },
        {
          type: "orderedList",
          attrs: {
            start: 1,
          },
          content: [
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [
                    {
                      text: "im good",
                      type: "text",
                    },
                  ],
                },
              ],
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [
                    {
                      text: "im hungry",
                      type: "text",
                    },
                  ],
                },
              ],
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [
                    {
                      text: "im mad",
                      type: "text",
                    },
                  ],
                },
              ],
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [
                    {
                      text: "im bad ",
                      type: "text",
                    },
                  ],
                },
              ],
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [
                    {
                      text: "im popo",
                      type: "text",
                    },
                  ],
                },
              ],
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [
                    {
                      text: "im techa",
                      type: "text",
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          type: "paragraph",
          content: [
            {
              text: "as i said everything is good baby girl",
              type: "text",
              marks: [
                {
                  type: "bold",
                },
                {
                  type: "italic",
                },
              ],
            },
          ],
        },
        {
          type: "paragraph",
          content: [
            {
              text: "yes sirrrrrrrrrrrrrrrrrrrrrrrrrrr",
              type: "text",
              marks: [
                {
                  type: "italic",
                },
                {
                  type: "highlight",
                },
              ],
            },
          ],
        },
        {
          type: "paragraph",
        },
        {
          type: "paragraph",
        },
      ],
    },
    isPublished: true,
    step: "7",
    imageUrls: [
      "https://res.cloudinary.com/dnnaq2dbk/image/upload/f_auto,q_auto/c_fill,g_auto,h_1200,w_1200/four?_a=BAMAH2M20",
    ],
    videoUrl: {},
    pdfUrls: [],
    clicks: "0",
    impressions: "0",
    orders: "0",
    cancellations: "0",
    status: "draft",
    totalReviews: "0",
    averageRating: "0",
    createdAt: "2024-10-04T11:29:14.436Z",
    updatedAt: "2024-10-04T13:23:27.005Z",
    reviews: [],
    user: {
      id: "965c4b07-d3aa-4525-97e0-1a920d832915",
      name: "Taleb Abdelhamid",
      bio: null,
      email: "hamid.mrid@gmail.com",
      password: null,
      country: null,
      userRating: "0",
      phoneNumber: "+213791501815",
      emailVerificationCode: null,
      isVerifiedPhoneNumber: true,
      isVerifiedEmail: false,
      username: "hamidhamri",
      description: "im web dev that is tryin to find a job",
      picture:
        "https://lh3.googleusercontent.com/a/ACg8ocIJKviM6tTrwGdZcBarrwY6TgUteGDkRMAwjVrlDVajFS-gBaY=s96-c",
      isNew: false,
      googleId: "115053769468963373092",
      appleId: null,
      facebookId: null,
      pro: false,
      lastVisitedGigs: [],
      preferredStartDay: 1,
      skills: [],
      preferredEndDay: 1,
      preferredStartTime: "08:00:00",
      preferredEndTime: "05:00:00",
      timezone: "Africa/Algiers",
      createdAt: "2024-10-02T14:01:11.918Z",
      updatedAt: "2024-10-02T14:20:08.121Z",
    },
    category: {
      id: 2,
      name: "Design & Creative",
    },
  },
  {
    id: "63c2a4f9-36c1-4dd5-83d5-c5fbf34e32e4",
    title: "I will translate that shir for you",
    aboutGig: {
      type: "doc",
      content: [
        {
          type: "paragraph",
          content: [
            {
              text: "how are you doing sir :",
              type: "text",
            },
          ],
        },
        {
          type: "orderedList",
          attrs: {
            start: 1,
          },
          content: [
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [
                    {
                      text: "im good",
                      type: "text",
                    },
                  ],
                },
              ],
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [
                    {
                      text: "im hungry",
                      type: "text",
                    },
                  ],
                },
              ],
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [
                    {
                      text: "im mad",
                      type: "text",
                    },
                  ],
                },
              ],
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [
                    {
                      text: "im bad ",
                      type: "text",
                    },
                  ],
                },
              ],
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [
                    {
                      text: "im popo",
                      type: "text",
                    },
                  ],
                },
              ],
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [
                    {
                      text: "im techa",
                      type: "text",
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          type: "paragraph",
          content: [
            {
              text: "as i said everything is good baby girl",
              type: "text",
              marks: [
                {
                  type: "bold",
                },
                {
                  type: "italic",
                },
              ],
            },
          ],
        },
        {
          type: "paragraph",
          content: [
            {
              text: "yes sirrrrrrrrrrrrrrrrrrrrrrrrrrr",
              type: "text",
              marks: [
                {
                  type: "italic",
                },
                {
                  type: "highlight",
                },
              ],
            },
          ],
        },
        {
          type: "paragraph",
        },
        {
          type: "paragraph",
        },
      ],
    },
    isPublished: true,
    step: "7",
    imageUrls: [
      "https://res.cloudinary.com/dnnaq2dbk/image/upload/f_auto,q_auto/c_fill,g_auto,h_1200,w_1200/three?_a=BAMAH2M20",
    ],
    videoUrl: {
      videoUrl:
        "https://res.cloudinary.com/dnnaq2dbk/image/upload/c_limit,w_1280/3C5SGOODANIMATIONVIDEO?_a=BAMAH2M20",
      thumbnail:
        "https://res.cloudinary.com/dnnaq2dbk/video/upload/c_thumb,g_auto,h_300,w_300/so_auto/3C5SGOODANIMATIONVIDEO.webp?_a=BAMAH2M20",
    },
    pdfUrls: [],
    clicks: "0",
    impressions: "0",
    orders: "0",
    cancellations: "0",
    status: "draft",
    totalReviews: "0",
    averageRating: "0",
    createdAt: "2024-10-04T13:32:03.490Z",
    updatedAt: "2024-10-04T13:35:18.410Z",
    reviews: [],
    user: {
      id: "965c4b07-d3aa-4525-97e0-1a920d832915",
      name: "Taleb Abdelhamid",
      bio: null,
      email: "hamid.mrid@gmail.com",
      password: null,
      country: null,
      userRating: "0",
      phoneNumber: "+213791501815",
      emailVerificationCode: null,
      isVerifiedPhoneNumber: true,
      isVerifiedEmail: false,
      username: "hamidhamri",
      description: "im web dev that is tryin to find a job",
      picture:
        "https://lh3.googleusercontent.com/a/ACg8ocIJKviM6tTrwGdZcBarrwY6TgUteGDkRMAwjVrlDVajFS-gBaY=s96-c",
      isNew: false,
      googleId: "115053769468963373092",
      appleId: null,
      facebookId: null,
      pro: false,
      lastVisitedGigs: [],
      preferredStartDay: 1,
      skills: [],
      preferredEndDay: 1,
      preferredStartTime: "08:00:00",
      preferredEndTime: "05:00:00",
      timezone: "Africa/Algiers",
      createdAt: "2024-10-02T14:01:11.918Z",
      updatedAt: "2024-10-02T14:20:08.121Z",
    },
    category: {
      id: 3,
      name: "Writing & Translation",
    },
  },
];

gigs = [...gigs, ...gigs, ...gigs];
