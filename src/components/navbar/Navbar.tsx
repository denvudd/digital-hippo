import React from "react";
import Link from "next/link";
import { cookies } from "next/headers";

import MaxWidthWrapper from "../ui/MaxWidthWrapper";
import MobileNavbar from "./MobileNavbar";
import NavbarList from "./NavbarList";
import UserAccountNav from "./UserAccountNav";
import Cart from "../cart/Cart";
import { Icons } from "../ui/Icons";

import { buttonVariants } from "../ui/Button";
import { getServerSideUser } from "@/lib/payload-utils";

const Navbar: React.FC = async () => {
  const nextCookies = cookies();
  const { user } = await getServerSideUser(nextCookies);

  return (
    <div className="bg-white sticky z-50 top-0 inset-x-0 h-16">
      <header className="relative bg-white">
        <MaxWidthWrapper>
          <div className="border-b border-gray-200">
            <div className="flex h-16 items-center">
              <MobileNavbar />

              <div className="ml-4 flex lg:ml-0">
                <Link href="/">
                  <Icons.Logo className="h-10 w-10" />
                </Link>
              </div>

              <div className="hidden z-50 lg:ml-8 lg:block lg:self-stretch">
                <NavbarList />
              </div>

              <div className="ml-auto flex items-center">
                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                  {user ? null : (
                    <Link
                      href="/sign-in"
                      className={buttonVariants({ variant: "ghost" })}
                    >
                      Sign in
                    </Link>
                  )}

                  {user ? null : (
                    <span className="h-6 w-px bg-gray-200" aria-hidden />
                  )}

                  {user ? (
                    <UserAccountNav user={user} />
                  ) : (
                    <Link
                      href="/sign-up"
                      className={buttonVariants({ variant: "ghost" })}
                    >
                      Create account
                    </Link>
                  )}

                  {user ? (
                    <span className="h-6 w-px bg-gray-200" aria-hidden />
                  ) : null}

                  {user ? null : (
                    <div className="flex lg:ml-6">
                      <span className="h-6 w-px bg-gray-200" aria-hidden />{" "}
                    </div>
                  )}

                  <div className="ml-4 flow-root lg:ml-6">
                    <Cart />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
      </header>
    </div>
  );
};

export default Navbar;
