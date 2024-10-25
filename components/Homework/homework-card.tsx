import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export default function HomeworkCard(title: string, description: string) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {description}
      </CardContent>
    </Card>
  );
}
