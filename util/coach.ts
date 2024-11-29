import { db } from "@/lib/db";
import { Student } from "@prisma/client";

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

 export const fetchStudentsForCoach = async(coachId: string): Promise<Student[]>  => {
  try {
    const students = await db.student.findMany({
      where: {
        coach: {
          id: coachId,
        },
      },
    });
    return students;
  } catch (error) {
    console.error("Error fetching students:", error);
    return [];
  }
}