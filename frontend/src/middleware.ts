import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { get } from "./lib/utils/customFetch";
import { cookies } from "next/headers";
import { User } from "./stores/UserInfoStore";

export async function middleware(request: NextRequest) {
  const cookie = cookies().toString();
  try {
    const user = await get<User>("/auth/session", {
      isCookie: cookie,
    });

    console.log(user, "MIDDLEWARE");

    return NextResponse.next();
  } catch (error) {
    console.error("Error checking session:", error);
    return NextResponse.redirect(new URL("/", request.url));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/manage_gigs/:path*"],
};
