"use server";
import * as z from "zod";
import { CoachRegisterSchema, StudentRegisterSchema } from "@/schemas";

import bcrypt from "bcrypt";

export const CoachRegister = async (
  data: z.infer<typeof CoachRegisterSchema>
) => {
  const validatedFields = CoachRegisterSchema.safeParse(data);

  if (!validatedFields.success) {
    return validatedFields.error;
  }

  const { email, password, name, username } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  return { success: "Logged in!" };
};

export const StudentRegister = async (
  data: z.infer<typeof StudentRegisterSchema>
) => {
  const validatedFields = StudentRegisterSchema.safeParse(data);

  if (!validatedFields.success) {
    return validatedFields.error;
  }

  const { email, password, name, username, iRacingID, coachID } =
    validatedFields.data;

  const hashedPassword = await bcrypt.hash(password, 10);

  return { success: "Logged in!" };
};
