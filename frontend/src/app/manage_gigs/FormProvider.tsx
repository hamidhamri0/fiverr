"use client";
import React, { useState } from "react";
import { GigData } from "../components/types/gig.interface";
import GigOverviewForm from "../components/GigOverviewManager";
import GigPricingForm from "../components/GigPricingForm";
import GigDescriptionAndFAQCreation from "../components/GigDescriptionAndFAQCreation";
import GigRequirementForm from "../components/GigRequirementForm";
import { useForm, FormProvider } from "react-hook-form";
import { ReshapeGigData } from "../utils/reshapeDataToDefaultValues";
import StepIndicator from "../components/StepsIndecator";

const renderStepContent = (step: number, onClick: () => void) => {
  switch (step) {
    case 0:
      return <GigOverviewForm onClick={onClick} />;
    case 1:
      return <GigPricingForm onClick={onClick} />;
    case 2:
      return <GigDescriptionAndFAQCreation onClick={onClick} />;
    case 3:
      return <GigRequirementForm onClick={onClick} />;
    default:
      return null;
  }
};

export default function FormProviderWrapper({
  defaultValues,
}: {
  defaultValues?: ReshapeGigData;
}) {
  const methods = useForm<GigData | {}>({
    defaultValues: defaultValues || {},
  });
  const [currentStep, setCurrentStep] = useState(0);

  return (
    <FormProvider {...methods}>
      {/* <StepIndicator currentStep={currentStep} onClick={setCurrentStep} />
      {renderStepContent(currentStep, () => setCurrentStep((e) => e + 1))} */}
      <GigDescriptionAndFAQCreation onClick={() => {}} />;
    </FormProvider>
  );
}
