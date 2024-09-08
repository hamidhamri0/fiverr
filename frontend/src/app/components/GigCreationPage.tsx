"use client";
import { useForm, FormProvider } from "react-hook-form";
import StepsIndecator from "./StepsIndecator";
import GigOverviewForm from "./GigOverviewManager";
import GigPricingForm from "./GigPricingForm";
import RichTextEditor from "./RichTextEditor";
import GigDescriptionCreation from "./smallComponents/GigDescriptionCreation";

export default function ReactHookFormContext() {
  const methods = useForm();
  //   const [currentStep, setCurrentStep] = useState(0);
  return (
    <FormProvider {...methods}>
      {/* <StepsIndecator currentStep={2} /> */}
      {/* <GigOverviewForm /> */}
      {/* <GigPricingForm /> */}
      <GigDescriptionCreation />
    </FormProvider>
  );
}
