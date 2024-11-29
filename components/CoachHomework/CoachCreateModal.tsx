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
import { useHomework } from "@/app/contexts/CoachContexts/homework-context"; // Import HomeworkContext

export default function CoachHomeworkCreateModal() {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const { addHomework } = useHomework(); // Access addHomework from context

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget as HTMLFormElement);
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;

    if (!title || !description) {
      return toast({
        title: "Missing fields",
        description: "Both title and description are required.",
        variant: "destructive",
      });
    }

    try {
      // Add the homework via the context
      await addHomework({ title, description });

      // Close the modal on success
      setOpen(false);

      // Show a success toast
      toast({
        title: "Homework Created",
        description: "Your homework has been successfully created.",
        variant: "default",
      });
    } catch (error) {
      // Handle errors gracefully
      toast({
        title: "Failed to create homework",
        description:
          "There was an error creating the homework. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Create Homework</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Homework</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <Label htmlFor="title" className="text-right">
            Title
          </Label>
          <Input
            id="title"
            name="title"
            placeholder="Vision Improvements"
            className="col-span-3"
          />

          <Label htmlFor="description" className="text-right">
            Description
          </Label>
          <Textarea
            id="description"
            name="description"
            placeholder="Description here"
            className="min-h-[150px]"
          />
          <DialogFooter>
            <Button type="submit">Save homework</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
