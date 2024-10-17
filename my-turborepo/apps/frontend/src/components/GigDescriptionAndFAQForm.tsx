import React, { useState } from "react";
import RichTextEditor from "./GigDescriptionForm";
import { useFormContext } from "react-hook-form";
import GigFAQCreation from "./GigFAQForm";
import { useUserInfoStore } from "@/stores/UserInfoStore";
import { post } from "@/lib/utils/customFetch";
import toast from "react-hot-toast";
import SpinnerCenterWithBlur from "./Molecules/SpinnerCenterWithBlur";
import Spinner from "./Atoms/Spinner";
import { Tag } from "types/tag";

export default function GigDescriptionAndFAQCreation({
  onClick,
}: {
  onClick: (cb: (wizard: number) => number) => void;
}) {
  const { handleSubmit, getValues, setValue } = useFormContext();
  const [loading, setLoading] = useState(false);
  const user = useUserInfoStore((state) => state.user);

  async function submit(data: any) {
    const gig = getValues();
    if (gig.step <= 2) {
      onClick(() => gig.step);
      return;
    }
    setLoading(true);
    let metadata: { [key: number]: number[] | number } = {};
    for (const meta in gig.metadataTag) {
      if (typeof gig.metadataTag[meta] == "string") {
        metadata[Number(meta)] = Number(gig.metadataTag[meta]);
      } else {
        metadata[Number(meta)] = gig.metadataTag[meta].map((e: string) =>
          Number(e),
        );
      }
    }
    const faqs = gig.faqs.map((item: any, index: number) => {
      return {
        ...item,
        position: index,
      };
    });
    let body = {
      title: gig.title,
      metadata: metadata,
      categoryId: +gig.category,
      subcategoryId: +gig.subcategory,
      serviceId: +gig.serviceType,
      tagIds: gig.tags.map((e: Tag) => Number(e.id)),
      userId: user && user.id,
      faqs,
      aboutGig: gig.editorJson,
    };

    try {
      await post(`/gig/saveGig?gigId=${gig.id}`, body);
      toast.success("Gig Description and FAQ saved successfully");
      if (gig.step < 4) {
        setValue("step", 4);
      }
      onClick((p) => p + 1);
    } catch (err) {
      toast.success((err as Error).message);
      // console.log(err);
    } finally {
      setLoading(false);
    }
  }

  function fillWithData() {
    setValue("faqs", [
      {
        question: "what do you need to know about me",
        answer: "nothing thb",
        id: null,
        position: 0,
      },
      {
        question: "how is your brother",
        answer: "good man",
        id: null,
        position: 1,
      },
    ]);
    setValue(
      "editor",
      "how are you doing sir :\n\n\n\n\n\nim good\n\n\n\nim hungry\n\n\n\nim mad\n\n\n\nim bad\n\n\n\nim popo\n\n\n\nim techa\n\nas i said everything is good baby girl\n\nyes sirrrrrrrrrrrrrrrrrrrrrrrrrrr",
    );
    setValue("editorJson", {
      type: "doc",
      content: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "how are you doing sir :",
            },
          ],
        },
        {
          type: "orderedList",
          attrs: {
            start: 1,
          },
          content: [
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [
                    {
                      type: "text",
                      text: "im good",
                    },
                  ],
                },
              ],
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [
                    {
                      type: "text",
                      text: "im hungry",
                    },
                  ],
                },
              ],
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [
                    {
                      type: "text",
                      text: "im mad",
                    },
                  ],
                },
              ],
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [
                    {
                      type: "text",
                      text: "im bad ",
                    },
                  ],
                },
              ],
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [
                    {
                      type: "text",
                      text: "im popo",
                    },
                  ],
                },
              ],
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [
                    {
                      type: "text",
                      text: "im techa",
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              marks: [
                {
                  type: "bold",
                },
                {
                  type: "italic",
                },
              ],
              text: "as i said everything is good baby girl",
            },
          ],
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              marks: [
                {
                  type: "italic",
                },
                {
                  type: "highlight",
                },
              ],
              text: "yes sirrrrrrrrrrrrrrrrrrrrrrrrrrr",
            },
          ],
        },
        {
          type: "paragraph",
        },
        {
          type: "paragraph",
        },
      ],
    });
  }
  return (
    <div className="mx-auto max-w-[800px]">
      <h2 className="mb-4 text-2xl font-semibold">Description</h2>
      <p className="mb-12 border-b border-gray-200"></p>
      <p className="mb-4">Briefly Describe Your Gig</p>
      <RichTextEditor />
      <p className="mb-12 border-b border-gray-200"></p>
      <GigFAQCreation />
      {loading && <SpinnerCenterWithBlur />}
      <button
        onClick={handleSubmit(submit)}
        className="mt-4 w-full rounded-lg bg-green-500 py-2 text-white"
      >
        {loading ? (
          <Spinner height={10} width={10} color="fill-green-500" />
        ) : (
          "Save & Continue"
        )}
      </button>
      <button
        onClick={fillWithData}
        className="mt-4 w-full rounded-lg bg-green-500 py-2 text-white"
      >
        fill With Data
      </button>
    </div>
  );
}
