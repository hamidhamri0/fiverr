import React from "react";
import { getCategoryWithSubCategoryGroups } from "@/lib/cateogry";
import CategoryBanner, {
  CategoryBannerContent,
} from "@/Components/CategoryBanner";
import HeroBanner from "@/Components/HeroBanner";
import CategoryGrid from "@/Components/Organisms/SubcategoriesGrid";
import CategoryCarousel from "@/Components/Organisms/ServicesCardCarousel";

export default async function page({
  params,
}: {
  params: {
    category: string;
  };
}) {
  const slug = decodeURIComponent(params.category);
  const category = await getCategoryWithSubCategoryGroups(slug);
  return (
    <div className="mx-auto max-w-[1450px] p-6 px-2">
      {/* <CategoryBanner
        className="min-h-[500px] from-green-700 to-green-900 bg-cover bg-no-repeat xl:h-[400px] lg:bg-gradient-to-tl"
=        bgImage={category?.image}
        mobileBgImage="sm:bg-[url('/bigImages/ProgrammingBannerSmall.webp')]"
      >
        <CategoryBannerContent
          category="Programming & Tech"
          description="You think it. A programmer develops it."
        />
        <HeroBanner />
      </CategoryBanner> */}
      <CategoryCarousel />
      <CategoryGrid category={category} />
    </div>
  );
}
