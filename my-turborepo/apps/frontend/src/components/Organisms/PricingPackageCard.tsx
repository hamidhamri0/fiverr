"use client";
import React, { useState } from "react";
import { LuRepeat2 } from "react-icons/lu";
import { MdOutlineAccessTime } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
import Button from "../Atoms/Btn";
import { TiArrowRight } from "react-icons/ti";
import { GigWithAvgRatingAndTotalReviews as Gig } from "types/gig";
import reshapePackageData from "@/lib/utils/reshapePackageData";
import PricingButton from "@/Components/Atoms/PricingButton";

export default function PricingPackageCard({
  packages,
}: {
  packages: Gig["packages"];
}) {
  const [openId, setOpenId] = useState<string>("basic");
  const [isExpanded, setIsExpanded] = useState<boolean>(true);
  if (!packages) return null;
  const pricingPackages = reshapePackageData(packages);

  return (
    <div className="mb-12 flex flex-col border border-gray-300">
      <div className="flex">
        <PricingButton
          onClick={() => setOpenId("basic")}
          isActive={openId === "basic"}
        >
          Basic
        </PricingButton>
        <PricingButton
          onClick={() => setOpenId("standard")}
          isActive={openId === "standard"}
        >
          Standard
        </PricingButton>
        <PricingButton
          onClick={() => setOpenId("premium")}
          isActive={openId === "premium"}
          className="border-r-0"
        >
          Premium
        </PricingButton>
      </div>
      <div className="p-6">
        {(
          Object.keys(pricingPackages) as Array<keyof typeof pricingPackages>
        ).map((key) => {
          const packageData = pricingPackages[key];
          return (
            key === openId && (
              <div key={key}>
                <div className="mb-4 flex justify-between gap-2 font-semibold">
                  <h3 className="text-lg text-gray-800">{packageData?.name}</h3>
                  <p className="text-lg text-gray-500">${packageData?.price}</p>
                </div>
                <p className="mb-2 text-gray-500">{packageData?.description}</p>
                <div className="mb-2 flex gap-4 font-semibold">
                  <div className="flex items-center gap-2 text-sm">
                    <MdOutlineAccessTime />
                    <span>{packageData?.deliveryTime}-day delivery</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <LuRepeat2 />
                    <span>Unlimited Revisions</span>
                  </div>
                </div>
                <div
                  onClick={() => setIsExpanded((p) => !p)}
                  className="cursor-pointer"
                >
                  <div className="flex gap-2 font-semibold text-gray-900">
                    <span>What&apos;s Included</span>
                  </div>
                  <div className="m-4">
                    {isExpanded && (
                      <div className="mt-2 flex flex-col gap-2">
                        {packageData?.features?.map((item) => (
                          <div
                            key={item.name}
                            className="flex items-center gap-2 text-sm"
                          >
                            {item.value ? (
                              <FaCheck color="black" />
                            ) : (
                              <FaCheck color="gray" />
                            )}
                            <span>
                              {item.value} {item.name}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )
          );
        })}
        <div className="flex flex-col items-center">
          <Button
            IconRight={<TiArrowRight size={20} />}
            color="black"
            grow={true}
            className="mb-2"
          >
            Continue
          </Button>
          <span className="cursor-pointer text-gray-400 hover:underline">
            Compare packages
          </span>
        </div>
      </div>
    </div>
  );
}
