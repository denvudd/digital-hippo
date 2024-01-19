"use client";

import React from "react";
import NavbarItem from "./NavbarItem";

import { useOnClickOutside } from "@/hooks/use-on-click-outside";
import { PRODUCT_CATEGORIES } from "@/config";

const NavbarList: React.FC = () => {
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);
  const navRef = React.useRef<HTMLUListElement | null>(null);
  useOnClickOutside(navRef, () => setActiveIndex(null));

  const handleOpen = (index: number) => {
    if (activeIndex === index) {
      setActiveIndex(null);
    } else {
      setActiveIndex(index);
    }
  };

  const handleKeyboard = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      setActiveIndex(null);
    }
  };

  React.useEffect(() => {
    document.addEventListener("keydown", handleKeyboard);

    return () => document.removeEventListener("keydown", handleKeyboard);
  }, []);

  return (
    <ul ref={navRef} className="flex gap-4 h-full">
      {PRODUCT_CATEGORIES.map((category, index) => (
        <NavbarItem
          category={category}
          handleOpen={() => handleOpen(index)}
          isOpen={activeIndex === index}
          isAnyOpen={activeIndex !== null}
          key={index}
        />
      ))}
    </ul>
  );
};

export default NavbarList;
