"use client";
import React from "react";
import { FaCheck } from "react-icons/fa";
import Button from "@/Components/Atoms/Btn";
import { GigWithAvgRatingAndTotalReviews as Gig } from "@fiverr/shared";
import reshapePackageData from "@/lib/utils/reshapePackageData";
import { cn } from "@/lib/utils";

export default function PackagesTable({
  packages,
  className,
}: {
  packages: Gig["packages"];
  className?: string;
}) {
  const pricingPackages = reshapePackageData(packages);
  className = cn("overflow-x-auto", className);
  return (
    <div className={className}>
      <table className="w-full border border-gray-100">
        <colgroup>
          <col className="border border-gray-100" style={{ width: "25%" }} />
          <col className="border border-gray-100" style={{ width: "25%" }} />
          <col className="border border-gray-100" style={{ width: "25%" }} />
          <col className="border border-gray-100" style={{ width: "25%" }} />
        </colgroup>
        <thead>
          <th className="p-3 px-4 text-left">Packages</th>
          {(
            Object.keys(pricingPackages) as Array<keyof typeof pricingPackages>
          ).map((key) => {
            let pricingPackage = pricingPackages[key];
            return (
              <th key={key} className="px-4text-left p-3">
                <div className="flex flex-col gap-2">
                  <div className="text-xl font-medium">
                    ${pricingPackage?.price}
                  </div>
                  <div className="text-2xl font-bold text-gray-600">{key}</div>
                  <div className="text-sm font-bold uppercase tracking-[-1.2px] text-gray-600">
                    {pricingPackage?.name}
                  </div>
                  <div className="text-sm font-medium">
                    {pricingPackage?.description}
                  </div>
                </div>
              </th>
            );
          })}
        </thead>

        <tbody>
          {pricingPackages?.premium?.features.map((feature, i) => {
            return (
              <tr
                key={i}
                className={`border border-gray-100 ${i % 2 == 0 ? "bg-gray-100 bg-opacity-40" : ""}`}
              >
                <td className="whitespace-nowrap p-3 px-4 text-left text-sm font-medium text-gray-500">
                  {feature.name}
                </td>
                {(
                  Object.keys(pricingPackages) as Array<
                    keyof typeof pricingPackages
                  >
                ).map((key) => {
                  let pricingPackage = pricingPackages[key];
                  return (
                    <td
                      key={key}
                      className="p-3 px-4 text-center align-baseline"
                    >
                      {pricingPackage?.features[i].value ? (
                        typeof pricingPackage.features[i].value ===
                        "boolean" ? (
                          <span className="flex justify-center">
                            <FaCheck color="black" />
                          </span>
                        ) : (
                          <span className="flex justify-center text-gray-900">
                            {pricingPackage.features[i].value}
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
            {(
              Object.keys(pricingPackages) as Array<
                keyof typeof pricingPackages
              >
            ).map((key) => {
              let pricingPackage = pricingPackages[key];
              return (
                <td key={key} className="p-4 text-center align-baseline">
                  <div className="">
                    <span className="mb-2 inline-block text-center text-lg text-gray-600">
                      ${pricingPackage?.price}
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
