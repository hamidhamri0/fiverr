import React, { Fragment } from "react";
import GridSlider from "./GridSlider";
import { Gigs } from "./GigSlides";
import Gig from "./Gig";
import { getUser } from "@/lib/auth/getUser";
import { getAllGigs } from "@/lib/gig/getAllGigs";

export default async function GigsWithTitle({
  children,
}: {
  children?: React.ReactNode;
}) {
  const gigs = await getAllGigs();
  return (
    <Fragment>
      <GridSlider>
        <GridSlider.Container className="mb-12">
          {children}
          <GridSlider.Grid>
            <Gigs
              items={gigs}
              render={(item, index) => (
                <Gig
                  className="min-w-[calc((100%-4*1.25rem)/5)] xl:min-w-[calc((100%-3*1.25rem)/4)] lg:min-w-[calc((100%-2*1.25rem)/3)] md:min-w-[calc((100%-1*1.25rem)/2)] xs:min-w-full"
                  key={index}
                  profileImage={item.imageUrls[0]}
                  gigImages={item.imageUrls}
                  username={"Abdul Rehman"}
                  description={
                    "I will do professional modern minimalist business logo design"
                  }
                  hasVideo={true}
                  pro={Boolean(index % 2)}
                  rating={4.8}
                  startingPrice={100}
                />
              )}
            />
          </GridSlider.Grid>
          <GridSlider.SlidersArrows />
        </GridSlider.Container>
      </GridSlider>
    </Fragment>
  );
}
