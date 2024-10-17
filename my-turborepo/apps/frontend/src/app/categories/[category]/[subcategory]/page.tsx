import React from "react";
import { getCategoryWithSubCategoryGroups } from "@/lib/cateogry";

export default async function page({
  params,
}: {
  params: {
    subcategory: string;
  };
}) {
  const slug = decodeURIComponent(params.subcategory);
  const subcategories = await getCategoryWithSubCategoryGroups(slug);
  return <div></div>;
}
