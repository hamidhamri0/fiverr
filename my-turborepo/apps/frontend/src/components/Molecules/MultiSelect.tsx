import { useController, useFormContext } from "react-hook-form";
import { Tag, Metadata } from "@fiverr/shared";
type MetadataProps = {
  metadata: Metadata;
};
export default function MultiSelect({ metadata }: MetadataProps) {
  const { control } = useFormContext();
  const {
    field: { value: metadataTags, onChange: setMetadataTags },
  } = useController({
    control,
    name: `metadataTag.${metadata.id}`,
    defaultValue: [],
    rules: {
      validate: (value) => {
        if (!value.length) return "You need to select at least one tag";
        if (value.length > 5) return "You can only select 5 tags";
        return true;
      },
    },
  });

  function isDisabled(id: string) {
    if (!metadataTags || metadataTags.length < 3) return false;
    return !metadataTags.includes(id);
  }

  return (
    <div className={`bg-white p-4`}>
      <div className="grid grid-cols-2">
        {metadata.metadataTags.map((tag: Tag) => (
          <div key={tag.id} className="mb-2 flex items-center">
            <input
              onChange={(e) =>
                e.target.checked
                  ? setMetadataTags([...metadataTags, e.target.value])
                  : setMetadataTags(
                      metadataTags.filter(
                        (id: string) => id !== e.target.value,
                      ),
                    )
              }
              type="checkbox"
              id={String(tag.id)}
              value={tag.id}
              checked={metadataTags.includes(String(tag.id))}
              className={`mr-2 h-4 w-4 rounded-3xl border-gray-300 accent-black focus:ring-black ${isDisabled(String(tag.id)) ? "cursor-not-allowed text-gray-500" : "cursor-pointer text-black"}`}
              disabled={isDisabled(String(tag.id))}
            />
            <label htmlFor={tag.name} className="text-sm text-gray-700">
              {tag.name}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}
