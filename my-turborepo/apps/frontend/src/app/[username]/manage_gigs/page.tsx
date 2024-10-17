import React from "react";
import { get } from "@/lib/utils/customFetch";
import { getUser } from "@/lib/auth/getUser";
import { GigData } from "@/types/gig.interface";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import ManageGigs from "@/Components/ManageGigs";
import { User } from "types/user";

async function page({
  searchParams,
  params,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
  params: { username: string };
}) {
  let gigs = [] as GigData[];
  let status = "active";
  let userSession: User | null = null;
  try {
    userSession = await getUser();
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

  if (!userSession || userSession.username !== params.username) {
    redirect("/");
  }

  return (
    <div>
      <ManageGigs status={status} initialState={gigs} />
    </div>
  );
}

export default page;
