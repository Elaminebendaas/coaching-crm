"use server";
import * as z from "zod";
import { auth, signIn } from "@/auth";
import { LoginSchema } from "@/schemas";
import { DEFAULT_COACH_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";
import { getCoachByEmail } from "@/util/coach";
import { getStudentByEmail } from "@/util/student";
import { generateVerificationToken } from "@/lib/token";

import { sendVerificationEmail } from "@/lib/mail";

export const login = async (data: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(data);

  if (!validatedFields.success) {
    return validatedFields.error;
  }

  const { email, password } = validatedFields.data;

  const existingCoach = await getCoachByEmail(email);
  const existingStudent = await getStudentByEmail(email);

  if (!existingCoach && !existingStudent) {
    return { error: "Invalid credentials" };
  }
    
  if(existingCoach){
  if (!existingCoach?.emailVerified) {
    const verificationToken = await generateVerificationToken(
      existingCoach.email
    );

    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );
  }}
  if(existingStudent){
  if (!existingStudent?.emailVerified) {
    const verificationToken = await generateVerificationToken(
      existingStudent.email
    );
    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );
  }}

  try {
    await signIn("credentials", {
      email,
      password,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials" };
        default:
          return { error: "An error occurred" };
      }
    }
    throw error;
  }
};
