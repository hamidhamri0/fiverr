import React from "react";
import { BsLightningCharge } from "react-icons/bs";
import { MdOutlineHandshake } from "react-icons/md";
import { SlSupport } from "react-icons/sl";
import { TbCategoryPlus } from "react-icons/tb";

/*
 create a component named ServiceOverviewCard with with a div flex flex col and inside it 
      <span>{icon}</span>
      <h3>{title}</h3>
      <p>{description}</p>
      including typescript types for the props
*/

type ServiceOverviewCardProps = {
  icon: JSX.Element;
  title: string;
  description: string;
};

function ServiceOverviewCard({
  icon,
  title,
  description,
}: ServiceOverviewCardProps) {
  return (
    <div className="flex flex-col items-start justify-between text-gray-600">
      <span className="mb-4">{icon}</span>
      <h3 className="mb-10 text-2xl">{title}</h3>
      <p>{description}</p>
    </div>
  );
}

export default function ServicesOverview() {
  return (
    <div className="mx-auto mb-12 grid max-w-[1450px] grid-cols-[repeat(auto-fill,_minmax(310px,_1fr))] gap-6 p-4">
      <ServiceOverviewCard
        icon={<TbCategoryPlus size={40} />}
        title="Over 700 categories"
        description="Get results from skilled freelancers from all over the world, for every task, at any price point."
      />
      <ServiceOverviewCard
        icon={<MdOutlineHandshake size={40} />}
        title="Clear, transparent pricing"
        description="Pay per project or by the hour (Pro). Payments only get released when you approve."
      />
      <ServiceOverviewCard
        icon={<BsLightningCharge size={40} />}
        title="Quality work done faster"
        description="Filter to find the right freelancers quickly and get great work delivered in no time, every time."
      />
      <ServiceOverviewCard
        icon={<SlSupport size={40} />}
        title="24/7 award-winning support"
        description="Chat with our team to get your questions answered or resolve any issues with your orders."
      />
    </div>
  );
}
