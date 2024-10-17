import { cn } from "@/lib/utils";
import { cloneElement } from "react";

export default function RecommendedBox({
  children,
  titles,
  className = "",
}: {
  children: React.ReactElement;
  titles: {
    h3: string;
    h4: string;
    h5: string;
    buttonAction: string;
  };
  className?: string;
}) {
  className = cn("w-7 h-7", className);
  return (
    <div className="flex cursor-pointer flex-col gap-4 rounded-2xl bg-gray-100 p-4 text-[#222325] shadow-md">
      <h3 className="text-sm font-semibold uppercase text-[#74767e]">
        {titles.h3}
      </h3>
      <div className="flex gap-4 sm:flex-wrap">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-200">
          {cloneElement(children, {
            className,
          })}
        </span>
        <div className="flex flex-col">
          <h4 className="font-bold">{titles.h4}</h4>
          <h5 className="text-sm">{titles.h5}</h5>
        </div>
        <button className="text-md ml-auto self-start whitespace-nowrap rounded-lg border border-gray-800 p-3 px-6 font-semibold transition-all hover:bg-gray-900 hover:text-gray-100 sm:ml-0 sm:basis-full sm:py-2">
          {titles.buttonAction}
        </button>
      </div>
    </div>
  );
}
