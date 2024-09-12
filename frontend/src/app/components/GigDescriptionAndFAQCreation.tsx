import React, { Dispatch, SetStateAction } from "react";
import RichTextEditor from "./GigDescriptionForm";
import { useFormContext } from "react-hook-form";
import GigFAQCreation from "./GigFAQForm";

export default function GigDescriptionAndFAQCreation({
  onClick,
}: {
  onClick: () => void;
}) {
  const {
    handleSubmit,
    formState: { errors },
  } = useFormContext();
  function submit(data: any) {
    onClick();
  }
  return (
    <form onSubmit={handleSubmit(submit)} className="mx-auto max-w-[800px]">
      <h2 className="mb-4 text-2xl font-semibold">Description</h2>
      <p className="mb-12 border-b border-gray-200"></p>
      <p className="mb-4">Briefly Describe Your Gig</p>
      <RichTextEditor />
      <p className="mb-12 border-b border-gray-200"></p>
      <GigFAQCreation />
      <button
        type="submit"
        className="mt-4 w-full rounded-lg bg-green-500 py-2 text-white"
      >
        Save & Continue
      </button>
    </form>
  );
}
