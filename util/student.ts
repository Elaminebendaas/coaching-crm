import { db } from "@/lib/db";

export const getStudentByEmail = async (email: string) => {
  return await db.student.findUnique({
    where: { email },
  });
};

export const getStudentByID = async (id: string) => {
  return await db.student.findUnique({
    where: { id },
  });
};

export const getStudentByUsername = async (username: string) => {
  return await db.student.findUnique({
    where: { username },
  });
};
