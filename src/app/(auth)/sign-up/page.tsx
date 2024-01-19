"use client";

import React from "react";
import Link from "next/link";
import { trpc } from "@/trpc/client";

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Icons } from "@/components/ui/Icons";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Button, buttonVariants } from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";

import {
  AuthCredentialsValidator,
  type TAuthCredentialsValidator,
} from "@/lib/validators/auth-credentials";
import { cn } from "@/lib/utils";

const Page: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TAuthCredentialsValidator>({
    resolver: zodResolver(AuthCredentialsValidator),
  });

  const { mutate: createPayloadUser, isLoading: isPayloadUserPending } =
    trpc.auth.createPayloadUser.useMutation();

  const onSubmit: SubmitHandler<TAuthCredentialsValidator> = ({
    email,
    password,
  }: TAuthCredentialsValidator) => {
    createPayloadUser({ email, password });
  };

  return (
    <>
      <div className="container relative flex pt-20 flex-col items-center justify-center lg:px-0">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col items-center space-y-2 text-center">
            <Icons.Logo className="h-20 w-20" />
            <h1 className="text-2xl font-bold">Create an account</h1>

            <Link
              className={buttonVariants({
                variant: "link",
                className: "gap-1.5",
              })}
              href="/sign-in"
            >
              Already have an account? Sign-in
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-6">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-2">
                <div className="grid gap-2 py-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    {...register("email")}
                    className={cn({
                      "focus-visible:ring-red-500": errors.email,
                    })}
                    placeholder="your@example.com"
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <div className="grid gap-2 py-2">
                  <Label htmlFor="email">Password</Label>
                  <Input
                    {...register("password")}
                    className={cn({
                      "focus-visible:ring-red-500": errors.password,
                    })}
                    type="password"
                    placeholder="Password"
                  />
                </div>

                <Button isLoading={isPayloadUserPending}>Sign up</Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
