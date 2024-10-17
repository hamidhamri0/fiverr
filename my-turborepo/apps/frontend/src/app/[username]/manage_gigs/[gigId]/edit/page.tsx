// export const fetchCache = "default-cache";
export const dynamic = "force-dynamic";
export const revalidate = 0;
import { get } from "@/lib/utils/customFetch";
import reshapeDataToDefaultValues, {
  ReshapeGigData,
} from "@/lib/utils/reshapeDataToDefaultValues";
import React from "react";
import FormProviderWrapper from "../../FormProvider";
import GigStoreProvider, { State } from "@/stores/GigStore";
import { cookies } from "next/headers";
import customSortFeatures from "@/lib/utils/customSortFeatures";
import { redirect } from "next/navigation";
import { getOneGig } from "@/lib/gig/getGig";
import {
  Category,
  Feature,
  Metadata,
  Service,
  Subcategory,
} from "@fiverr/shared";

type Props = {
  params: { gigId: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function page({
  params,
  searchParams: { wizard },
}: Props) {
  const gigId = params.gigId;
  const gig = await getOneGig(gigId, [
    "category",
    "subcategory",
    "service",
    "user",
    "faqs",
    "metadata",
    "metadataTags",
    "tags",
    "questions",
    "packages",
    "packageFeatures",
    "features",
  ]);
  if (!gig) {
    return redirect("/manage_gigs/new");
  }
  if (!wizard) {
    return redirect(`/manage_gigs/${gigId}/edit?wizard=0`);
  }
  console.log(gig);
  let defaultValues = {} as ReshapeGigData;
  let initialState = {
    categories: [] as Category[],
    subcategories: [] as Subcategory[],
    services: [] as Service[],
    metadata: [] as Metadata[],
    features: [] as Feature[],
  } as State;
  try {
    // console.log(gig);
    defaultValues = reshapeDataToDefaultValues(gig);
    const categories = await get<Category[]>("/category/getAllCategories", {
      isCookie: cookies().toString(),
    });
    const subcategories = await get<Subcategory[]>(
      `/subcategory/getSubcategoriesByCategoryId?categoryId=${defaultValues.category}`,
      {
        isCookie: cookies().toString(),
      },
    );
    const services = await get<Service[]>(
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
  } catch (err) {
    console.log(err);
    return redirect("/");
  }
  return (
    <>
      <GigStoreProvider initialState={initialState}>
        <FormProviderWrapper defaultValues={defaultValues} />
      </GigStoreProvider>
    </>
  );
}
