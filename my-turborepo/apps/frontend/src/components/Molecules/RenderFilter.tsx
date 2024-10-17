import RadioItem from "@/Components/Atoms/RadioItem";
import PriceRangeItem from "@/Components/Molecules/PriceRangeItem";

export type RadioItemProps = {
  suffix?: string;
  value: string;
  onClick?: () => void;
};
export type RenderFilterProps = RadioItemProps & {
  type: string;
};

export default function RenderFilter({
  type,
  value,
  suffix,
}: RenderFilterProps) {
  switch (type) {
    case "Radio":
      return <RadioItem value={value} suffix={suffix} />;

    case "PriceRange":
      return <PriceRangeItem value="Enter budget" />;

    default:
      return null;
  }
}
