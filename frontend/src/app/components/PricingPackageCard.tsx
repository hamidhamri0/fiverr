import React, { useState } from "react";
import { LuRepeat2 } from "react-icons/lu";
import { MdOutlineAccessTime } from "react-icons/md";
import { twMerge } from "tailwind-merge";
import { OpenArrow } from "./Footer";
import { FaCheck } from "react-icons/fa";
import Button from "./ui/Btn";
import { TiArrowRight } from "react-icons/ti";

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
  basic: {
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
  standard: {
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
  premium: {
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
function PricingButton({
  children,
  className,
  isActive,
  onClick,
}: {
  children: string;
  className?: string;
  isActive: boolean;
  onClick: () => void;
}) {
  className = twMerge(
    `text-black py-3 w-full text-lg px-4 bg-gray-100 font-semibold border-r border-r-gray-300 ${
      isActive ? "border-b-2 border-b-black" : "border-b-2 border-b-transparent"
    }`,
    className,
  );
  return (
    <button onClick={onClick} className={className}>
      {children}
    </button>
  );
}

export default function PricingPackageCard() {
  const [openId, setOpenId] = useState<string>("basic");
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  return (
    <div className="mx-auto mb-12 flex max-w-[500px] flex-col border border-gray-300">
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
        {Object.keys(pricingPackages).map((key) => {
          const packageData = pricingPackages[key];
          return (
            key === openId && (
              <div key={key}>
                <div className="mb-4 flex justify-between gap-2 font-semibold">
                  <h3 className="text-lg text-gray-800">{packageData.name}</h3>
                  <p className="text-lg text-gray-500">${packageData.price}</p>
                </div>
                <p className="mb-2 text-gray-500">{packageData.description}</p>
                <div className="mb-2 flex gap-4 font-semibold">
                  <div className="flex items-center gap-2 text-sm">
                    <MdOutlineAccessTime />
                    <span>{packageData.delivery}-day delivery</span>
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
                    <OpenArrow className="!flex" isOpen={isExpanded} />
                  </div>
                  <div className="m-4">
                    {isExpanded && (
                      <div className="mt-2 flex flex-col gap-2">
                        {packageData.features.map((item) => (
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
