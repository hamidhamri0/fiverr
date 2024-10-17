import MultiSelect from "@/Components/Molecules/MultiSelect";
import SelectInput from "@/Components/Molecules/SelectInput";
import { Metadata } from "@fiverr/shared";
type MetadataProps = {
  metadata: Metadata;
};
export default function MetadataInputFactory({ metadata }: MetadataProps) {
  switch (metadata.type) {
    case "multi_select":
      return <MultiSelect key={Math.random() * 100000} metadata={metadata} />;

    case "select":
      return <SelectInput key={Math.random() * 100000} metadata={metadata} />;

    default:
      return null;
  }
}
