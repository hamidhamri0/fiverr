// export const fetchCache = "default-cache";
export const dynamic = "force-dynamic";
export const revalidate = 0;

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
import FormProviderWrapper from "../../FormProvider";
import GigStoreProvider, { State } from "@/stores/GigStore";
import { cookies, headers } from "next/headers";
import customSortFeatures from "@/lib/utils/customSortFeatures";
import { isGigExists } from "@/lib/gig/isGigExists";
import { redirect } from "next/navigation";

type Props = {
  params: { gigId: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function page({
  params,
  searchParams: { wizard },
}: Props) {
  const gigId = params.gigId;
  const gig = (await isGigExists(gigId)) as GigData;
  if (!gig) {
    return redirect("/manage_gigs/new");
  }
  if (!wizard) {
    return redirect(`/manage_gigs/${gigId}/edit?wizard=0`);
  }
  let defaultValues = {} as ReshapeGigData;
  let initialState = {
    categories: [] as Categories,
    subcategories: [] as Subcategories,
    services: [] as Services,
    metadata: [] as Metadata[],
    features: [] as Feature[],
  } as State;
  try {
    // console.log(gig);
    defaultValues = reshapeDataToDefaultValues(gig);
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

    let featuresData = await get<Feature[]>(
      `/feature/getAllFeaturesBySubcategoryId?subcategoryId=${defaultValues.subcategory}`,
    );
    let features = customSortFeatures(featuresData);

    initialState = {
      ...initialState,
      categories,
      subcategories,
      services,
      metadata,
      features,
      gig,
    };
    console.log("page/edit", defaultValues.imageUrlsPreview);
  } catch (err) {
    console.log(err);
    return redirect("/");
  }
  // key={Date.now()}
  return (
    <>
      <GigStoreProvider initialState={initialState}>
        <FormProviderWrapper defaultValues={defaultValues} />
      </GigStoreProvider>
    </>
  );
}
