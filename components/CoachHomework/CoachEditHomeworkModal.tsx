'use client'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useHomework } from "@/app/contexts/CoachContexts/homework-context";
import { PencilLine } from "lucide-react";

export default function CoachHomeworkEditModal({
  homeworkId,
  initialTitle,
  initialDescription,
}: {
  homeworkId: string;
  initialTitle: string;
  initialDescription: string;
}) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);
  const { toast } = useToast();
  const { editHomework } = useHomework(); // Access editHomework from context

  // Check if the "Save changes" button should be disabled
  const isSaveDisabled =
    title === initialTitle && description === initialDescription;

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!homeworkId) {
      return toast({
        title: "Invalid homework ID",
        description: "Please try reloading your page and try again.",
        variant: "destructive",
      });
    }

    try {
      // Update the homework via context
      await editHomework(homeworkId, { title, description });

      // Close the modal on success
      setOpen(false);

      // Show a success toast
      toast({
        title: "Homework Updated",
        description: "The homework has been successfully updated.",
        variant: "default",
      });
    } catch (error) {
      // Handle errors gracefully
      toast({
        title: "Unable to update homework",
        description: "There was an error. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost">
          <PencilLine size={20} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Homework</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <Label htmlFor="title" className="text-right">
            Title
          </Label>
          <Input
            id="title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="col-span-3"
          />

          <Label htmlFor="description" className="text-right">
            Description
          </Label>
          <Textarea
            id="description"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="min-h-[150px]"
          />
          <DialogFooter>
            <Button type="submit" disabled={isSaveDisabled}>
              Save changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
