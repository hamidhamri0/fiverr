import React from "react";
import Menus from "./Menu";
import FilterMenu from "@/Components/Organisms/FilterMenu";
import SwitchButton from "@/Components/Atoms/SwitchButton";
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
