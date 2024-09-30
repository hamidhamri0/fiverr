import { cookies } from "next/headers";
import { get } from "../utils/customFetch";
import { User } from "@/stores/UserInfoStore";
import { GigData } from "@/types/gig.interface";

export async function isGigExists(gigId: string): Promise<GigData | null> {
  try {
    const gig = await get<GigData>(`/gig/getOneById/${gigId}`, {
      cache: "no-cache",
      isCookie: cookies().toString(),
    });
    return gig;
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
}
