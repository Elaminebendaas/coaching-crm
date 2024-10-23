import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/lib/db";
import authConfig from "@/auth.config";
import { getCoachByID } from "@/util/coach";
import { getStudentByID } from "@/util/student";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
  events: {
    async linkAccount({user}){
      const isCoach = await getCoachByID(user.id);
      const isStudent = await getStudentByID(user.id);

      if(isCoach){
        await db.coach.update({
          where: {
            id: user.id,
          },
          data: {
            emailVerified: new Date(),
          },
        });
      }

      if(isStudent){
        await db.student.update({
          where: {
            id: user.id,
          },
          data: {
            emailVerified: new Date(),
          },
        });
      }
      
  }},
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== "credentials") return true;

      const isCoach = await getCoachByID(user.id);
      const isStudent = await getStudentByID(user.id);

      if (!isCoach && !isStudent) {
        return false;
      }

      // Check if Coach exists and email is not verified
      if (isCoach && !isCoach.emailVerified) {
        return false; // Fail sign-in if Coach's email is not verified
      }

      // Check if Student exists and email is not verified
      if (isStudent && !isStudent.emailVerified) {
        return false; // Fail sign-in if Student's email is not verified
      }


      return true;
    },
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        session.user.role = token.role;
      }

      if (token.subscription && session.user) {
        session.user.subscription= token.subscription;
      }
      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;

      const isCoach = await getCoachByID(token.sub);
      if (isCoach) {
        token.role = "COACH";
        token.subscription = isCoach.subscription;
      }

      const isStudent = await getStudentByID(token.sub);
      if (isStudent) {
        token.role = "STUDENT";
      }

      return token;
    },
  },  
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});
