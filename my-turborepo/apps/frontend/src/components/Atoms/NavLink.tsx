import { cn } from "@/lib/utils";
import { ReactNode } from "react";

type NavLinkType = {
  label: string;
  icon?: ReactNode;
  className?: string;
  onClick?: () => void;
};
export default function NavLink({
  label,
  icon,
  className = "",
  onClick,
}: NavLinkType) {
  className = cn(
    "whitespace-nowrap flex cursor-pointer items-center gap-2 font-semibold hover:text-green-500",
    className,
  );
  return (
    <a onClick={() => onClick?.()} className={className}>
      {icon && <span>{icon} </span>}
      {label}
    </a>
  );
}
