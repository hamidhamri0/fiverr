import { useController, useFormContext } from "react-hook-form";
import { Tag, Metadata } from "@fiverr/shared";

type MetadataProps = {
  metadata: Metadata;
};
export default function SelectInput({ metadata }: MetadataProps) {
  const { control } = useFormContext();
  const {
    field: { value: metadataTag, onChange: setMetadataTag },
    fieldState: { error },
  } = useController({
    name: `metadataTag.${metadata.id}`,
    control,
    rules: {
      required: "Select a tag",
    },
    defaultValue: "",
  });
  return (
    <div className={`p-2`}>
      <select
        value={metadataTag}
        onChange={(e) => {
          setMetadataTag(e.target.value);
        }}
        className={`w-full rounded-md border p-2 focus:outline-none ${error ? "border-red-500" : "border-gray-300"}`}
      >
        <option value="">Select a {metadata.name}</option>
        {metadata.metadataTags.map((tag: Tag) => (
          <option key={tag.id} value={tag.id}>
            {tag.name}
          </option>
        ))}
      </select>
    </div>
  );
}
