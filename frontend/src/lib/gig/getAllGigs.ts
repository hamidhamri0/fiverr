import { cookies } from "next/headers";
import { get } from "../utils/customFetch";
import { GigData } from "@/types/gig.interface";

export async function getAllGigs(): Promise<GigData[]> {
  try {
    const gig = await get<GigData[]>(`/gig/getAllGigs`, {
      cache: "no-cache",
      isCookie: cookies().toString(),
    });
    return gig;
  } catch (error) {
    throw error;
  }
}
