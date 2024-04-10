"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition, useState } from "react";
import { signIn } from "next-auth/react";
import { login } from "@/app/auth/actions";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Greating } from "../dashboard/greating";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Loader2, EyeIcon, EyeOffIcon } from "lucide-react";

const LoginForm = () => {
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
      await login(values);
    });
  };

  return (
    <div className="flex flex-col max-w-[400px] w-[100%] gap-4">
      <Greating>
        <Greating.Title className="text-center" />
        <Greating.Message
          className="text-center"
          message="Welcome to More Good Foundation Global"
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
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">Or</span>
        </div>
      </div>
      <Button
        variant="outline"
        disabled={isPending}
        title="Continue with Google"
        className="w-full flex items-center gap-4 rounded-md"
        onClick={() => signIn("google")}
      >
        <GoogleIcon />
        <p className="sr-only">Sign up with Google</p>
        Sign up with Google
      </Button>
    </div>
  );
};

export const GoogleIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
      width="24px "
      height="24px"
    >
      <path
        fill="#fbc02d"
        d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12	s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20	s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
      />
      <path
        fill="#e53935"
        d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039	l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
      />
      <path
        fill="#4caf50"
        d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
      />
      <path
        fill="#1565c0"
        d="M43.611,20.083L43.595,20L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
      />
    </svg>
  );
};

export default LoginForm;
