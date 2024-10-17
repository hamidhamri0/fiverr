import { cookies } from "next/headers";
import { GigReviews } from "types/gig-reviews";
import { redirect } from "next/navigation";
import { get } from "./utils/customFetch";

// gig-reviews/getGigReviews/0430f0fb-1480-4e4f-b09d-6e51566a4772?limit=3
export async function getGigReviews(
  gigId: string,
  limit: number,
): Promise<{
  reviews: GigReviews[];
  next: boolean;
  offset: number;
}> {
  try {
    const gig = await get<{
      reviews: GigReviews[];
      next: boolean;
      offset: number;
    }>(`/gig-reviews/getGigReviews/${gigId}?limit=${1}&offset=0`, {
      cache: "no-cache",
      isCookie: cookies().toString(),
    });
    return gig;
  } catch (error) {
    redirect("/");
  }
}
