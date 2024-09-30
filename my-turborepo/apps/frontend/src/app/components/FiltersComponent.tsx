import React, { useRef, useState } from "react";
import Menus from "./Menu";
import { twMerge } from "tailwind-merge";
let programmingLanguages = [
  "JavaScript",
  "Python",
  "Java",
  "C#",
  "C++",
  "Ruby",
  "PHP",
  "Swift",
  "TypeScript",
  "Kotlin",
  "Go",
  "Rust",
  "Scala",
  "Perl",
  "Haskell",
  "Objective-C",
  "R",
  "Dart",
  "Elixir",
  "Lua",
  "MATLAB",
  "Groovy",
  "Shell",
  "PowerShell",
  "SQL",
  "HTML",
  "CSS",
];
let backendFrameworks = [
  "Express",
  "Django",
  "Flask",
  "Spring",
  "Ruby on Rails",
  "Laravel",
  "ASP.NET",
  "Koa",
  "NestJS",
  "Phoenix",
  "FastAPI",
  "Symfony",
  "Sails.js",
  "CakePHP",
  "Gin",
  "Fiber",
  "Play",
  "Sinatra",
  "Hapi",
  "AdonisJS",
];

let frontendFrameworks = [
  "React",
  "Angular",
  "Vue.js",
  "Svelte",
  "Ember.js",
  "Backbone.js",
  "Preact",
  "Alpine.js",
  "Lit",
  "Stencil",
  "Mithril",
  "Aurelia",
  "Meteor",
  "Marko",
  "Hyperapp",
  "Inferno",
  "Riot",
  "Solid",
  "Blazor",
  "Elm",
];

// function Button({ label }: { label: string }) {
//   return (
//     <button className="flex items-center gap-4 rounded-md border border-gray-200 px-4 py-3 font-bold text-gray-900 shadow-sm transition-all hover:bg-gray-100">
//       {label}{" "}
//       <span className="rotate-90">
//         <svg
//           width="8"
//           height="16"
//           viewBox="0 0 8 16"
//           xmlns="http://www.w3.org/2000/svg"
//         >
//           <path d="M0.772126 1.19065L0.153407 1.80934C0.00696973 1.95578 0.00696973 2.19322 0.153407 2.33969L5.80025 8L0.153407 13.6603C0.00696973 13.8067 0.00696973 14.0442 0.153407 14.1907L0.772126 14.8094C0.918563 14.9558 1.156 14.9558 1.30247 14.8094L7.84666 8.26519C7.99309 8.11875 7.99309 7.88131 7.84666 7.73484L1.30247 1.19065C1.156 1.04419 0.918563 1.04419 0.772126 1.19065Z"></path>
//         </svg>
//       </span>
//     </button>
//   );
// }

function RenderFilter({ type, value, suffix }: RenderFilterProps) {
  switch (type) {
    case "Radio":
      return <RadioItem value={value} suffix={suffix} />;
    case "PriceRange":
      return <PriceRangeItem value="Enter budget" />;
    default:
      return null;
  }
}

type RenderFilterProps = RadioItmeProps & {
  type: string;
};

type RadioItmeProps = {
  suffix?: string;
  value: string;
  onClick?: () => void;
};

type FilterRadioProps = {
  options: RenderFilterProps[];
};

function PriceRangeItem({ value }: { value: string }) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFocus = () => {
    inputRef.current?.focus();
  };

  return (
    <div className="flex flex-col">
      <RadioItem onClick={handleFocus} value="Custom" />
      <div className="ml-6">
        <input
          type="text"
          id="first_name"
          ref={inputRef}
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-black focus:ring-black dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-white dark:focus:ring-white"
          placeholder="Enter budget"
          required
          onClick={handleFocus}
        />
      </div>
    </div>
  );
}

function RadioItem({ suffix, value, onClick }: RadioItmeProps) {
  return (
    <div key={value} className="flex items-center">
      <input
        // checked={selectedLanguages.includes(value)}
        // onChange={() => handleCheckboxChange(value)}
        onClick={onClick}
        id={value}
        type="radio"
        value=""
        name="bordered-radio"
        className="h-5 w-5 border-gray-300 bg-gray-100 accent-black dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800"
      />
      <label
        htmlFor={value}
        className="ms-2 w-full py-4 text-sm font-medium text-gray-900 dark:text-gray-300"
      >
        <span className="mr-2 text-base font-bold">{value}</span>

        <span className="text-gray-400">{suffix}</span>
      </label>
    </div>
  );
}

function SwitchButton({
  label,
  color = "green-400",
}: {
  label: string;
  color?: string;
}) {
  let className = `peer relative h-6 w-11 rounded-full bg-gray-200 after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-${color} peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800 rtl:peer-checked:after:-translate-x-full`;
  return (
    <label className="inline-flex cursor-pointer items-center">
      <input type="checkbox" value="" className="peer sr-only" />
      <div className={className}></div>
      <span className="text-md ms-3 font-semibold text-gray-900 dark:text-gray-300">
        {label}
      </span>
    </label>
  );
}

