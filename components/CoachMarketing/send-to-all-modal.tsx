import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialogDescription,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { sendEmailsToAll } from "@/lib/mail-coach-campaign";
import { Student } from "@prisma/client";

export default function SendToAllDialog({
  students,
  subject,
  body,
}: {
  students: Student[];
  subject: string;
  body: string;
}) {
  const { toast } = useToast();

  const handleSendToAll = async () => {
    try {
      await sendEmailsToAll(students, subject, body);
      toast({
        title: "Emails Sent",
        description: "Emails have been successfully sent to all students.",
        variant: "default",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send emails to all students. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button>Send to All</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This will send an email to all your students. This action cannot be
            undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleSendToAll}>
            Send Emails
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
