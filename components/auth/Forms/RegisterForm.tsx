"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition, useState } from "react";
import { register } from "@/app/auth/actions";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../../ui/form";
import { Greating } from "../../dashboard/Welcome";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { Loader2, EyeIcon, EyeOffIcon } from "lucide-react";

const RegisterForm = () => {
  const [isPending, startTransition] = useTransition();
  const [passwordVisibility, setPasswordVisibility] = useState<
    "password" | "text"
  >("password");

  const LoginSchema = z.object({
    email: z.string().email("Email is required"),
    password: z.string().min(1, "Password is required"),
  });

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    startTransition(async () => {
      await register(values);
    });
  };

  return (
    <div className="flex flex-col max-w-[400px] w-[100%] gap-4">
      <Greating>
        <Greating.Title className="text-center" />
        <Greating.Message
          className="text-center"
          message="Join MGF Global Workspace"
        />
      </Greating>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
          <div className="space-y-3">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl className="min-w-full border border-neutral rounded-md transition-all duration-300 hover:border-primary focus:border-primary">
                    <Input
                      {...field}
                      className="bg-transparent placeholder:capitalize"
                      placeholder={field.name}
                      type="email"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl className="min-w-full border border-neutral rounded-md transition-all duration-300 hover:border-primary focus:border-primary">
                    <Input
                      {...field}
                      className="bg-transparent placeholder:capitalize"
                      placeholder={field.name}
                      type="email"
                      disabled={isPending}
                    />
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
                  <FormControl className="min-w-full border border-neutral rounded-md transition-all duration-300 hover:border-primary focus:border-primary">
                    <div className="full-flex">
                      <Input
                        {...field}
                        className="bg-transparent placeholder:capitalize"
                        placeholder={field.name}
                        type={passwordVisibility}
                        disabled={isPending}
                      />
                      {passwordVisibility === "password" ? (
                        <Button
                          onClick={() => setPasswordVisibility("text")}
                          size="icon"
                          type="button"
                          variant="ghost"
                          title="Show password"
                          className="bg-transparent hover:bg-transparent"
                        >
                          <EyeIcon className="size-5" />
                        </Button>
                      ) : (
                        <Button
                          onClick={() => setPasswordVisibility("password")}
                          size="icon"
                          type="button"
                          variant="ghost"
                          title="Hide password"
                          className="bg-transparent hover:bg-transparent"
                        >
                          <EyeOffIcon className="size-5" />
                        </Button>
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirm-password"
              render={({ field }) => (
                <FormItem>
                  <FormControl className="min-w-full border border-neutral rounded-md transition-all duration-300 hover:border-primary focus:border-primary">
                    <div className="full-flex">
                      <Input
                        {...field}
                        className="bg-transparent placeholder:capitalize"
                        placeholder={field.name}
                        type={passwordVisibility}
                        disabled={isPending}
                      />
                      {passwordVisibility === "password" ? (
                        <Button
                          onClick={() => setPasswordVisibility("text")}
                          size="icon"
                          type="button"
                          variant="ghost"
                          title="Show password"
                          className="bg-transparent hover:bg-transparent"
                        >
                          <EyeIcon className="size-5" />
                        </Button>
                      ) : (
                        <Button
                          onClick={() => setPasswordVisibility("password")}
                          size="icon"
                          type="button"
                          variant="ghost"
                          title="Hide password"
                          className="bg-transparent hover:bg-transparent"
                        >
                          <EyeOffIcon className="size-5" />
                        </Button>
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button
            type="submit"
            disabled={isPending}
            variant="default"
            className="w-full flex items-center gap-4 rounded-md"
          >
            {isPending && <Loader2 className="animate-spin size-4" />}
            {isPending ? "Login in..." : "Login"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default RegisterForm;
