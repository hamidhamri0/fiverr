import {
  Categories,
  Feature,
  GigData,
  Metadata,
  Services,
  Subcategories,
} from "@/app/components/types/gig.interface";
import { get } from "@/app/utils/customFetch";
import reshapeDataToDefaultValues, {
  ReshapeGigData,
} from "@/app/utils/reshapeDataToDefaultValues";
import React from "react";
import FormProviderWrapper from "../FormProvider";
import GigStoreProvider, { State } from "@/app/components/stores/GigStore";
import { cookies } from "next/headers";
import customSortFeatures from "@/app/utils/customSortFeatures";

type Props = {
  params: { gigId: string };
};

export default async function page({ params }: Props) {
  const cookie = cookies().toString();
  const gigId = params.gigId;
  const isNew = gigId.startsWith("new");
  let defaultValues = {} as ReshapeGigData;
  let initialState = {} as State;
  try {
    let data = await get<GigData>(`/gig/getOneById/${gigId}`);
    defaultValues = reshapeDataToDefaultValues(data);
    const categories = await get<Categories>("/category/getAllCategories", {
      isCookie: cookie,
    });
    const subcategories = await get<Subcategories>(
      `/subcategory/getSubcategoriesByCategoryId?categoryId=${defaultValues.category}`,
      {
        isCookie: cookie,
      },
    );
    const services = await get<Services>(
      `/service/getServicesBySubcategoryId?subcategoryId=${defaultValues.subcategory}`,
      {
        isCookie: cookie,
      },
    );
    const metadata = await get<Metadata[]>(
      `/metadata/getMetadataByServiceIdAndTheirTags?serviceId=${defaultValues.serviceType}`,
      {
        isCookie: cookie,
      },
    );

    let featuresData = await get<Feature[]>(
      `/feature/getAllFeaturesBySubcategoryId?subcategoryId=${defaultValues.subcategory}`,
    );
    let features = customSortFeatures(featuresData);

    initialState = {
      categories,
      subcategories,
      services,
      metadata,
      features,
    };
  } catch (err) {
    console.log(err);
  }

  return (
    // <div>{JSON.stringify(initialState)}</div>
    <GigStoreProvider initialState={initialState}>
      {isNew ? (
        <FormProviderWrapper />
      ) : (
        <FormProviderWrapper defaultValues={defaultValues} />
      )}
    </GigStoreProvider>
  );
}
