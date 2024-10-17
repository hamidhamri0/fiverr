"use client";
import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import { post } from "@/lib/utils/customFetch";
import { useRouter, usePathname } from "next/navigation";
import toast from "react-hot-toast";
import { Gig, Tag } from "@fiverr/shared";
import TitleInput from "@/Components/Molecules/TitleInput";
import SubAndCategory from "@/Components/Organisms/SubAndCategory";
import { ServiceTypeSelect } from "@/Components/Molecules/SubcategorySelect";
import MetadataSelect from "@/Components/Molecules/MetadataSelect";
import TagsInput from "@/Components/Molecules/TagsInput";
import { useUserInfoStore } from "@/stores/UserInfoStore";
import SpinnerCenterWithBlur from "@/Components/Molecules/SpinnerCenterWithBlur";

export default function GigOverviewForm({
  onClick,
}: {
  onClick: (cb: (wizard: number) => number, b: boolean) => void;
}) {
  const user = useUserInfoStore((state) => state.user);

  const [loading, setLoading] = useState(false);
  const methods = useFormContext();
  const pathname = usePathname();
  const router = useRouter();

  const {
    formState: { errors },
    getValues,
    handleSubmit,
    setValue,
  } = methods;

  async function createGig() {
    const values = getValues();
    let metadata: { [key: number]: number[] | number } = {};

    for (const meta in values.metadataTag) {
      if (typeof values.metadataTag[meta] == "string") {
        metadata[Number(meta)] = Number(values.metadataTag[meta]);
      } else {
        metadata[Number(meta)] = values.metadataTag[meta].map((e: string) =>
          Number(e),
        );
      }
    }
    let body = {
      title: values.title,
      metadata: metadata,
      categoryId: +values.category,
      subcategoryId: +values.subcategory,
      serviceId: +values.serviceType,
      tagIds: values.tags.map((e: Tag) => Number(e.id)),
      userId: user && user.id,
    };
    const url = values?.id
      ? `/gig/saveGig?gigId=${values?.id}`
      : "/gig/saveGig";
    return post(url, body);
  }

  const onSubmit = async () => {
    const values = getValues();

    try {
      if (
        values.initialSubcategory !== values.subcategory &&
        values.initialSubcategory
      ) {
        onClick((p) => p + 1, false);
        return;
      }
      setLoading(true);
      const gig = (await createGig()) as Gig;
      setValue("id", gig.id);
      setValue("step", Number(gig.step));
      const usernameMatch = pathname.match(/^\/([^\/]+)\/manage_gigs\/new/);
      if (usernameMatch) {
        const username = usernameMatch[1];
        router.push(`/${username}/manage_gigs/${gig.id}/edit?wizard=2`);
        router.push(`/testuser/manage_gigs/${gig.id}/edit?wizard=2`);
      } else {
        onClick((p) => p + 1, true);
      }
    } catch (err) {
      toast.error(err instanceof Error ? err?.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  function fillWithData() {
    methods.setValue("title", "I will do something I'm really good at");
    methods.setValue("category", "1");
    methods.setValue("subcategory", "1");
    methods.setValue("serviceType", "1");
    methods.setValue("metadataTag", { 1: "1", 2: ["5", "7"] });
    methods.setValue("tags", [{ id: 1, name: "Web Development" }]);
  }

  return (
    <div className="mx-auto max-w-[800px] rounded-lg border border-gray-300 bg-white p-6 shadow-md">
      <div>
        <TitleInput />
        <SubAndCategory />
        <ServiceTypeSelect />
        <MetadataSelect />
        <TagsInput control={methods.control} />
        <button
          type="button"
          onClick={handleSubmit(onSubmit)}
          className={`w-full rounded-md bg-green-500 px-4 py-2 text-white transition duration-300 hover:bg-green-600`}
        >
          Save & Continue
        </button>
        <button
          type="button"
          onClick={fillWithData}
          className={`mt-2 w-full rounded-md bg-green-500 px-4 py-2 text-white transition duration-300 hover:bg-green-600`}
        >
          fill with data
        </button>
      </div>
      <p className="mt-1 text-xs text-red-500">
        {errors.root && (errors.root.message as string)}
      </p>
      {loading && <SpinnerCenterWithBlur />}
    </div>
  );
}
