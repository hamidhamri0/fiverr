import React from "react";
import { Gigs } from "./GigSlides";
import GridSlider from "./GridSlider";

export default function SavedGigsForYou() {
  return (
    <GridSlider>
      <GridSlider.Container>
        <p className="px-4 text-2xl font-bold text-gray-900">
          Because you saved{" "}
          <span className="text-blue-500">
            create a professional minimalist business logo design
          </span>
        </p>
        <GridSlider.Grid>
          <Gigs maxLength={10} />
        </GridSlider.Grid>
        <GridSlider.SlidersArrows />
      </GridSlider.Container>
    </GridSlider>
  );
}
