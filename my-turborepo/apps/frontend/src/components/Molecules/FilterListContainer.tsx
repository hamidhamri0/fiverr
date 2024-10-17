import { cn } from "@/lib/utils";

export default function FilterListContainer({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  className = cn("max-h-[370px] w-[500px] overflow-y-scroll", className);
  return (
    <div className="rounded-md border border-gray-100 pt-4 shadow-lg">
      <div className={className}>{children}</div>
      <div className="flex items-center justify-between border-t border-gray-200 p-4">
        <button className="cursor-pointer font-bold">Clear all</button>
        <button className="cursor-pointer rounded-md bg-black px-3 py-2 text-gray-100">
          Apply
        </button>
      </div>
    </div>
  );
}
