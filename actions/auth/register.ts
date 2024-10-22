"use server";
import * as z from "zod";
import { CoachRegisterSchema, StudentRegisterSchema } from "@/schemas";
import { db } from "@/lib/db";
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

  const existingEmail = await db.coach.findUnique({
    where: { email },
  });

  if (existingEmail) {
    return { error: "Email already in use!" };
  }
  const existingUsername = await db.coach.findUnique({
    where: { username },
  });

  if (existingUsername) {
    return { error: "Username already in use!" };
  }

  await db.coach.create({
    data: {
      email,
      password: hashedPassword,
      name,
      username,
    },
  });

  return { success: "Logged in!" };
};

export const StudentRegister = async (
  data: z.infer<typeof StudentRegisterSchema>
) => {
  const validatedFields = StudentRegisterSchema.safeParse(data);

  if (!validatedFields.success) {
    return validatedFields.error;
  }

  const { email, password, name, username, iRacingID, coachUsername } =
    validatedFields.data;

  const hashedPassword = await bcrypt.hash(password, 10);

  const existingEmail = await db.student.findUnique({
    where: { email },
  });

  if (existingEmail) {
    return { error: "Email already in use!" };
  }

  const existingUsername = await db.student.findUnique({
    where: { username },
  });

  if (existingUsername) {
    return { error: "Username already in use!" };
  }

  const existingCoach = await db.coach.findUnique({
    where: { username: coachUsername },
  });
  if (!existingCoach) {
    return { error: "Coach does not exist!" };
  }

  //DO IRACING ID CHECK HERE

  await db.student.create({
    data: {
      email,
      password: hashedPassword,
      name,
      username,
      iRacingID,
      coachUsername,
    },
  });

  return { success: "Logged in!" };
};
