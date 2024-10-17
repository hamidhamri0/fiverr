"use client";
import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { IoMdMenu } from "react-icons/io";
import { SideNavContent } from "@/Components/Molecules/SideNavContent";
import { useOutsideClick } from "@/Hooks/useOutsideClick";

export default function SideNav() {
  const [showSideNav, setShowSideNav] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const ref = useOutsideClick(() => setShowSideNav(false));

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="hidden items-center lg:flex">
      <a
        onClick={() => setShowSideNav(true)}
        className="flex cursor-pointer items-center"
      >
        <IoMdMenu size={30} />
      </a>
      {createPortal(
        <SideNavContent
          className={`${showSideNav ? "-translate-x-0" : ""}`}
          sideNavRef={ref}
        />,
        document.body,
      )}
    </div>
  );
}
