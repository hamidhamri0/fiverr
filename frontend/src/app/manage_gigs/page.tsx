import { useForm, FormProvider } from "react-hook-form";

import { get } from "../utils/customFetch";
import reshapeDataToDefaultValues from "../utils/reshapeDataToDefaultValues";
import { useState } from "react";
import GigOverviewForm from "../components/GigOverviewManager";
import GigPricingForm from "../components/GigPricingForm";
import GigDescriptionAndFAQCreation from "../components/GigDescriptionAndFAQCreation";
import GigRequirementForm from "../components/GigRequirementForm";
import { GigData } from "../components/types/gig.interface";
import GigStoreProvider from "../components/stores/GigStore";
import FormProviderWrapper from "./FormProvider";

export default async function Page() {
  // useEffect(() => {
  //   async function getData() {
  //     let data = (await get(
  //       "/gig/getOneById/20806635-5d64-4db5-80c5-24bb312ae2b0",
  //     )) as Data;
  //     // console.log(data);
  //     let newData = reshapeDataToDefaultValues(data);
  //     // console.log(newData);
  //     reset(newData);
  //   }
  //   getData();
  // }, []);

  //   console.log(methods.watch(), "FIRSTTTTTTTTTTTTT");
  //   return <FormProviderWrapper defaultValues={defaultValues} />;
  return <div>ahjahah</div>;
}
