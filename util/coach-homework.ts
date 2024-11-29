"use server";

import { db } from "@/lib/db";

export const getCoachHomeworks = async (coachId: string) => {
  try {
    const homework = await db.homework.findMany({
      where: { coachId },
    });
    return homework;
  } catch (error) {
    return null;
  }
};

export const createCoachHomework = async (
  coachId: string,
  data: { title: string; description: string }
) => {
  try {
    const newHomework = await db.homework.create({
      data: {
        title: data.title,
        description: data.description,
        coachId: coachId,
      },
    });
    return newHomework;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const deleteCoachHomework = async (homeworkId: string) => {
  try {
    const homework = await db.homework.delete({
      where: { id: homeworkId },
    });
    return homework;
  } catch (error) {
    return null;
  }
};

export const updateCoachHomework = async (
  homeworkId: string,
  data: { title: string; description: string }
) => {
  try {
    const homework = await db.homework.update({
      where: { id: homeworkId },
      data: {
        title: data.title,
        description: data.description,
      },
    });
    return homework;
  } catch (error) {
    return null;
  }
};
