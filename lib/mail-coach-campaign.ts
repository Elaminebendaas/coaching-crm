import { resend } from "./mail";
import { Student } from "@prisma/client";


// Send emails to all students
export const sendEmailsToAll = async (
  students: Student[],
  subject: string,
  body: string
) => {
  if (!students.length) throw new Error("No students to send emails to.");

  try {
    const emailPromises = students.map((student) =>
      resend.emails.send({
        from: "onboarding@resend.dev",
        to: student.email || "",
        subject,
        text: body,
      })
    );
    await Promise.all(emailPromises);
    return {
      success: true,
      message: "Emails successfully sent to all students.",
    };
  } catch (error) {
    console.error("Failed to send emails:", error);
    throw new Error("Failed to send emails to all students.");
  }
};

// Send emails to selected students
export const sendEmailsToCustom = async (
  selectedStudents: Student[],
  subject: string,
  body: string
) => {
  if (!selectedStudents.length)
    throw new Error("No selected students to send emails to.");

  try {
    const emailPromises = selectedStudents.map((student) =>
      resend.emails.send({
        from: "onboarding@resend.dev",
        to: student.email || "",
        subject,
        text: body,
      })
    );
    await Promise.all(emailPromises);
    return {
      success: true,
      message: "Emails successfully sent to selected students.",
    };
  } catch (error) {
    console.error("Failed to send custom emails:", error);
    throw new Error("Failed to send emails to selected students.");
  }
};
