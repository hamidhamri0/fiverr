import Step from "@/Components/Molecules/Step";
import { ChevronRight } from "lucide-react";
import React from "react";

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
            }
            isActive={index === currentStep - 1}
            isCompleted={index < currentStep - 1}
          />
          {index < steps.length && (
            <div className="mx-2 h-px flex-grow bg-transparent" />
          )}
        </React.Fragment>
      ))}
      <div className="ml-auto flex space-x-2"></div>
    </nav>
  );
};

export default StepIndicator;
