"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./input";
import { Button } from "./button";

export const formSchema = z
  .object({
    username: z.string().min(1).max(15),
    name: z.string().min(1).max(50),
    email: z.string().email(),
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
  })
  .refine((data) => data.confirmPassword === data.password, {
    message: "Passwords does not match.",
    path: ["confirmPassword"],
  });

interface RegisterFormProps {
  handleSubmit: SubmitHandler<z.infer<typeof formSchema>>;
  isLoading?: boolean;
}

export default function RegisterForm({
  handleSubmit,
  isLoading = false,
}: RegisterFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className={`w-full flex flex-col gap-4 ${
          isLoading && "cursor-progress"
        }`}
      >
        <FormField
          name="username"
          control={form.control}
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Username: </FormLabel>
                <FormControl>
                  <Input
                    className="bg-secondary text-primary border-1 border-primary"
                    {...field}
                    placeholder="Username"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Name: </FormLabel>
                <FormControl>
                  <Input
                    className="bg-secondary text-primary border-1 border-primary"
                    {...field}
                    placeholder="Name"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormField
          name="email"
          control={form.control}
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Email: </FormLabel>
                <FormControl>
                  <Input
                    className="bg-secondary text-primary border-1 border-primary"
                    {...field}
                    placeholder="Email"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormField
          name="password"
          control={form.control}
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Password: </FormLabel>
                <FormControl>
                  <Input
                    className="bg-secondary text-primary border-1 border-primary"
                    {...field}
                    placeholder="Password"
                    type="password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormField
          name="confirmPassword"
          control={form.control}
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Confirm password: </FormLabel>
                <FormControl>
                  <Input
                    className="bg-secondary text-primary border-1 border-primary"
                    {...field}
                    placeholder="Confirm Password"
                    type="password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <Button disabled={isLoading} type="submit">
          Register
        </Button>
      </form>
    </Form>
  );
}
