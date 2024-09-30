"use client";
import React, { useEffect, useState } from "react";
import { GigData } from "../../types/gig.interface";
import GigOverviewForm from "../components/GigOverviewManager";
import GigPricingForm from "../components/GigPricingForm";
import GigDescriptionAndFAQCreation from "../components/GigDescriptionAndFAQCreation";
import GigRequirementForm from "../components/GigRequirementForm";
import { useForm, FormProvider } from "react-hook-form";
import StepIndicator from "../components/StepsIndecator";
import { useWizardQuery } from "@/Hooks/useWizardQuery";
import { ReshapeGigData } from "@/lib/utils/reshapeDataToDefaultValues";
import GigGallery from "../components/GigGallery";
import Publish from "../components/Publish";

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
