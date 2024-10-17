import MetadataInputFactory from "@/Components/Organisms/MetadataInputFactory";
import { get } from "@/lib/utils/customFetch";
import { useGigStore } from "@/stores/GigStore";
import { useEffect, useState } from "react";
import {
  FieldErrors,
  useController,
  useFormContext,
  useWatch,
} from "react-hook-form";
import toast from "react-hot-toast";
import { Metadata } from "@fiverr/shared";

export default function MetadataSelect() {
  const {
    control,
    setError,
    formState: { errors },
  } = useFormContext();
  const metadata = useGigStore((state) => state.metadata);
  const setMetadata = useGigStore((state) => state.setMetadata);
  const [selectedMetadata, setSelectedMetadata] = useState(0);
  const {} = useController({
    control,
    name: "metadataTag",
    defaultValue: {},
  });
  const service = useWatch({
    name: "serviceType",
    control,
  });
  useEffect(() => {
    if (!service) return;

    async function fetchServiceMetadata() {
      try {
        const data = await get<Metadata[]>(
          `/metadata/getMetadataByServiceIdAndTheirTags?serviceId=${service}`,
        );
        setMetadata(data);
      } catch (err) {
        toast.error("Something went wrong");
      }
    }

    fetchServiceMetadata();
  }, [service, setError, setMetadata]);
  if (!service || !metadata.length) return null;
  return (
    <div className="mb-6 grid grid-cols-[1fr_2fr]">
      <h3 className="mb-2 font-semibold text-gray-700">Gig metadata</h3>
      <div className="grid grid-cols-[1fr_2fr] border border-gray-300">
        <div className="border-r border-gray-200 bg-slate-50">
          {metadata.map((meta: Metadata, index: number) => {
            const metadataId = meta.id;
            const selectedMeta = metadata[selectedMetadata];
            const hasError = (
              errors as FieldErrors<{
                metadataTag: Record<string, any>;
              }>
            ).metadataTag?.[metadataId];
            return (
              <div
                key={meta.name}
                className={`cursor-pointer whitespace-nowrap p-4 text-sm font-semibold ${hasError ? "text-red-500" : ""} ${selectedMeta.id == meta.id && index !== 0 ? "border-y border-gray-300 bg-white" : selectedMeta.id == meta.id ? "border-t-0 bg-white" : ""}`}
                onClick={(e) => setSelectedMetadata(index)}
              >
                {meta.name}
              </div>
            );
          })}
        </div>

        {metadata.map((metadata, index) => {
          return (
            <div
              key={index}
              className={`p-2 ${index == selectedMetadata ? "block" : "hidden"}`}
            >
              <p className="mb-4 text-sm font-semibold text-gray-500">
                Select the features you support
              </p>
              <MetadataInputFactory metadata={metadata} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
