import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import CoachHomeworkEditModal from "./CoachEditHomeworkModal";
import CoachDeleteHomeworkModal from "./CoachDeleteHomeworkModal";

export default function HomeworkCard({
  id,
  title,
  description,
}: {
  id: string;
  title: string;
  description: string;
}) {
  return (
    <Card className="w-[330px] h-[500px] relative">
      <CardHeader className="flex justify-between items-start">
        <CardTitle>{title}</CardTitle>
        <div className="flex space-x-2">
          {/* Edit Modal Trigger */}
          <CoachHomeworkEditModal
            homeworkId={id}
            initialTitle={title}
            initialDescription={description}
          />

          {/* Delete Modal Trigger */}
          <CoachDeleteHomeworkModal homeworkId={id} />
        </div>
      </CardHeader>
      <CardContent className="mt-2">
        <p>{description}</p>
      </CardContent>
    </Card>
  );
}
