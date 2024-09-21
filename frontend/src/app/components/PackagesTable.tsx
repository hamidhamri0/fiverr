import React from "react";
import { FaCheck } from "react-icons/fa";
import Button from "./ui/Button";

type Feature = {
  name: string;
  value: boolean | string;
};

type Package = {
  name: string;
  description: string;
  price: number;
  delivery: number;
  features: Feature[];
};

type PricingPackages = {
  [key: string]: Package;
};

const pricingPackages: PricingPackages = {
  Basic: {
    name: "Figma to Website Conversion",
    description: "Convert your Figma design to beautiful website ",
    price: 125,
    delivery: 8,
    features: [
      { name: "Functional website", value: true },
      { name: "pages", value: "2" },
      { name: "Content upload", value: false },
      { name: "plugins/extensions", value: "3" },
      { name: "E-commerce functionality", value: true },
      { name: "products", value: "5" },
      { name: "Payment processing", value: false },
      { name: "Opt-in form", value: false },
      { name: "Autoresponder integration", value: true },
      { name: "Speed optimization", value: true },
      { name: "Hosting setup", value: true },
      { name: "Social media icons", value: false },
    ],
  },
  Standard: {
    name: "Custom Website Development",
    description: "Build custom website for your business",
    price: 230,
    delivery: 5,
    features: [
      { name: "Functional website", value: true },
      { name: "pages", value: "5" },
      { name: "Content upload", value: false },
      { name: "plugins/extensions", value: "5" },
      { name: "E-commerce functionality", value: true },
      { name: "products", value: "10" },
      { name: "Payment processing", value: false },
      { name: "Opt-in form", value: true },
      { name: "Autoresponder integration", value: false },
      { name: "Speed optimization", value: true },
      { name: "Hosting setup", value: true },
      { name: "Social media icons", value: false },
    ],
  },
  Premium: {
    name: "Custom Website Development",
    description: "Build custom website for your business",
    price: 380,
    delivery: 4,
    features: [
      { name: "Functional website", value: true },
      { name: "pages", value: "10" },
      { name: "Content upload", value: true },
      { name: "plugins/extensions", value: "10" },
      { name: "E-commerce functionality", value: true },
      { name: "products", value: "19" },
      { name: "Payment processing", value: true },
      { name: "Opt-in form", value: true },
      { name: "Autoresponder integration", value: true },
      { name: "Speed optimization", value: true },
      { name: "Hosting setup", value: true },
      { name: "Social media icons", value: true },
    ],
  },
};

export default function PackagesTable() {
  return (
    <div className="mx-auto max-w-[800px] overflow-x-auto p-4">
      <table className="w-full border border-gray-100">
        <colgroup>
          <col className="border border-gray-100" style={{ width: "25%" }} />
          <col className="border border-gray-100" style={{ width: "25%" }} />
          <col className="border border-gray-100" style={{ width: "25%" }} />
          <col className="border border-gray-100" style={{ width: "25%" }} />
        </colgroup>
        <thead>
          <th className="p-3 px-4 text-left">Packages</th>
          {Object.keys(pricingPackages).map((key) => {
            let PricingPackage = pricingPackages[key];
            return (
              <th key={key} className="px-4text-left p-3">
                <div className="flex flex-col gap-2">
                  <div className="text-xl font-medium">
                    ${PricingPackage.price}
                  </div>
                  <div className="text-2xl font-bold text-gray-600">{key}</div>
                  <div className="text-sm font-bold uppercase tracking-[-1.2px] text-gray-600">
                    {PricingPackage.name}
                  </div>
                  <div className="text-sm font-medium">
                    {PricingPackage.description}
                  </div>
                </div>
              </th>
            );
          })}
        </thead>

        <tbody>
          {pricingPackages.Basic.features.map((feature, i) => {
            return (
              <tr
                key={i}
                className={`border border-gray-100 ${i % 2 == 0 ? "bg-gray-100 bg-opacity-40" : ""}`}
              >
                <td className="whitespace-nowrap p-3 px-4 text-left text-sm font-medium text-gray-500">
                  {feature.name}
                </td>
                {Object.keys(pricingPackages).map((key) => {
                  let PricingPackage = pricingPackages[key];
                  return (
                    <td
                      key={key}
                      className="p-3 px-4 text-center align-baseline"
                    >
                      {PricingPackage.features[i].value ? (
                        typeof PricingPackage.features[i].value ===
                        "boolean" ? (
                          <span className="flex justify-center">
                            <FaCheck color="black" />
                          </span>
                        ) : (
                          <span className="flex justify-center text-gray-900">
                            {PricingPackage.features[i].value}
                          </span>
                        )
                      ) : (
                        <span className="flex justify-center">
                          <FaCheck className="text-gray-300" />
                        </span>
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
          <tr className={`border border-gray-100 bg-gray-100 bg-opacity-40`}>
            <td className="whitespace-nowrap p-4 text-left text-sm font-medium text-gray-500">
              Total
            </td>
            {Object.keys(pricingPackages).map((key) => {
              let PricingPackage = pricingPackages[key];
              return (
                <td key={key} className="p-4 text-center align-baseline">
                  <div className="">
                    <span className="mb-2 inline-block text-center text-lg text-gray-600">
                      ${PricingPackage.price}
                    </span>
                    <Button grow={true} color="black">
                      Select
                    </Button>
                  </div>
                </td>
              );
            })}
          </tr>
        </tbody>
      </table>
    </div>
  );
}
