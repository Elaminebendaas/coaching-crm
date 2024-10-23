import { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { LoginSchema } from "./schemas";
import { auth } from "./auth";
import bcrypt from "bcryptjs";
import { getCoachByEmail } from "@/util/coach";
import { getStudentByEmail } from "@/util/student";



export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;

          const isStudent = await getStudentByEmail(email);
          const isCoach = await getCoachByEmail(email);

          const isStudentValid = isStudent && isStudent.password;
          const isCoachValid = isCoach && isCoach.password;

          // If neither has a password, return null
          if (!isStudentValid && !isCoachValid) {
            console.log(
              "Neither student nor coach found with valid credentials"
            );
            return null;
          }

          if (isStudent) {
            //@ts-ignore
            const isValid = await bcrypt.compare(password, isStudent.password);
            if (isValid) {
              return isStudent;
            }
          }
          if (isCoach) {
            //@ts-ignore
            const isValid = await bcrypt.compare(password, isCoach.password);
            console.log(isValid);
            if (isValid) {
              return isCoach;
            }
          }
        }
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
