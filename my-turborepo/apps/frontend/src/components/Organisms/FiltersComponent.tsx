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
