import React from "react";
import { twMerge } from "tailwind-merge";

type colors = "white" | "black" | "green";

type ButtonProps = {
  children: string;
  color: colors;
  grow?: boolean;
  IconLeft?: React.ReactNode;
  IconRight?: React.ReactNode;
  className?: string;
  onClick?: () => void;
};

export default function Button({
  children,
  color,
  IconLeft,
  IconRight,
  className,
  grow,
  onClick,
}: ButtonProps) {
  const colors = {
    white:
      "bg-white border-black text-gray-900 hover:bg-gray-900 hover:text-white hover:border-black",
    black: "bg-black border-black text-white hover:bg-opacity-80",
    green: "bg-green-500 border-green-500 text-white hover:bg-green-700",
  };

  className = twMerge(
    "border font-semibold transition-all  px-4 py-2 rounded-md flex items-center gap-2",
    grow && "w-full",
    colors[color],
    className,
  );

  return (
    <button className={className} onClick={onClick}>
      {IconLeft && <span>{IconLeft}</span>}
      <span className="w-full">{children}</span>
      {IconRight && <span>{IconRight}</span>}
    </button>
  );
}
