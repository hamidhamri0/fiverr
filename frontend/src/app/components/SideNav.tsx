import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { IoMdMenu } from "react-icons/io";
import { useOutsideClick } from "../Hooks/useOutsideClick";
import { OpenArrow } from "./Footer";
import { twMerge } from "tailwind-merge";

function DropDownArrowMenu({
  labelStyles,
  itemStyles,
  label,
  items,
}: {
  itemStyles?: string;
  labelStyles?: string;
  label: string;
  items: string[];
}) {
  const [show, setShow] = useState(false);

  labelStyles = twMerge(
    "flex cursor-pointer items-center justify-between",
    labelStyles,
  );

  return (
    <div>
      <div>
        <a onClick={() => setShow((p) => !p)} className={labelStyles}>
          <span>{label}</span>
          <OpenArrow className="block" isOpen={show} />
        </a>
      </div>
      <div>
        <ul
          className={`flex h-0 flex-col overflow-hidden transition-all duration-300 ${show ? "h-auto" : "h-0"}`}
        >
          {items.map((item) => {
            return (
              <li key={item} className={itemStyles}>
                {item}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

const categories = [
  "Graphics & Design",
  "Digital Marketing",
  "Writing & Translation",
  "Video & Animation",
  "Music & Audio",
  "Programming & Tech",
  "Business",
  "Lifestyle",
  "Sitemap",
];

const explore = ["Discover", "Guides", "Learn", "Community", "Podcast", "Blog"];

function SideNavContent({
  sideNavRef,
  className,
}: {
  sideNavRef: React.MutableRefObject<HTMLDivElement | null>;
  className?: string;
}) {
  className = twMerge(
    "absolute left-0 transition-all duration-300 top-0 z-50 h-screen w-[300px] -translate-x-[100%] border-r border-gray-200 bg-gray-50 px-4 py-6 shadow-md",
    className,
  );
  return (
    <div ref={sideNavRef} className={className}>
      <div className="mb-4 flex items-center gap-4">
        <img
          src="/images/yacine.png"
          alt="logo"
          className="h-14 w-14 rounded-full object-cover"
        />
        <span className="font-semibold">hamidhamri</span>
      </div>
      <div>
        <a className="block cursor-pointer rounded-md bg-opacity-80 px-2 py-3 hover:bg-gray-200">
          Home
        </a>
        <a className="block cursor-pointer rounded-md bg-opacity-80 px-2 py-3 hover:bg-gray-200">
          Inbox
        </a>
        <a className="block cursor-pointer rounded-md bg-opacity-80 px-2 py-3 hover:bg-gray-200">
          Dashboard
        </a>
        <a className="block cursor-pointer rounded-md bg-opacity-80 px-2 py-3 hover:bg-gray-200">
          Orders
        </a>
        <DropDownArrowMenu
          label="Categories"
          itemStyles="ml-4 cursor-pointer rounded-md bg-opacity-80 px-2 py-3 hover:bg-gray-200"
          labelStyles="mb-2 rounded-md bg-opacity-80 px-2 py-3 hover:bg-gray-200"
          items={categories}
        />
        <DropDownArrowMenu
          label="Explore"
          itemStyles="ml-4 cursor-pointer rounded-md bg-opacity-80 px-2 py-3 hover:bg-gray-200"
          labelStyles="mb-2 rounded-md bg-opacity-80 px-2 py-3 hover:bg-gray-200"
          items={explore}
        />
      </div>
    </div>
  );
}

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
