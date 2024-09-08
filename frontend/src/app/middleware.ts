// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// // This function can be marked `async` if using `await` inside
// export async function middleware(request: NextRequest) {
//   let userSession = await fetch("http://localhost:3001/auth/user", {
//     method: "GET",
//     credentials: "include",
//   });
//   if (userSession) {
//     return NextResponse.next();
//   } else {
//     return NextResponse.redirect(new URL("/login", request.url));
//   }
// }

// // See "Matching Paths" below to learn more
// export const config = {
//   matcher: "/about/:path*",
// };
