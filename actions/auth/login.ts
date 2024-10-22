"use server";
import * as z from "zod";
import { LoginSchema } from "@/schemas";

export const login = async (data: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(data);

  if (!validatedFields.success) {
    return validatedFields.error;
  }

  return { success: "Logged in!" };
};
