import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { sendEmailsToCustom } from "@/lib/mail-coach-campaign";
import { Student } from "@prisma/client";

export default function SendToCustomModal({
  students,
  subject,
  body,
}: {
  students: Student[];
  subject: string;
  body: string;
}) {
  const [selectedStudents, setSelectedStudents] = useState<Student[]>([]);
  const { toast } = useToast();

  const handleCheckboxChange = (student: Student) => {
    setSelectedStudents((prev) =>
      prev.find((s) => s.id === student.id)
        ? prev.filter((s) => s.id !== student.id)
        : [...prev, student]
    );
  };

  const handleSendToCustom = async () => {
    if (selectedStudents.length === 0) {
      return toast({
        title: "No students selected",
        description: "Please select at least one student.",
        variant: "destructive",
      });
    }

    try {
      await sendEmailsToCustom(selectedStudents, subject, body);
      toast({
        title: "Emails Sent",
        description:
          "Emails have been successfully sent to the selected students.",
        variant: "default",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send emails. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Send to Custom</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Select Recipients</DialogTitle>
        </DialogHeader>
        <div className="space-y-2 max-h-96 overflow-y-auto">
          {students.length > 0 ? (
            students.map((student) => (
              <div key={student.id} className="flex items-center space-x-2">
                <Checkbox
                  id={student.id}
                  onCheckedChange={() => handleCheckboxChange(student)}
                />
                <label htmlFor={student.id}>
                  {student.email || "No email available"}
                </label>
              </div>
            ))
          ) : (
            <p className="text-gray-500">You have no students.</p>
          )}
        </div>
        <DialogFooter>
          <Button
            onClick={handleSendToCustom}
            disabled={selectedStudents.length === 0}
          >
            Send
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
