import React, { Suspense } from "react";
import { getUser } from "@/lib/auth/getUser";
import WelcomeModal from "../Components/Organisms/WelcomeModal";
import HeroBanner from "../Components/Organisms/HeroBanner";
import CategoryBanner from "../Components/CategoryBanner";
import Services from "../Components/Organisms/Services";
import ServicesOverview from "../Components/Organisms/ServicesOverview";
import CategoriesContainer from "../Components/Organisms/CategoryBoxContainer";
import GigsWithTitleServer from "../Components/Organisms/GigsWithTitleServer";
import GigSlidesServer from "../Components/Organisms/GigSlidesServer";
import GigList from "../Components/Organisms/GigsSkeleton";
import GigsWithPro from "@/Components/Organisms/GigsWithProServer";
import WelcomeContent from "../Components/Organisms/WelcomeContent";
import GalleryLayout from "../Components/Organisms/GalleryLayout";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function Home() {
  const user = await getUser();

  return (
    <>
      {user?.isNew && <WelcomeModal />}
      {user ? (
        <>
          <Suspense fallback={<p>...loading</p>}>
            <WelcomeContent name={user.username} />
          </Suspense>
          <div className="mx-auto max-w-[1450px] px-6">
            <Suspense fallback={<GigList numberOfGigs={5} />}>
              <GigSlidesServer />
            </Suspense>
            <Suspense fallback={<GigList numberOfGigs={5} />}>
              <GigsWithTitleServer />
            </Suspense>
            <Suspense fallback={<GigList numberOfGigs={5} />}>
              <GigsWithPro />
            </Suspense>
            {/* <GalleryLayout /> */}
          </div>
        </>
      ) : (
        <div className="mx-auto max-w-[1450px]">
          <CategoryBanner
            className="min-h-[500px] from-green-700 to-green-900 bg-cover bg-no-repeat xl:h-[400px] lg:bg-gradient-to-tl"
            bgImage="bg-[url('/bigImages/hero.webp')]"
          >
            <HeroBanner />
          </CategoryBanner>
          <CategoriesContainer />
          <Services />
          <ServicesOverview />
        </div>
      )}
    </>
  );
}
