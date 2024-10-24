"use server";
import * as z from "zod";

import { NewPasswordSchema } from "@/schemas";
import { getPasswordResetTokenByToken } from "@/util/passwordresettoken";
import { getCoachByEmail } from "@/util/coach";
import { getStudentByEmail } from "@/util/student";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";

export const newPassword = async (
  values: z.infer<typeof NewPasswordSchema>,
  token: string | null
) => {
  if (!token) {
    return { error: "Invalid token" };
  }
  const validatedFields = NewPasswordSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }

  const { password } = validatedFields.data;

  const existingToken = await getPasswordResetTokenByToken(token);

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
    return { error: "Invalid email address" };
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  //todo send email to respective model
  if (existingCoach) {
    await db.coach.update({
      where: {
        email: existingToken.email,
      },
      data: {
        password: hashedPassword,
      },
    });
  } else if (existingStudent) {
    await db.student.update({
      where: {
        email: existingToken.email,
      },
      data: {
        password: hashedPassword,
      },
    });
  }

  await db.passwordResetToken.delete({
    where: {
      id: existingToken.id,
    },
  });

  return { success: "Password updated" };
};
