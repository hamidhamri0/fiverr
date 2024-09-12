"use client";
import { useForm, FormProvider } from "react-hook-form";
import StepsIndecator from "./StepsIndecator";
import GigOverviewForm from "./GigOverviewManager";
import GigPricingForm from "./GigPricingForm";
import GigDescriptionAndFAQCreation from "./GigDescriptionAndFAQCreation";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";
import GigRequirementForm from "./GigRequirementForm";
import { create } from "domain";

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

type MetadataTag = {
  id: number;
  name: string;
};

type MetadataType = {
  id: number;
  name: string;
  type: string;
  metadataTags: MetadataTag[];
};

type GigContextType = {
  metadata: MetadataType[];
  setMetadata: Dispatch<SetStateAction<MetadataType[]>>;
} | null;

const GigContext = createContext<GigContextType>(null);

function GigCreationContext({ children }: { children: React.ReactNode }) {
  const [metadata, setMetadata] = useState<MetadataType[]>([]);

  return (
    <GigContext.Provider value={{ metadata, setMetadata }}>
      {children}
    </GigContext.Provider>
  );
}

export default function ReactHookFormContext() {
  const methods = useForm();
  const [currentStep, setCurrentStep] = useState(0);
  // console.log(methods.watch());
  return (
    <FormProvider {...methods}>
      <GigCreationContext>
        <StepsIndecator currentStep={currentStep} onClick={setCurrentStep} />
        {renderStepContent(currentStep, () => setCurrentStep((e) => e + 1))}

        {/* <GigRequirementForm onClick={() => setCurrentStep((e) => e + 1)} /> */}
        {/* <GigDescriptionAndFAQCreation
          onClick={() => setCurrentStep((e) => e + 1)}
        /> */}
      </GigCreationContext>
    </FormProvider>
  );
}

export const useGigcontext = () => {
  const context = useContext(GigContext);
  if (!context) {
    throw new Error("useGigcontext must be used within a GigCreationContext");
  }
  return context;
};
