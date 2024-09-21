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

const renderStepContent = (
  step: number,
  onClick: (cb: (wizard: number) => number) => void,
) => {
  switch (step) {
    case 0:
      return <GigOverviewForm onClick={() => onClick((prev) => prev + 1)} />;
    case 1:
      return <GigPricingForm onClick={() => onClick((prev) => prev + 1)} />;
    case 2:
      return (
        <GigDescriptionAndFAQCreation
          onClick={() => onClick((prev) => prev + 1)}
        />
      );
    case 3:
      return <GigRequirementForm onClick={() => onClick((prev) => prev + 1)} />;
    case 4:
      return <GigGallery onClick={() => onClick((prev) => prev + 1)} />;
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
  const { wizard, updateQuery } = useWizardQuery(0);
  console.log(methods.watch());

  useEffect(() => {
    console.log("MOUNTED", defaultValues);
  }, []);

  return (
    <FormProvider {...methods}>
      <StepIndicator currentStep={wizard || 0} onClick={updateQuery} />
      {renderStepContent(wizard || 0, updateQuery)}
      {/* <GigRequirementForm onClick={() => {}} />; */}
    </FormProvider>
  );
}
