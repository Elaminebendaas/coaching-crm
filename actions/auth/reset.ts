"use server";

import * as z from "zod";
import { ResetSchema } from "@/schemas";
import { getCoachByEmail } from "@/util/coach";
import { getStudentByEmail } from "@/util/student";
import { sendPasswordResetEmail } from "@/lib/mail";
import { generatepasswordResetToken } from "@/lib/token";

export const reset = async (data: z.infer<typeof ResetSchema>) => {
  const validatedFields = ResetSchema.safeParse(data);

  if (!validatedFields.success) {
    return validatedFields.error;
  }

  const { email } = validatedFields.data;

  const existingCoach = await getCoachByEmail(email);
  const existingStudent = await getStudentByEmail(email);

  if (!existingCoach && !existingStudent) {
    return { error: "Invalid email address" };
  }

  //todo send email to respective model
  if (existingCoach) {
    const passwordResetToken = await generatepasswordResetToken(email);
    await sendPasswordResetEmail(
      passwordResetToken.email,
      passwordResetToken.token
    );
  } else if (existingStudent) {
    const passwordResetToken = await generatepasswordResetToken(email);
    await sendPasswordResetEmail(
      passwordResetToken.email,
      passwordResetToken.token
    );
  }

  return { success: "Email sent" };
};
