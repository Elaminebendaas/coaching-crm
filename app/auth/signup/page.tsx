import CoachCreateForm from "@/components/AuthForms/CoachCreateForm";
import StudentCreateForm from "@/components/AuthForms/StudentCreateForm";

export default function Signup() {
  return (
    <>
      <StudentCreateForm />
      <CoachCreateForm />
    </>
  );
}
