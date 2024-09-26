import React from "react";
import ManageGigs from "../components/ManageGigs";
import { get } from "@/lib/utils/customFetch";
import { getUser } from "@/lib/auth/getUser";
import { GigData } from "@/types/gig.interface";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

async function page() {
  let gigs = [] as GigData[];
  try {
    const userSession = await getUser();
    gigs = await get<GigData[]>(`/gig/getAllGigsByUserId/${userSession?.id}`, {
      isCookie: cookies().toString(),
    });
  } catch (err) {
    redirect("/");
  }
  return (
    <div>
      <ManageGigs gigs={gigs} />
    </div>
  );
}

export default page;
