"use server";

import { cookies } from "next/headers";
import { post } from "../utils/customFetch";
import { revalidatePath } from "next/cache";

export async function deleteGig(prevState: any, formData: FormData) {
  const gigIds = formData.getAll("gigIds") as string[];

  if (!Array.isArray(gigIds)) {
    return {
      success: false,
      message: "gigIds must be an array",
    };
  }

  try {
    await post(
      `/gig/deleteGig`,
      { gigIds },
      { isCookie: cookies().toString() },
    );
    revalidatePath(`/manage_gigs`);
    return { success: true, message: "Gigs deleted successfully" };
  } catch (err: any) {
    return {
      success: false,
      message: err?.message || "Something went wrong",
    };
  }
}
