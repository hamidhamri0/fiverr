interface StepProps {
  number: number;
  label: React.ReactNode;
  isActive: boolean;
  isCompleted: boolean;
  onClick: (cb: (wizard: number) => number) => void;
}
export default function Step({
  number,
  label,
  isActive,
  isCompleted,
  onClick,
}: StepProps) {
  const circleClasses = isCompleted
    ? "bg-green-500 text-white"
    : isActive
      ? "bg-white text-green-500 border-2 border-green-500"
      : "bg-gray-200 text-gray-500";
  return (
    <div
      onClick={() => {
        isCompleted && onClick(() => number);
      }}
      className="flex w-full cursor-pointer items-center whitespace-nowrap"
    >
      <div
        className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-medium ${circleClasses}`}
      >
        {number}
      </div>
      <span
        className={`ml-2 text-sm ${isActive ? "font-medium text-black" : "text-gray-500"}`}
      >
        {label}
      </span>
    </div>
  );
}
