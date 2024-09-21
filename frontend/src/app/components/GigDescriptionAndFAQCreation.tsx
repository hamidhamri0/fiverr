import React, { Dispatch, SetStateAction } from "react";
import RichTextEditor from "./GigDescriptionForm";
import { useFormContext } from "react-hook-form";
import GigFAQCreation from "./GigFAQForm";
import { Tag } from "@/types/gig.interface";
import { useUserInfoStore } from "@/stores/UserInfoStore";
import { post } from "@/lib/utils/customFetch";

export default function GigDescriptionAndFAQCreation({
  onClick,
}: {
  onClick: () => void;
}) {
  const {
    handleSubmit,
    getValues,
    formState: { errors },
  } = useFormContext();
  const user = useUserInfoStore((state) => state.user);
  console.log(errors);

  async function submit(data: any) {
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
    const faqs = values.faqs.map((item: any, index: number) => {
      return {
        ...item,
        position: index,
      };
    });
    let body = {
      title: values.title,
      metadata: metadata,
      categoryId: +values.category,
      subcategoryId: +values.subcategory,
      serviceId: +values.serviceType,
      tagIds: values.tags.map((e: Tag) => Number(e.id)),
      userId: user && user.id,
      faqs,
      aboutGig: values.editorJson,
    };

    try {
      await post(`/gig/saveGig?gigId=${values.gigId}`, body);
      onClick();
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div className="mx-auto max-w-[800px]">
      <h2 className="mb-4 text-2xl font-semibold">Description</h2>
      <p className="mb-12 border-b border-gray-200"></p>
      <p className="mb-4">Briefly Describe Your Gig</p>
      <RichTextEditor />
      <p className="mb-12 border-b border-gray-200"></p>
      <GigFAQCreation />
      <button
        onClick={handleSubmit(submit)}
        className="mt-4 w-full rounded-lg bg-green-500 py-2 text-white"
      >
        Save & Continue
      </button>
    </div>
  );
}
