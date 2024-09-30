import React from "react";
import ManageGigs from "../components/ManageGigs";
import { get } from "@/lib/utils/customFetch";
import { getUser } from "@/lib/auth/getUser";
import { GigData } from "@/types/gig.interface";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

async function page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  let gigs = [] as GigData[];
  let status = "active";
  try {
    const userSession = await getUser();
    status = (searchParams.status as string) || "active";
    gigs = await get<GigData[]>(
      `/gig/getAllGigsByUserId/${userSession?.id}?status=${status}`,
      {
        isCookie: cookies().toString(),
      },
    );
  } catch (err) {
    redirect("/manage_gigs?status=active");
  }
  return (
    <div>
      <ManageGigs status={status} initialState={gigs} />
    </div>
  );
}

export default page;
