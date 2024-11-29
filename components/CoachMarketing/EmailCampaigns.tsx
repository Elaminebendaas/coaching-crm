'use client'

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import SendToAllDialog from "./send-to-all-modal";
import SendToCustomModal from "./send-to-custom-modal";

import { Student } from "@prisma/client";

export default function EmailCampaign({ students }: { students: Student[] }) {
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Email Campaign</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="subject" className="text-sm font-medium">
            Subject
          </Label>
          <Input
            id="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Enter email subject"
            className="w-full"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="body" className="text-sm font-medium">
            Body
          </Label>
          <Textarea
            id="body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Enter email body"
            rows={6}
            className="w-full min-h-[150px] resize-y"
          />
        </div>
      </CardContent>
      <CardFooter className="flex justify-end space-x-4">
        <SendToCustomModal students={students} subject={subject} body={body} />
        <SendToAllDialog students={students} subject={subject} body={body} />
      </CardFooter>
    </Card>
  );
}
