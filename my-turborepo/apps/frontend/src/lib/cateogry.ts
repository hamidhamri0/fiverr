import { cookies } from "next/headers";
import { Category } from "@fiverr/shared";
import { redirect } from "next/navigation";
import { get } from "./utils/customFetch";

export async function getCategoryWithSubCategoryGroups(
  slug: string,
): Promise<Category> {
  try {
    const category = await get<Category>(
      `/category/getCategoryWithSubCategoryGroupsByCategoryName?category=${encodeURIComponent(slug)}`,
      {
        cache: "no-cache",
        isCookie: cookies().toString(),
      },
    );
    return category;
  } catch (error) {
    redirect("/");
  }
}
