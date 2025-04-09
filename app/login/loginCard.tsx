"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  signUpAction,
  signUpGithubAction,
} from "../../utils/supabase/actionAuth";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { supabase } from "../../utils/supabase/supabaseClient";
import { redirect } from "next/navigation";

const formSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, "Le mot de passe doit contenir au moins 8 caractères")
    .refine(
      (password) => /[A-Z]/.test(password),
      "Le mot de passe doit contenir au moins une lettre majuscule"
    )
    .refine(
      (password) => /[a-z]/.test(password),
      "Le mot de passe doit contenir au moins une lettre minuscule"
    )
    .refine(
      (password) => /[0-9]/.test(password),
      "Le mot de passe doit contenir au moins un chiffre"
    ),
});

export type FormSchemaType = z.infer<typeof formSchema>;

export const LoginForm = () => {
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: FormSchemaType) => {
    await signUpAction(values);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-2/3 space-y-6"
      ></form>
      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="font-semibold text-lg">Email</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="password"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="font-semibold text-lg">Password</FormLabel>
            <FormControl>
              <Input {...field} className="w-96" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <Button type="submit" className="pt-3">
        Submit
      </Button>
    </Form>
  );
};
