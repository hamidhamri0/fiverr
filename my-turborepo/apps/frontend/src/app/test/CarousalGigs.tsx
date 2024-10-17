// import React from "react";
// import { GigWithAvgRatingAndTotalReviews } from "types/gig";
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
//   CarouselSliders,
// } from "../components/Carousal";

import WelcomeModal from "../../Components/Organisms/WelcomeModal";

// export default function CarousalGigs({ gigs }: { gigs: any[] }) {
//   return (
//     <div className="flex w-full">
//       <div className="w-[10%] flex-shrink-0">qzhdiohqzdiohio</div>
//       <Carousel className="flex-grow">
//         <CarouselSliders className="mb-2 ml-auto" />
//         <CarouselContent>
//           {gigs.map((gig: GigWithAvgRatingAndTotalReviews) => (
//             <CarouselItem key={gig.id}>
//               <div className="flex flex-col gap-2">
//                 <img
//                   src={gig.imageUrls[0]}
//                   alt={gig.title}
//                   className="h-52 w-full rounded-lg object-cover"
//                 />
//                 <p className="text-lg font-semibold text-gray-800">
//                   {gig.title}
//                 </p>
//               </div>
//             </CarouselItem>
//           ))}
//         </CarouselContent>
//         <CarouselPrevious />
//         <CarouselNext />
//       </Carousel>
//     </div>
//   );
// }

const FlexLayout = () => {
  return (
    <div>
      <WelcomeModal />
    </div>
  );
};

export default FlexLayout;
