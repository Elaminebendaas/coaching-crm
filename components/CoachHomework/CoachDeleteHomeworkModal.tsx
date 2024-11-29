'use client'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Trash } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useHomework } from "@/app/contexts/CoachContexts/homework-context";

export default function CoachDeleteHomeworkModal({
  homeworkId,
}: {
  homeworkId: string;
}) {
  const { toast } = useToast();
  const { removeHomework } = useHomework(); // Access removeHomework from context

  const handleDelete = async () => {
    try {
      await removeHomework(homeworkId); // Remove homework via context

      toast({
        title: "Homework Deleted",
        description: "The homework was successfully deleted.",
        variant: "default",
      });
    } catch (error) {
      toast({
        title: "Failed to delete homework",
        description:
          "There was an error deleting the homework. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button>
          <Trash size={20} />
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete this
            homework.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
