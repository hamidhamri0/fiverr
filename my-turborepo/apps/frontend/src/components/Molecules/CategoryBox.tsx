import { ReactNode } from "react";

export default function CategoryBox({
  icon,
  title,
}: {
  icon: ReactNode;
  title: string;
}) {
  return (
    <div className="flex min-h-[144px] basis-32 cursor-pointer flex-col items-start gap-4 rounded-xl border border-gray-200 bg-white px-2 py-6 font-semibold text-gray-900 shadow-md hover:bg-green-400 hover:bg-opacity-20">
      <div>{icon}</div>
      <p>{title}</p>
    </div>
  );
}
