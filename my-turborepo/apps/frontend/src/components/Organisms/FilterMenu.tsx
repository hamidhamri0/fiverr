import Menus from "@/Components/Organisms/Menu";
import FilterListContainer from "@/Components/Molecules/FilterListContainer";
import RadioList from "@/Components/Organisms/RadioList";
let deliveryTime = [
  { type: "Radio", value: "Up to 3 days" },
  { type: "Radio", value: "Up to 7 days" },
  { type: "Radio", value: "Up to 14 days" },
  { type: "Radio", value: "Anytime" },
];
export default function FilterMenu({ label }: { label: string }) {
  return (
    <div>
      <Menus.Menu>
        <Menus.Toggle id={label}>
          <Menus.DropDown
            className="rounded-md border border-gray-200"
            id={label}
            label={label}
          />
        </Menus.Toggle>
        <Menus.List id={label}>
          <FilterListContainer className="w-[300px]">
            <RadioList options={deliveryTime} />
            {/* <CheckboxList options={programmingLanguages} />
            <CheckboxList options={backendFrameworks} />
            <CheckboxList options={frontendFrameworks} /> */}
          </FilterListContainer>
        </Menus.List>
      </Menus.Menu>
    </div>
  );
}
