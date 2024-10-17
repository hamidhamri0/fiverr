import { cookies } from "next/headers";
import { get } from "../utils/customFetch";
import {
  GigWithAvgRatingAndTotalReviews,
  Query,
  userFeedGigs,
} from "@fiverr/shared";
import { redirect } from "next/navigation";

export async function getAllGigs(
  include: Query = [],
  limit?: number,
): Promise<GigWithAvgRatingAndTotalReviews[]> {
  try {
    const gig = await get<GigWithAvgRatingAndTotalReviews[]>(
      `/gig/getAllGigs?include=${include.join(",")}&limit=${limit}`,
      {
        cache: "no-cache",
        isCookie: cookies().toString(),
      },
    );
    return gig;
  } catch (error) {
    throw error;
  }
}

export async function findUsersGigs(
  include: Query = [],
  limit?: number,
): Promise<userFeedGigs> {
  try {
    const gig = await get<userFeedGigs>(
      `/gig/findUsersGigs?include=${include.join(",")}&limit=${limit}`,
      {
        cache: "no-cache",
        isCookie: cookies().toString(),
      },
    );
    return gig;
  } catch (error) {
    throw error;
  }
}

export async function getOneGig(
  gigId: string,
  include: Query = [],
): Promise<GigWithAvgRatingAndTotalReviews> {
  try {
    const gig = await get<GigWithAvgRatingAndTotalReviews>(
      `/gig/getOneById/${gigId}?include=${include.join(",")}`,
      {
        cache: "no-cache",
        isCookie: cookies().toString(),
      },
    );
    return gig;
  } catch (error) {
    console.log("REDICTING", error);
    redirect("/");
  }
}
