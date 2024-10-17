
export default function PricingButton({
  children,
  className,
  isActive,
  onClick
}: {
  children: string;
  className?: string;
  isActive: boolean;
  onClick: () => void;
}) {
  className = cn(`text-black py-3 w-full text-lg px-4 bg-gray-100 font-semibold border-r border-r-gray-300 ${isActive ? "border-b-2 border-b-black" : "border-b-2 border-b-transparent"}`, className);
  return <button onClick={onClick} className={className}>
      {children}
    </button>;
}
  