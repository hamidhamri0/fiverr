"use server";

import { cookies } from "next/headers";
import { post } from "../utils/customFetch";
import { revalidatePath } from "next/cache";

export async function deleteGig(prevState: any, formData: FormData) {
  console.log(prevState, formData);
  const gigId = formData.get("gigId") as string;
  try {
    await post(`/gig/deleteGig/${gigId}`, {
      isCookie: cookies().toString(),
    });
    revalidatePath(`/manage_gigs`);
    return { success: true, message: "" };
  } catch (err: any) {
    return {
      success: false,
      message: err?.message || "something wrong happened",
    };
  }
}
