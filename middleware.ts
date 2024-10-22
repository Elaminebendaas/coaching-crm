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
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
  ],
};