function RadioList({ options }: FilterRadioProps) {
  const [showMore, setShowMore] = useState<boolean>(false);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);

  const radios = showMore
    ? options
    : options.slice(0, Math.min(options.length, 6));
  const buttonText = showMore
    ? "Show less"
    : "+" + (options.length - 6) + " more";

  const handleCheckboxChange = (language: string) => {
    setSelectedLanguages((prevSelected) =>
      prevSelected.includes(language)
        ? prevSelected.filter((lang) => lang !== language)
        : [language],
    );
  };

  return (
    <div className="mx-auto mb-6 w-[90%] border-b border-gray-200 p-4 text-gray-900">
      <h4 className="mb-5 text-lg font-semibold">Programming language</h4>
      <div className="flex flex-col">
        {options.map((el) => (
          <RenderFilter
            key={el.value}
            suffix={el.suffix}
            type={el.type}
            value={el.value}
          />
        ))}
      </div>
      {options.length - 6 > 0 && (
        <button
          onClick={() => setShowMore((prev) => !prev)}
          className="cursor-pointer text-sm font-bold text-gray-500"
        >
          {buttonText}
        </button>
      )}
    </div>
  );
}

function CheckboxItem({ label }: { label: string }) {
  return (
    <div className="mb-4 flex items-center gap-2">
      <input
        type="checkbox"
        className="h-5 w-5 rounded border-gray-300 bg-gray-100 accent-black"
        // checked={selectedLanguages.includes(el)}
        // onChange={() => handleCheckboxChange(el)}
      />
      <label className="font-semibold">{label}</label>
    </div>
  );
}

function CheckboxList({ options }: { options: string[] }) {
  const [showMore, setShowMore] = useState<boolean>(false);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);

  const languages = showMore
    ? options
    : options.slice(0, Math.min(options.length, 6));
  const buttonText = showMore
    ? "Show less"
    : "+" + (options.length - 6) + " more";

  const handleCheckboxChange = (language: string) => {
    setSelectedLanguages((prevSelected) =>
      prevSelected.includes(language)
        ? prevSelected.filter((lang) => lang !== language)
        : [...prevSelected, language],
    );
  };

  return (
    <div className="mx-auto mb-6 w-[90%] border-b border-gray-200 p-4 text-gray-900">
      <h4 className="mb-5 text-lg font-semibold">Programming language</h4>
      <div className="grid grid-cols-2">
        {languages.map((el) => (
          <CheckboxItem key={el} label={el} />
        ))}
      </div>
      {options.length - 6 > 0 && (
        <button
          onClick={() => setShowMore((prev) => !prev)}
          className="cursor-pointer text-sm font-bold text-gray-500"
        >
          {buttonText}
        </button>
      )}
    </div>
  );
}

function FilterListContainer({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  className = twMerge("max-h-[370px] w-[500px] overflow-y-scroll", className);
  return (
    <div className="rounded-md border border-gray-100 pt-4 shadow-lg">
      <div className={className}>{children}</div>
      <div className="flex items-center justify-between border-t border-gray-200 p-4">
        <button className="cursor-pointer font-bold">Clear all</button>
        <button className="cursor-pointer rounded-md bg-black px-3 py-2 text-gray-100">
          Apply
        </button>
      </div>
    </div>
  );
}

let budget = [
  {
    type: "Radio",
    suffix: "Value",
    value: "Under $30",
  },
  {
    type: "Radio",
    suffix: "Mid-range",
    value: "$30-$60",
  },
  {
    type: "Radio",
    suffix: "High-end",
    value: "$60 & Above",
  },
  {
    type: "PriceRange",
    suffix: "Custom",
    value: "Enter budget",
  },
];

let deliveryTime = [
  {
    type: "Radio",
    value: "Up to 3 days",
  },
  {
    type: "Radio",
    value: "Up to 7 days",
  },
  {
    type: "Radio",
    value: "Up to 14 days",
  },
  {
    type: "Radio",
    value: "Anytime",
  },
];

function FilterMenu({ label }: { label: string }) {
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

let filters = ["Service options", "Seller details", "Budget", "Delivery time"];

export default function FilterComponent() {
  return (
    <div className="mx-auto max-w-[1450px] p-2">
      <div className="lg:flex-start flex justify-between gap-4 lg:flex-col">
        <Menus>
          <div className="flex gap-3">
            {filters.map((filter) => (
              <FilterMenu key={filter} label={filter} />
            ))}
          </div>
        </Menus>
        <SwitchButton color="green-400" label="Pro services" />
      </div>
    </div>
  );
}
