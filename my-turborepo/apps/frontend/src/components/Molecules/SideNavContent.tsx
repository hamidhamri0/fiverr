import DropDownArrowMenu from "@/Components/Molecules/DropDownArrowMenu";
import { cn } from "@/lib/utils";
const categories = [
  "Graphics & Design",
  "Programming & Tech",
  "Digital Marketing",
  "Video & Animation",
  "Writing & Translation",
  "Music & Audio",
  "Business",
  "Consulting",
  "Dev",
  "JavaScript",
  "React",
  "Cpp and Assembly",
  "Cpp and Assembly as",
  "Cpp and Assembly asz",
];

const explore = [
  "Explore",
  "Community",
  "Events",
  "Blog",
  "Forum",
  "Affiliates",
  "About",
  "Support",
];
export function SideNavContent({
  sideNavRef,
  className,
}: {
  sideNavRef: React.MutableRefObject<HTMLDivElement | null>;
  className?: string;
}) {
  className = cn(
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
