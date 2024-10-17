import OpenArrowButton from "@/Components/Atoms/OpenArrowButton";
import { cn } from "@/lib/utils";
import { useState } from "react";

export default function DropDownArrowMenu({
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
  labelStyles = cn(
    "flex cursor-pointer items-center justify-between",
    labelStyles,
  );
  return (
    <div>
      <div>
        <a onClick={() => setShow((p) => !p)} className={labelStyles}>
          <span>{label}</span>
          <OpenArrowButton className="block" isOpen={show} />
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
