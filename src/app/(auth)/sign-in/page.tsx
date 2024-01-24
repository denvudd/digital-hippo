"use client";

import React from "react";
import Link from "next/link";
import { trpc } from "@/trpc/client";
import { useRouter, useSearchParams } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";

import { Button, buttonVariants } from "@/components/ui/Button";
import { Icons } from "@/components/ui/Icons";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  AuthCredentialsValidator,
  type TAuthCredentialsValidator,
} from "@/lib/validators/auth-credentials";
import { toast } from "sonner";

const Page: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isSeller = searchParams.get("as") === "seller";
  const origin = searchParams.get("origin");

  const continueAs = (as: "seller" | "customer") => {
    if (as === "seller") {
      router.push("?as=seller");
    } else {
      router.replace("/sign-in", undefined);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TAuthCredentialsValidator>({
    resolver: zodResolver(AuthCredentialsValidator),
  });

  const { mutate: signIn, isLoading: isSignInLoading } =
    trpc.auth.signIn.useMutation({
      onSuccess: () => {
        toast.success("Signed in successfully");
        router.refresh();

        if (origin) {
          router.push(`/${origin}`);
          return;
        }

        if (isSeller) {
          router.push("/sell");
          return;
        }

        router.push("/");
      },
      onError: (error) => {
        if (error.data?.code === "UNAUTHORIZED") {
          toast.error("Invalid email or password.");
          return;
        }

        toast.error("Something went wrong. Please try again.");
      },
    });

  const onSubmit: SubmitHandler<TAuthCredentialsValidator> = ({
    email,
    password,
  }: TAuthCredentialsValidator) => {
    signIn({ email, password });
  };

  return (
    <>
      <div className="container relative flex py-20 flex-col items-center justify-center lg:px-0">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col items-center space-y-2 text-center">
            <Icons.Logo className="h-20 w-20" />
            <h1 className="text-2xl font-bold">
              Sign in to your {isSeller && "seller"} account
            </h1>

            <Link
              className={buttonVariants({
                variant: "link",
                className: "gap-1.5",
              })}
              href="/sign-up"
            >
              Don&apos;t have an account? Sign up
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
                  {errors?.email && (
                    <p className="text-sm text-red-500">
                      {errors.email.message}
                    </p>
                  )}
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
                  {errors?.password && (
                    <p className="text-sm text-red-500">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                <Button isLoading={isSignInLoading}>Sign in</Button>
              </div>
            </form>

            <div className="relative">
              <div aria-hidden className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <div className="bg-background px-2 text-muted-foreground">
                  or
                </div>
              </div>
            </div>

            {isSeller ? (
              <Button
                onClick={() => continueAs("customer")}
                variant="secondary"
                isLoading={isSignInLoading}
              >
                Continue as customer
              </Button>
            ) : (
              <Button
                onClick={() => continueAs("seller")}
                variant="secondary"
                isLoading={isSignInLoading}
              >
                Continue as seller
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
