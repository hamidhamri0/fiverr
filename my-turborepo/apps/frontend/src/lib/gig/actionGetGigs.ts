"use server";

import { cookies } from "next/headers";
import { get, post } from "../utils/customFetch";
import { revalidatePath } from "next/cache";
import { GigData } from "@/types/gig.interface";
import { getUser } from "../auth/getUser";
import { redirect } from "next/navigation";

export async function getGigs(prevState: any, formData: FormData) {
  try {
    const userSession = await getUser();
    if (!userSession) redirect("/");
    const status = formData.get("status") as string;
    const gigs = await get<GigData[]>(
      `/gig/getAllGigsByUserId/${userSession?.id}?status=${status}`,
      {
        isCookie: cookies().toString(),
      },
    );
    return gigs;
  } catch (err: any) {
    return {
      success: false,
      message: err?.message || "something wrong happened",
    };
  }
}
