import { NextResponse } from "next/server";
import { auth } from "./next-auth/auth";

export default auth((req) => {
  // if (req.auth?.user) {
  //   console.log(req.auth.user);
  //   return NextResponse.next();
  // }
  // return NextResponse.redirect(new URL("/auth/login", req.url));
});

// // Optionally, don't invoke Middleware on some paths
export const config = {
  //   matcher: [
  //     /*
  //      * Match all request paths except for the ones starting with:
  //      * - api (API routes)
  //      * - _next/static (static files)
  //      * - favicon.ico (favicon file)
  //      */
  //     "/((?!api|admin|_next/static|_next/image|_ipx|assets|favicon.ico|under-development.svg|public).*)",
  //   ],
};
