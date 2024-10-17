"use client";
import GigDescriptionAndFAQCreation from "@/Components/GigDescriptionAndFAQForm";
import GigGallery from "@/Components/GigGalleryForm";
import GigOverviewForm from "@/Components/GigOverviewForm";
import GigPricingForm from "@/Components/GigPricingForm";
import GigRequirementForm from "@/Components/GigRequirementForm";
import Publish from "@/Components/Publish";
import StepIndicator from "@/Components/StepsIndecator";
import { useWizardQuery } from "@/Hooks/useWizardQuery";
import { ReshapeGigData } from "@/lib/utils/reshapeDataToDefaultValues";
import { GigData } from "@/types/gig.interface";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";

const renderStepContent = (
  step: number,
  onClick: (cb: (wizard: number) => number) => void,
) => {
  switch (step) {
    case 1:
      return <GigOverviewForm onClick={onClick} />;
    case 2:
      return <GigPricingForm onClick={onClick} />;
    case 3:
      return <GigDescriptionAndFAQCreation onClick={onClick} />;
    case 4:
      return <GigRequirementForm onClick={onClick} />;
    case 5:
      return <GigGallery onClick={onClick} />;
    case 6:
      return <Publish onClick={onClick} />;
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
  const { wizard, updateQuery } = useWizardQuery(1);
  console.log(typeof window !== "undefined" && methods.watch());

  return (
    <FormProvider {...methods}>
      <StepIndicator currentStep={wizard || 0} onClick={updateQuery} />
      {renderStepContent(wizard || 0, updateQuery)}
      {/* <GigRequirementForm onClick={() => {}} />; */}
    </FormProvider>
  );
}
