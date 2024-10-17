import React from "react";
import { IoIosPlayCircle } from "react-icons/io";
import { cn } from "@/lib/utils";

type CategoryBannerProps = {
  bgImage: string;
  mobileBgImage?: string;
  children?: React.ReactNode;
  className?: string;
};

export function CategoryBannerContent({
  category,
  description,
}: {
  category: string;
  description: string;
}) {
  return (
    <div className="flex max-w-[600px] flex-col items-center justify-center gap-2 text-center text-gray-100">
      <h2 className="text-4xl font-bold sm:text-3xl">{category} </h2>
      <p className="mb-4 text-xl sm:text-lg">{description}</p>
      <button className="flex items-center justify-center gap-2 rounded-md border border-white px-4 py-2 text-lg transition-all hover:bg-white hover:text-green-700">
        <span>
          <IoIosPlayCircle size={20} />
        </span>
        <span>How Fiverr Works</span>
      </button>
    </div>
  );
}

export default function CategoryBanner({
  bgImage,
  mobileBgImage,

  children,
  className = "",
}: CategoryBannerProps) {
  className = cn(
    `${bgImage} bg-cover mx-auto flex max-h-[294px] min-h-[240px] max-w-[1450px] flex-col items-center justify-center gap-12 rounded-2xl bg-no-repeat px-4 `,
    className,
    mobileBgImage,
  );
  return (
    <div className="p-6">
      <div className="relative w-full overflow-hidden rounded-2xl">
        <div className={className}>{children}</div>
      </div>
    </div>
  );
}
