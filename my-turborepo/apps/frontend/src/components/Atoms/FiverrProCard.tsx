import { ReactNode } from "react";

type FiverrProCardType = {
  icon: ReactNode;
  title: string;
  description: string;
};

export default function FiverrProCard({
  icon,
  title,
  description,
}: FiverrProCardType) {
  return (
    <div className="flex cursor-pointer items-center gap-4 rounded-md border border-gray-300 p-2 hover:bg-slate-100 hover:bg-opacity-70">
      {icon}
      <div className="flex flex-col gap-2">
        <h2 className="font-semibold"> {title} </h2>
        <p className="text-sm text-gray-500"> {description} </p>
      </div>
    </div>
  );
}
