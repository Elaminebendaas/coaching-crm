"use server";

import { db } from "@/lib/db";
import { getCoachByEmail } from "@/util/coach";
import { getStudentByEmail } from "@/util/student";
import {
  getVerificationTokenByEmail,
  getVerificationTokenByToken,
} from "@/util/verification-token";

export default async function newVerification(token: string) {
  const existingToken = await getVerificationTokenByToken(token);

  if (!existingToken) {
    return { error: "Invalid token" };
  }

  const hasExpired = new Date(existingToken.expires) < new Date();

  if (hasExpired) {
    return { error: "Token has expired" };
  }

  const existingCoach = await getCoachByEmail(existingToken.email);
  const existingStudent = await getStudentByEmail(existingToken.email);

  if (!existingCoach && !existingStudent) {
    console.log("User not found");
    return { error: "User not found" };
  }

  if (existingCoach) {
    await db.coach.update({
      where: {
        id: existingCoach.id,
      },
      data: {
        emailVerified: new Date(),
        email: existingToken.email,
      },
    });
  }
  if (existingStudent) {
    await db.student.update({
      where: {
        id: existingStudent.id,
      },
      data: {
        emailVerified: new Date(),
        email: existingToken.email,
      },
    });
  }

  await db.verificationToken.delete({
    where: {
      id: existingToken.id,
    },
  });

  return { success: "Email verified" };
}
