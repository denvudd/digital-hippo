import React from "react";
import Image from "next/image";

import VerifyEmail from "@/components/VerifyEmail";

import { type PageParam } from "@/types";

interface PageProps {
  searchParams: {
    [key: string]: PageParam;
  };
}

const Page: React.FC<PageProps> = ({ searchParams }) => {
  const token = searchParams.token;
  const recipient = searchParams.recipient;

  return (
    <div className="container relative flex pt-20 flex-col items-center justify-center lg:px-0">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        {token && typeof token === "string" ? (
          <div className="grid gap-6">
            <VerifyEmail token={token} />
          </div>
        ) : (
          <div className="flex h-full flex-col items-center justify-center space-y-1">
            <div className="relative mb-4 h-60 w-60 text-muted-foreground">
              <Image src="/hippo-email-sent.png" fill alt="Hippo sent email" />
            </div>

            <h3 className="font-semibold text-2xl">Check your email</h3>

            <p className="text-muted-foreground text-center">
              We&apos;ve sent a verifycation link to{" "}
              {recipient ? (
                <span className="font-semibold">{recipient}</span>
              ) : (
                "email."
              )}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
