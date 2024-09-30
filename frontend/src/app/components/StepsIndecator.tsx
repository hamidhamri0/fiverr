import { ChevronRight } from "lucide-react";
import React from "react";

interface StepProps {
  number: number;
  label: React.ReactNode;
  isActive: boolean;
  isCompleted: boolean;
  onClick: (cb: (wizard: number) => number) => void;
}

const Step: React.FC<StepProps> = ({
  number,
  label,
  isActive,
  isCompleted,
  onClick,
}) => {
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
};

interface StepIndicatorProps {
  currentStep: number;
  onClick: (cb: (wizard: number) => number) => void;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({
  currentStep,
  onClick,
}) => {
  const steps = [
    "Overview",
    "Pricing",
    "Description & FAQ",
    "Requirements",
    "Gallery",
    "Publish",
  ];

  return (
    <nav className="mx-auto mb-6 flex w-full max-w-[1100px] items-center justify-between gap-4 border-b border-gray-200 bg-white px-4 py-2">
      {steps.map((step, index) => (
        <React.Fragment key={step}>
          <Step
            onClick={onClick}
            number={index + 1}
            label={
              <div className="flex items-center gap-2">
                <span>{step}</span>
                {index < steps.length - 1 ? <ChevronRight /> : null}
              </div>
            } // Remove this line
            isActive={index === currentStep - 1}
            isCompleted={index < currentStep - 1}
          />
          {index < steps.length && (
            <div className="mx-2 h-px flex-grow bg-transparent" />
          )}
        </React.Fragment>
      ))}
      <div className="ml-auto flex space-x-2">
        {/* <button className="rounded px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100">
          Save
        </button>
        <button className="whitespace-nowrap rounded bg-green-500 px-4 py-2 text-sm font-medium text-white hover:bg-green-600">
          Save & Preview
        </button> */}
      </div>
    </nav>
  );
};

export default StepIndicator;
