"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { useTransition } from "react";
import { NewPasswordSchema } from "@/schemas";
import Link from "next/link";
import { newPassword } from "@/actions/auth/new-password";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";

export default function NewPasswordForm() {
  const [isPending, startTransition] = useTransition();
  const token = useSearchParams().get("token");
  const form = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: "",
    },
  });

  const onSubmit = (data: z.infer<typeof NewPasswordSchema>) => {
    startTransition(() => {
      newPassword(data, token);
    });
  };

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader className="border-b-[0px]">
        <CardTitle className="text-2xl">Set New Password</CardTitle>
        <CardDescription>Enter your new password below</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter your new password"
                      {...field}
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormDescription>
                    This will be your new password.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="space-y-2">
              <Button type="submit" className="w-full" disabled={isPending}>
                {isPending ? "Submitting..." : "Reset Password"}
              </Button>
              <div className="text-center">
                <Link
                  href="/auth/login"
                  className="text-sm text-muted-foreground hover:underline"
                >
                  Back to login
                </Link>
              </div>
            </div>
            {form.formState.isSubmitting && (
              <FormMessage className="text-center">Submitting...</FormMessage>
            )}
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
