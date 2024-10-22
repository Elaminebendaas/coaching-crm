import { db } from "@/lib/db";

export const getCoachByEmail = async (email: string) => {
  return await db.coach.findUnique({
    where: { email },
  });
};

export const getCoachByID = async (id: string) => {
  return await db.coach.findUnique({
    where: { id },
  });
};

export const getCoachByUsername = async (username: string) => {
  return await db.coach.findUnique({
    where: { username },
  });
};
