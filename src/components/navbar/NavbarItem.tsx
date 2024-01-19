"use client";

import React from "react";
import { Button } from "../ui/Button";
import { ProductCategories } from "@/config";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

interface NavbarItemProps {
  category: ProductCategories[number];
  handleOpen: () => void;
  isOpen: boolean;
  isAnyOpen: boolean;
}

const NavbarItem: React.FC<NavbarItemProps> = ({
  category,
  handleOpen,
  isAnyOpen,
  isOpen,
}) => {
  return (
    <li className="flex">
      <div className="flex relative items-center">
        <Button
          className="gap-1.5"
          onClick={handleOpen}
          variant={isOpen ? "secondary" : "ghost"}
        >
          {category.label}
          <ChevronDown
            className={cn("h-4 w-4 transiiton-all text-muted-foreground", {
              "-rotate-180": isOpen,
            })}
          />
        </Button>
      </div>

      {isOpen && (
        <div
          className={cn(
            "absolute inset-x-0 top-full text-sm text-muted-foreground",
            {
              "animate-in fade-in-10 slide-in-form-top-5": !isAnyOpen,
            }
          )}
        >
          <div
            className="absolute inset-0 top-1/2 bg-white shadow"
            aria-hidden
          />
          <div className="relative bg-white">
            <div className="mx-auto max-w-7xl px-8">
              <div className="grid grid-cols-4 gap-x-8 gap-y-10 py-16">
                <ul className="col-span-4 col-start-1 grid grid-cols-3 gap-x-8">
                  {category.children.map((child) => (
                    <li
                      className="group relative text-base sm:text-sm"
                      key={child.name}
                    >
                      <div className="relative transition-opacity aspect-video overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                        <Image
                          src={child.image}
                          alt="Product category"
                          fill
                          className="object-hover object-center"
                        />
                      </div>

                      <Link
                        href={child.href}
                        className="mt-6 block font-medium text-gray-900"
                      >
                        {child.name}
                      </Link>
                      <p className="mt-1" aria-hidden>
                        Shop now
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </li>
  );
};

export default NavbarItem;
