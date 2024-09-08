import React from "react";

interface StepProps {
  number: number;
  label: string;
  isActive: boolean;
  isCompleted: boolean;
}

const Step: React.FC<StepProps> = ({
  number,
  label,
  isActive,
  isCompleted,
}) => {
  const circleClasses = isCompleted
    ? "bg-green-500 text-white"
    : isActive
      ? "bg-white text-green-500 border-2 border-green-500"
      : "bg-gray-200 text-gray-500";

  return (
    <div className="flex items-center whitespace-nowrap">
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
}

const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep }) => {
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
            number={index + 1}
            label={step}
            isActive={index === currentStep}
            isCompleted={index < currentStep}
          />
          {index < steps.length - 1 && (
            <div className="mx-2 h-px flex-grow bg-gray-200" />
          )}
        </React.Fragment>
      ))}
      <div className="ml-auto flex space-x-2">
        <button className="rounded px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100">
          Save
        </button>
        <button className="whitespace-nowrap rounded bg-green-500 px-4 py-2 text-sm font-medium text-white hover:bg-green-600">
          Save & Preview
        </button>
      </div>
    </nav>
  );
};

export default StepIndicator;
