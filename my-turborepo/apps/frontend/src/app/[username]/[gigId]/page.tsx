import React from "react";

import { PricingPackageCardContainer } from "@/Components/Organisms/PricingPackageCardContainer";
import DropDownFAQ from "@/Components/Organisms/DropDownFAQ";
import PackagesTable from "@/Components/Organisms/PackagesTable";
import { ReviewCard, ReviewsProgressBar } from "@/Components/Reviews";
import ReviewsCarousel from "@/Components/Organisms/ReviewsCarousel";
import SlideShow from "@/Components/SlideShow";
import UserProfileCard from "@/Components/Organisms/UserProfileCard";
import UserCard, {
  UserCardImage,
  UserCardLevelRatingCard,
  UserCardName,
  UserCardProCard,
  UserCardProTag,
  UserCardRatingBox,
} from "@/Components/Organisms/UserCard";
import { getOneGig } from "@/lib/gig/getGig";
import { UserLanguage } from "types/user-language";
import { AboutGig } from "@/Components/Molecules/AboutGig";
import RelatedTags from "@/Components/Molecules/RelatedTags";
import PaginationReviews from "@/Components/PaginationReviews";
import { Home } from "lucide-react";
import Link from "next/link";
import { getGigReviews } from "@/lib/gigReviews";

export default async function page({
  params: { gigId },
}: {
  params: {
    gigId: string;
  };
}) {
  const [gig, reviews] = await Promise.all([
    getOneGig(gigId, [
      "user",
      "category",
      "subcategory",
      "service",
      "packages",
      "packageFeatures",
      "metadata",
      "metadataTags",
      "faqs",
      "tags",
      "questions",
      "reviews",
      "userRating",
      "reviewsChart",
    ]),
    getGigReviews(gigId, 1),
  ]);

  const userCardData = {
    picture: gig?.user?.picture,
    name: gig?.user?.name || "",
    username: gig?.user?.username,
    userRating: gig?.user?.userRating,
    level: gig?.user?.level,
    pro: gig?.user?.pro,
    country: gig?.user?.country,
    bio: gig?.user?.bio || "",
    languages:
      gig?.user?.languages?.map((lang: UserLanguage) => lang.language) || [],
    userTotalReviews: gig?.user?.userTotalReviews,
    userSince: gig?.user?.createdAt,
  };
  return (
    <div className="mx-auto grid max-w-[1450px] grid-cols-12 p-12">
      <div className="col-span-8 mr-36 xl:mr-16 lg:col-span-12">
        <div className="mb-4">
          <div className="mb-12 flex items-center gap-3 px-2 text-sm text-gray-900">
            <Home width={16} height={16} />
            <Link href={`/categories/${gig?.category?.slug}`}>
              <p className="hover:underline">{gig.category?.name} /</p>
            </Link>
            <Link
              href={`/categories/${gig?.category?.slug}/${gig?.subcategory?.slug}`}
            >
              <p className="hover:underline">{gig.subcategory?.name} /</p>
            </Link>
            <Link
              href={`/categories/${gig?.category?.slug}/${gig?.subcategory?.slug}/${gig?.service?.slug}`}
            >
              <p className="hover:underline">{gig.service?.name}</p>
            </Link>
          </div>
          <h1 className="text-3xl font-bold text-gray-600">{gig?.title}</h1>
        </div>
        <UserCard
          userCardData={userCardData}
          imageClassName="h-16 w-16 aspect-square"
          Image={<UserCardImage />}
          Name={<UserCardName />}
          RatingBox={<UserCardRatingBox />}
          ProTag={<UserCardProTag size={20} />}
          ProCard={<UserCardProCard />}
          LevelRatingCard={<UserCardLevelRatingCard />}
        />
        <SlideShow images={gig.imageUrls} />
        <ReviewsCarousel reviews={gig?.reviews} />
        <UserProfileCard userCardData={userCardData} />
        <AboutGig aboutGig={gig?.aboutGig} />
        <PricingPackageCardContainer
          className="static hidden lg:block"
          packages={gig.packages}
        />
        <div className="mb-20">
          <h3 className="mb-8 text-xl font-bold text-gray-700">
            Compare packages
          </h3>
          <PackagesTable className="lg:hidden" packages={gig.packages} />
        </div>
        <DropDownFAQ faq={gig?.faqs} />
        <ReviewsProgressBar
          totalReviews={gig?.totalReviews}
          averageRating={gig?.averageRating}
          reviewsChart={gig?.reviewsChart}
        />
        <PaginationReviews
          initialReviews={reviews?.reviews || []}
          next={reviews?.next}
          gigId={gigId}
          offset={reviews?.offset}
        />

        <RelatedTags tags={gig?.tags || []} />
      </div>
      <PricingPackageCardContainer
        className="lg:hidden"
        packages={gig.packages}
      />
    </div>
  );
}
