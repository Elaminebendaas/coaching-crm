import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export default function HomeworkCard({title, description}: {title: string, description: string}) {
  return (
    <Card className="w-[330px] h-[500px]">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {description}
      </CardContent>
    </Card>
  );
}
