import {
  apiPrefix,
  authRoutes,
  redirectRoute,
} from "@/app/api/auth/[...nextauth]/(logic)/routes";
import NextAuth from "next-auth";
import authConfig from "@/app/api/auth/[...nextauth]/(logic)/auth.config";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isApiRoute = nextUrl.pathname.startsWith(apiPrefix);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isApiRoute) {
    return null;
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(redirectRoute, nextUrl));
    }
    return null;
  }

  return null;
});

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
