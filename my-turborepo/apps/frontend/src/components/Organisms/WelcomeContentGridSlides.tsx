"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselSliders,
} from "@/Components/Organisms/Carousal";
import RecommendedBox from "@/Components/Molecules/RecommendedBox";
import { LuHeart } from "react-icons/lu";

export default function WelcomeContentGridSlides() {
  return (
    <Carousel>
      <CarouselSliders className="mb-1 ml-auto" />
      <CarouselContent>
        {[1, 2, 3].map((el) => {
          return (
            <CarouselItem className="w-1/2 flex-grow lg:w-full" key={el}>
              <RecommendedBox
                titles={{
                  h3: "recommended for you",
                  h4: "Get matched with freelancers",
                  h5: "Create a brief and get custom offers.",
                  buttonAction: "Create a brief",
                }}
              >
                <LuHeart />
              </RecommendedBox>
            </CarouselItem>
          );
        })}
      </CarouselContent>
    </Carousel>
  );
}
