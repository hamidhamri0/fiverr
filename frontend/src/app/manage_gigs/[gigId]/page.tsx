import {
  Categories,
  Feature,
  GigData,
  Metadata,
  Services,
  Subcategories,
} from "@/types/gig.interface";
import { get } from "@/lib/utils/customFetch";
import reshapeDataToDefaultValues, {
  ReshapeGigData,
} from "@/lib/utils/reshapeDataToDefaultValues";
import React from "react";
import FormProviderWrapper from "../FormProvider";
import GigStoreProvider, { State } from "@/stores/GigStore";
import { cookies } from "next/headers";

type Props = {
  params: { gigId: string };
};

export default async function page({ params }: Props) {
  const gigId = params.gigId;
  const isNew = gigId.startsWith("new");
  let defaultValues = {} as ReshapeGigData;
  let initialState = {
    categories: [] as Categories,
    subcategories: [] as Subcategories,
    services: [] as Services,
    metadata: [] as Metadata[],
    features: [] as Feature[],
  } as State;
  if (!isNew) {
    try {
      let data = await get<GigData>(`/gig/getOneById/${gigId}`);
      defaultValues = reshapeDataToDefaultValues(data);
      const categories = await get<Categories>("/category/getAllCategories", {
        isCookie: cookies().toString(),
      });
      const subcategories = await get<Subcategories>(
        `/subcategory/getSubcategoriesByCategoryId?categoryId=${defaultValues.category}`,
        {
          isCookie: cookies().toString(),
        },
      );
      const services = await get<Services>(
        `/service/getServicesBySubcategoryId?subcategoryId=${defaultValues.subcategory}`,
        {
          isCookie: cookies().toString(),
        },
      );
      const metadata = await get<Metadata[]>(
        `/metadata/getMetadataByServiceIdAndTheirTags?serviceId=${defaultValues.serviceType}`,
        {
          isCookie: cookies().toString(),
        },
      );
      initialState = {
        ...initialState,
        categories,
        subcategories,
        services,
        metadata,
      };
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <GigStoreProvider initialState={initialState}>
      <FormProviderWrapper defaultValues={defaultValues} />
    </GigStoreProvider>
  );
}
