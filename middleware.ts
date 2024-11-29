import authConfig from "@/auth.config";
import NextAuth from "next-auth";
import {
  authRoutes,
  apiAuthPrefix,
  publicRoutes,
  DEFAULT_COACH_LOGIN_REDIRECT,
  DEFAULT_STUDENT_LOGIN_REDIRECT,
} from "@/routes";


const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const  user  = !!req.auth
  const type = req.auth

  const isApitAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

    if (isApitAuthRoute) {
        return 
    }

    if(isAuthRoute){
      if (user) {
        if (type?.user.role === "COACH") {
          return Response.redirect(
            new URL(DEFAULT_COACH_LOGIN_REDIRECT, nextUrl)
          );
        }
        if (type?.user.role === "STUDENT") {
          return Response.redirect(
            new URL(DEFAULT_STUDENT_LOGIN_REDIRECT, nextUrl)
          );
        }
        if (user) {
          return Response.redirect(
            new URL(DEFAULT_COACH_LOGIN_REDIRECT, nextUrl)
          );
        }
      }

      if (!user && !isPublicRoute) {
        return Response.redirect(new URL("/auth/login", nextUrl));
      }

      return Response.redirect(new URL(DEFAULT_COACH_LOGIN_REDIRECT, nextUrl));
    }

});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
  ],
};
