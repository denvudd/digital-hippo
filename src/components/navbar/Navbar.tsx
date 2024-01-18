import React from "react";
import MaxWidthWrapper from "../MaxWidthWrapper";
import Link from "next/link";
import { Icons } from "../ui/Icons";
import NavbarList from "./NavbarList";

const Navbar: React.FC = () => {
  const user = null;

  return (
    <div className="bg-white sticky z-50 top-0 inset-x-0 h-16">
      <header className="relative bg-white">
        <MaxWidthWrapper>
          <div className="border-b border-gray-200">
            <div className="flex h-16 items-center">
              {/* TODO: Mobile nav */}

              <div className="ml-4 flex lg:ml-0">
                <Link href="/">
                  <Icons.Logo className="h-10 w-10" />
                </Link>
              </div>

              <div className="hidden z-50 lg:ml-8 lg:block lg:self-stretch">
                <NavbarList />
              </div>

              <div className="ml-auto flex items-center">
                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6"></div>
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
      </header>
    </div>
  );
};

export default Navbar;
