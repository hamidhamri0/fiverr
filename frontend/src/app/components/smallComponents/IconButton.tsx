import { ReactNode } from "react";

export default function IconButton({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  className =
    "relative p-5 cursor-pointer transition-all hover:rounded-full hover:bg-gray-100 " +
    className;
  return (
    <li className={className}>
      <a className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        {children}
      </a>
    </li>
  );
}
